import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiStar, FiHeart } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts } from '../../store/slices/productSlice';
import { toggleViewMode, toggleFiltersPanel } from '../../store/slices/uiSlice';
import {
  setPriceRange,
  toggleRating,
  toggleStore,
  setSortOrder,
  clearFilters,
} from '../../store/slices/filterSlice';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const dispatch = useDispatch();
  const { language, formatPrice } = useLanguage();

  // Redux state
  const { products, loading, error } = useSelector((state) => state.products);
  const { viewMode, showFilters } = useSelector((state) => state.ui);
  const {
    priceRange,
    selectedRatings,
    selectedStores,
    sortOrder,
  } = useSelector((state) => state.filter);

  // Fetch products on mount and when query changes
  useEffect(() => {
    if (query) {
      dispatch(fetchProducts(query));
    }
  }, [query, dispatch]);

  // Apply filters and sorting to products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply rating filter
    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product =>
        selectedRatings.some(rating => Math.floor(product.rating) === rating)
      );
    }

    // Apply store filter
    if (selectedStores.length > 0) {
      filtered = filtered.filter(product =>
        selectedStores.includes(product.store)
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.id === 'minPrice') {
      dispatch(setPriceRange({ ...priceRange, min: value }));
    } else {
      dispatch(setPriceRange({ ...priceRange, max: value }));
    }
  };

  const handleToggleRating = (rating) => {
    dispatch(toggleRating(rating));
  };

  const handleToggleStore = (store) => {
    dispatch(toggleStore(store));
  };

  const handleSortChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {getTranslation('searchResults')} "{query}"
        </h1>
        <div className="flex space-x-4">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="input"
          >
            <option value="relevance">Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <button
            onClick={() => dispatch(toggleFiltersPanel())}
            className="btn-secondary flex items-center"
          >
            <FiFilter className="mr-2" /> {getTranslation('filters')}
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => dispatch(toggleViewMode('grid'))}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => dispatch(toggleViewMode('list'))}
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
                      value={priceRange.min}
                      onChange={handlePriceRangeChange}
                      min={0}
                      max={priceRange.max}
                      className="input mt-1 w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Max</label>
                    <input
                      type="number"
                      id="maxPrice"
                      value={priceRange.max}
                      onChange={handlePriceRangeChange}
                      min={priceRange.min}
                      className="input mt-1 w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="font-semibold mb-4">{getTranslation('rating')}</h2>
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleToggleRating(rating)}
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
              {['Amazon', 'eBay', 'Walmart'].map((store) => (
                <label key={store} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedStores.includes(store)}
                    onChange={() => handleToggleStore(store)}
                    className="mr-2"
                  />
                  {store}
                </label>
              ))}
            </div>

            <button
              onClick={handleClearFilters}
              className="btn-secondary w-full"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        <div className="flex-grow">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
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
                    className={`card ${viewMode === 'list' ? 'flex gap-6' : ''}`}
                  >
                    <div className={viewMode === 'list' ? 'w-48 shrink-0' : ''}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {Array(5).fill(null).map((_, i) => (
                            <FiStar
                              key={i}
                              className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">({product.reviews})</span>
                      </div>
                      <div className="text-2xl font-bold text-primary-600">
                        {formatPrice(product.price)}
                      </div>
                      <button className="btn-primary mt-4">
                        {getTranslation('compare')}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;