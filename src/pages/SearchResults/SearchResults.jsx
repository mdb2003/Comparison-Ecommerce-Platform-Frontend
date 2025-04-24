import { useEffect, useCallback, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingBag, FiX, FiChevronDown, FiShoppingCart, FiExternalLink, FiDollarSign, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts, addToComparison, fetchTestProducts } from '../../store/slices/productSlice';
import { toggleViewMode, toggleFiltersPanel } from '../../store/slices/uiSlice';
import { toggleSavedItem } from '../../store/slices/savedItemsSlice';
import { toast } from 'react-hot-toast';
import ProductLoadingState from '../../components/ProductLoadingState/ProductLoadingState';
import { t, isRTL } from '../../utils/translationUtils';
import { getExchangeRate } from '../../utils/currencyUtils';
import {
  setPriceRange,
  toggleRating,
  toggleStore,
  setSortOrder,
  clearFilters,
} from '../../store/slices/filterSlice';
import { addToCart } from '../../store/slices/cartSlice';

function ProductImage({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="product-image-wrapper relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loading-shimmer w-full h-full" />
        </div>
      )}
      <img
        src={src || 'https://dummyimage.com/400x400/e0e0e0/ffffff&text=No+Image'}
        alt={alt}
        className={`product-image w-full h-full object-contain p-4 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setError(true);
          e.target.src = 'https://dummyimage.com/400x400/e0e0e0/ffffff&text=No+Image';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

function SearchResults() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products, loading, error } = useSelector((state) => state.products);
  const { viewMode, showFilters } = useSelector((state) => state.ui);
  const { priceRange, selectedRatings, selectedStores, sortOrder } = useSelector((state) => state.filter);
  const { language, formatPrice, currency, baseCurrency } = useLanguage();
  const navigate = useNavigate();
  const comparisonList = useSelector((state) => state.products.comparisonList);
  const savedItems = useSelector((state) => state.savedItems.items);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [usingTestData, setUsingTestData] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);

  // Check for RTL languages
  const isRtl = isRTL(language.code);
  
  // Get the exchange rate between base currency and selected currency
  const currentExchangeRate = getExchangeRate(baseCurrency, currency.code);
  const showCurrencyBanner = baseCurrency !== currency.code;

  useEffect(() => {
    if (query) {
      console.log('SearchResults: Fetching products for query:', query);
      dispatch(fetchProducts(query));
    }
  }, [dispatch, query]);

  // If we encounter a connection error, load test data
  useEffect(() => {
    if (error && error.includes('connect to the server')) {
      console.log('SearchResults: Using test data due to connection error');
      setUsingTestData(true);
      dispatch(fetchTestProducts(query));
    }
  }, [dispatch, error, query]);

  useEffect(() => {
    console.log('SearchResults: Products state updated', { 
      count: products?.length || 0, 
      loading, 
      error,
      productsArray: Array.isArray(products),
      firstProduct: products && products.length > 0 ? products[0] : null
    });
  }, [products, loading, error]);

  const getFilteredProducts = useCallback(() => {
    if (!Array.isArray(products)) {
      console.warn('Products is not an array:', products);
      return [];
    }

    console.log(`Filtering ${products.length} products with criteria:`, {
      priceRange, selectedRatings, selectedStores, sortOrder
    });

    // Log sources of products for debugging
    const sources = {};
    products.forEach(product => {
      const source = product.source || 'Unknown';
      sources[source] = (sources[source] || 0) + 1;
    });
    console.log('Product sources before filtering:', sources);

    // Apply filters
    const filteredProducts = products.filter(product => {
      const price = parseFloat(product.price) || 0;
      const inPriceRange = price >= priceRange.min && price <= priceRange.max;
      
      const rating = Math.floor(parseFloat(product.rating) || 0);
      const inRatingRange = selectedRatings.length === 0 || selectedRatings.includes(rating);
      
      // Normalize store names for consistent comparison
      const productSource = product.source || 'Unknown';
      const inSelectedStores = selectedStores.length === 0 || selectedStores.includes(productSource);
      
      const shouldInclude = inPriceRange && inRatingRange && inSelectedStores;
      
      if (!shouldInclude) {
        console.log(`Excluded product: ${product.title}, price: ${price}, rating: ${rating}, source: ${productSource}`);
        console.log(`Excluded because: price range (${inPriceRange}), rating (${inRatingRange}), store (${inSelectedStores})`);
      }
      
      return shouldInclude;
    }).sort((a, b) => {
      switch (sortOrder) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    
    // Log sources after filtering
    const filteredSources = {};
    filteredProducts.forEach(product => {
      const source = product.source || 'Unknown';
      filteredSources[source] = (filteredSources[source] || 0) + 1;
    });
    console.log('Product sources after filtering:', filteredSources);
    
    return filteredProducts;
  }, [products, priceRange, selectedRatings, selectedStores, sortOrder]);

  const handlePriceChange = (e) => {
    dispatch(setPriceRange([0, parseInt(e.target.value)]));
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

  const handleCompare = (product) => {
    if (comparisonList.length < 3) {
      dispatch(addToComparison(product));
      toast.success('Added to comparison');
    } else {
      toast.error('Maximum 3 products can be compared at once');
    }
  };

  const handleSaveItem = (product) => {
    dispatch(toggleSavedItem(product));
    const isSaved = savedItems.some(
      item => item.title === product.title && item.source === product.source
    );
    
    toast.success(
      isSaved 
        ? 'Product removed from saved items' 
        : 'Product saved successfully'
    );
  };

  const handleAddToCart = (product) => {
    if (product.price === 0) {
      toast.error('This product is out of stock');
      return;
    }
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  const handleBuyNow = (product) => {
    if (product.price === 0) {
      toast.error('This product is out of stock');
      return;
    }
    window.open(product.link, '_blank');
  };

  // Add this function to handle retry with test data
  const handleTryWithTestData = () => {
    setUsingTestData(true);
    dispatch(fetchTestProducts(query));
  };

  const FiltersPanel = ({ isMobile = false }) => (
    <motion.div
      initial={isMobile ? { y: '100%' } : { opacity: 0, x: -20 }}
      animate={isMobile ? { y: 0 } : { opacity: 1, x: 0 }}
      exit={isMobile ? { y: '100%' } : { opacity: 0, x: -20 }}
      className={`${
        isMobile
          ? 'fixed inset-0 bg-white z-50 overflow-auto pt-16'
          : 'w-64 shrink-0 space-y-6'
      }`}
    >
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
      )}

      <div className={`${isMobile ? 'p-4 space-y-6' : ''}`}>
        <div className="card">
          <h2 className="font-semibold mb-4">Price Range</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Min</label>
                <input
                  type="number"
                  id="minPrice"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  className="input mt-1 w-full"
                  placeholder="0"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-600">Max</label>
                <input
                  type="number"
                  id="maxPrice"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  className="input mt-1 w-full"
                  placeholder="1000"
                />
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-primary-600 rounded-full"
                style={{
                  width: `${((priceRange.max - priceRange.min) / priceRange.max) * 100}%`,
                  marginLeft: `${(priceRange.min / priceRange.max) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-4">Rating</h2>
          {[5, 4, 3, 2, 1].map((rating) => (
            <motion.button
              key={rating}
              onClick={() => handleToggleRating(rating)}
              className={`w-full flex items-center justify-between p-2 rounded-lg mb-2 transition-colors ${
                selectedRatings.includes(rating)
                  ? 'bg-primary-50 text-primary-600'
                  : 'hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                {[...Array(rating)].map((_, index) => (
                  <FiStar
                    key={index}
                    className={`w-4 h-4 ${
                      selectedRatings.includes(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-400'
                    }`}
                  />
                ))}
                <span className="ml-2">&up</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="card">
          <h2 className="font-semibold mb-4">Stores</h2>
          <div className="space-y-2">
            {['Amazon', 'Flipkart', 'eBay', 'Walmart'].map((store) => (
              <motion.button
                key={store}
                onClick={() => handleToggleStore(store)}
                className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                  selectedStores.includes(store)
                    ? 'bg-primary-50 text-primary-600'
                    : 'hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{store}</span>
                {selectedStores.includes(store) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-primary-600"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <FiX className="w-4 h-4" />
          Clear All Filters
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {getFilteredProducts().length > 0 
                ? `${t('resultsFor', language.code) || 'Results for'} "${query}"`
                : `${t('searchingFor', language.code) || 'Searching for'} "${query}"`}
            </h1>
            <p className="text-gray-600 mt-1">
              {loading 
                ? t('loading', language.code) || 'Loading...'
                : getFilteredProducts().length > 0 
                  ? `${getFilteredProducts().length} ${t('productsFound', language.code) || 'products found'}`
                  : t('noResults', language.code) || 'No results found'}
            </p>
          </div>
          
          {/* View and Filter Controls */}
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex p-1">
              <button
                onClick={() => dispatch(toggleViewMode('grid'))}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                aria-label={t('gridView', language.code) || 'Grid view'}
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => dispatch(toggleViewMode('list'))}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                aria-label={t('listView', language.code) || 'List view'}
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
              >
                <option value="relevance">Relevance</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            
            {/* Filter Toggle Button */}
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className={`p-2 rounded-lg border border-gray-200 shadow-sm ${filtersVisible ? 'bg-primary-50 text-primary-600' : 'bg-white text-gray-600 hover:text-gray-800'}`}
            >
              <FiFilter className="w-5 h-5" />
            </button>
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden p-2 rounded-lg border border-gray-200 shadow-sm bg-white text-gray-600 hover:text-gray-800"
            >
              <FiFilter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Currency Conversion Banner */}
        {showCurrencyBanner && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-6 flex items-center"
          >
            <FiDollarSign className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-blue-700 font-medium">All prices converted from {baseCurrency} to {currency.code}</p>
              <p className="text-blue-600 text-sm flex items-center">
                <FiRefreshCw className="w-4 h-4 mr-1" />
                <span>Exchange rate: 1 {baseCurrency} = {currentExchangeRate.toFixed(4)} {currency.code}</span>
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex mt-6 gap-6">
          {/* Desktop Filters Sidebar */}
          <AnimatePresence>
            {filtersVisible && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden md:block"
              >
                <FiltersPanel />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Products */}
          <motion.div 
            layout
            className="flex-1"
          >
            {/* Error State */}
            {error && !usingTestData && (
              <div className="p-6 bg-white rounded-xl shadow-md mb-8 text-center">
                <div className="text-red-500 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Could not connect to the server</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="flex justify-center">
                  <button
                    onClick={handleTryWithTestData}
                    className="btn-primary"
                  >
                    Continue with sample data
                  </button>
                </div>
              </div>
            )}
            
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <ProductLoadingState key={i} />
                ))}
              </div>
            )}
            
            {/* No Results */}
            {!loading && getFilteredProducts().length === 0 && (
              <div className="p-8 bg-white rounded-xl shadow-sm text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">We couldn't find any products matching your search and filters.</p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  Clear filters and try again
                </button>
              </div>
            )}
            
            {/* Grid View */}
            {!loading && viewMode === 'grid' && getFilteredProducts().length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProducts().map((product) => (
                  <motion.div
                    key={`${product.title}-${product.source}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md"
                  >
                    <div className="p-4">
                      <ProductImage src={product.image} alt={product.title} />
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {product.source}
                          </span>
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-600 text-sm ml-1">
                              {product.rating ? parseFloat(product.rating).toFixed(1) : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-900 mt-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">
                            {formatPrice(product.price)}
                          </span>
                          <div className="mt-2 sm:mt-0 flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCart(product)}
                              className={`p-2 rounded-lg ${
                                comparisonList.some((p) => p.title === product.title && p.source === product.source)
                                  ? 'bg-green-50 text-green-600'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <FiShoppingCart className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSaveItem(product)}
                              className={`p-2 rounded-lg ${
                                savedItems.some((item) => item.title === product.title && item.source === product.source)
                                  ? 'bg-red-50 text-red-600'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <FiHeart className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleCompare(product)}
                            className="btn-primary py-2"
                          >
                            Add to Compare
                          </button>
                          <button
                            onClick={() => handleBuyNow(product)}
                            className="btn-secondary py-2"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* List View */}
            {!loading && viewMode === 'list' && getFilteredProducts().length > 0 && (
              <div className="space-y-6">
                {getFilteredProducts().map((product) => (
                  <motion.div
                    key={`${product.title}-${product.source}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col sm:flex-row transition-shadow hover:shadow-md"
                  >
                    <div className="sm:w-48 flex-shrink-0">
                      <ProductImage src={product.image} alt={product.title} />
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {product.source}
                          </span>
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="text-gray-600 text-sm ml-1">
                              {product.rating ? parseFloat(product.rating).toFixed(1) : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <h3 className="font-medium text-gray-900 mt-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {product.description || 'No description available'}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xl font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAddToCart(product)}
                            className={`p-2 rounded-lg ${
                              comparisonList.some((p) => p.title === product.title && p.source === product.source)
                                ? 'bg-green-50 text-green-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <FiShoppingCart className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSaveItem(product)}
                            className={`p-2 rounded-lg ${
                              savedItems.some((item) => item.title === product.title && item.source === product.source)
                                ? 'bg-red-50 text-red-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <FiHeart className="w-5 h-5" />
                          </motion.button>
                          <button
                            onClick={() => handleCompare(product)}
                            className="btn-primary px-3 py-1.5"
                          >
                            Add to Compare
                          </button>
                          <button
                            onClick={() => handleBuyNow(product)}
                            className="btn-secondary px-3 py-1.5"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Comparison List Floating Button */}
            {comparisonList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/compare')}
                  className="btn-primary shadow-lg flex items-center px-6 py-3 rounded-full"
                >
                  <span>Compare {comparisonList.length} Products</span>
                  <span className="ml-2 bg-white text-primary-600 w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {comparisonList.length}
                  </span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-0 bottom-0 h-4/5 bg-white rounded-t-2xl z-50 overflow-hidden"
            >
              <FiltersPanel isMobile={true} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchResults;