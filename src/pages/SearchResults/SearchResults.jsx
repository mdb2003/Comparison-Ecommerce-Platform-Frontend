import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiStar, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import API from '../../api';
import { useNavigate } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, formatPrice } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedStores, setSelectedStores] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const stores = ['Amazon', 'eBay', 'Walmart'];

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("This is fetching product.");
      
      const query = new URLSearchParams(location.search).get('query');
      console.log("Query is: ", query, "Query in url is: ", new URLSearchParams(location.search).get('query'));
      
      if (!query) return;

      try {
        setLoading(true);
        console.log("Query: ", query);
        
        const response = await API.get(`search/`, { params: { query } });
        setProducts(response.data.products);
        console.log(response.data.products);
        
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location]);

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = [...products];

    // Price filter
    result = result.filter(product => {
      const productPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
      return productPrice >= priceRange[0] && productPrice <= priceRange[1];
    });
    

    // Rating filter
    if (selectedRatings.length > 0) {
      result = result.filter(product =>
        selectedRatings.some(rating => Math.floor(product.rating) === rating)
      );
    }

    // Store filter
    if (selectedStores.length > 0) {
      result = result.filter(product =>
        product.stores.some(store => selectedStores.includes(store))
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // 'relevance'
        // Keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, priceRange, selectedRatings, selectedStores, sortBy]);

  const translations = {
    searchResults: {
      en: 'Search Results for',
      es: 'Resultados de búsqueda para',
      fr: 'Résultats de recherche pour',
      de: 'Suchergebnisse für'
    },
    filters: {
      en: 'Filters',
      es: 'Filtros',
      fr: 'Filtres',
      de: 'Filter'
    },
    priceRange: {
      en: 'Price Range',
      es: 'Rango de precio',
      fr: 'Fourchette de prix',
      de: 'Preisbereich'
    },
    rating: {
      en: 'Rating',
      es: 'Calificación',
      fr: 'Évaluation',
      de: 'Bewertung'
    },
    stores: {
      en: 'Stores',
      es: 'Tiendas',
      fr: 'Magasins',
      de: 'Geschäfte'
    },
    compare: {
      en: 'Compare',
      es: 'Comparar',
      fr: 'Comparer',
      de: 'Vergleichen'
    }
  };

  const getTranslation = (key) => {
    return translations[key][language.code] || translations[key]['en'];
  };

  const handleStoreToggle = (store) => {
    setSelectedStores(prev => 
      prev.includes(store)
        ? prev.filter(s => s !== store)
        : [...prev, store]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'minPrice') {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], value]);
    }
  };

  const toggleFavorite = (productId) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedRatings([]);
    setSelectedStores([]);
    setSortBy('relevance');
  };

  const compareProduct = () => {
    navigate('/compare/:productId')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {getTranslation('searchResults')} "{query}"
        </h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input"
          >
            <option value="relevance">Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="reviews">Most Reviews</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center"
          >
            <FiFilter className="mr-2" /> {getTranslation('filters')}
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-64 shrink-0 space-y-6"
          >
            <div className="card">
              <h2 className="font-semibold mb-4">{getTranslation('priceRange')}</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Min</label>
                    <input
                      type="number"
                      id="minPrice"
                      value={priceRange[0]}
                      onChange={handlePriceRangeChange}
                      min={0}
                      max={priceRange[1]}
                      className="input mt-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max</label>
                    <input
                      type="number"
                      id="maxPrice"
                      value={priceRange[1]}
                      onChange={handlePriceRangeChange}
                      min={priceRange[0]}
                      max={maxPrice}
                      className="input mt-1 w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  min={0}
                  max={maxPrice}
                  className="w-full"
                />
              </div>
            </div>

            <div className="card">
              <h2 className="font-semibold mb-4">{getTranslation('rating')}</h2>
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => toggleRating(rating)}
                    className="mr-2"
                  />
                  <div className="flex text-yellow-400">
                    {Array(rating).fill(null).map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                    {Array(5 - rating).fill(null).map((_, i) => (
                      <FiStar key={i} className="text-gray-300" />
                    ))}
                  </div>
                </label>
              ))}
            </div>

            <div className="card">
              <h2 className="font-semibold mb-4">{getTranslation('stores')}</h2>
              {stores.map((store) => (
                <label key={store} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedStores.includes(store)}
                    onChange={() => handleStoreToggle(store)}
                    className="mr-2"
                  />
                  {store}
                </label>
              ))}
            </div>

            {/* Active Filters */}
            {(selectedRatings.length > 0 || selectedStores.length > 0 || 
              priceRange[0] > 0 || priceRange[1] < maxPrice) && (
              <div className="card">
                <h2 className="font-semibold mb-4">Active Filters</h2>
                <div className="space-y-2">
                  {selectedRatings.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ratings</span>
                      <button
                        onClick={() => setSelectedRatings([])}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  {selectedStores.length > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Stores</span>
                      <button
                        onClick={() => setSelectedStores([])}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Price Range</span>
                      <button
                        onClick={() => setPriceRange([0, maxPrice])}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  <button
                    onClick={clearAllFilters}
                    className="btn-secondary w-full mt-4"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex-grow">
          {loading ? (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
              {Array(6).fill(null).map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4 text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`card group ${viewMode === 'list' ? 'flex gap-6' : ''}`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-48 shrink-0' : ''}`}>
                      <div className="relative pb-[100%] rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-contain p-2 transform group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <FiHeart
                          className={`w-5 h-5 ${
                            product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400 mr-2">
                          {Array(5).fill(null).map((_, i) => (
                            <FiStar
                              key={i}
                              className={`${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                            />
                          ))}
                          <span className="ml-1 text-gray-600">{product.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-primary-600">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Available at: {product.stores.join(', ')}
                        </div>
                        <button className="btn-primary" onClick={() => compareProduct()}>
                          {getTranslation('compare')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No products match your filters.</p>
                  <button
                    onClick={clearAllFilters}
                    className="btn-primary mt-4"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;