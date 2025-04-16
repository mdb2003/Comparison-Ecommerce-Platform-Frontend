import { useEffect, useCallback, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingBag, FiX, FiChevronDown, FiShoppingCart, FiExternalLink } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts, addToComparison } from '../../store/slices/productSlice';
import { toggleViewMode, toggleFiltersPanel } from '../../store/slices/uiSlice';
import { toggleSavedItem } from '../../store/slices/savedItemsSlice';
import { toast } from 'react-hot-toast';
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
    <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse bg-gray-100 w-full h-full" />
        </div>
      )}
      <img
        src={src || 'https://dummyimage.com/400x400/e0e0e0/ffffff&text=No+Image'}
        alt={alt}
        className={`w-full h-full object-contain p-4 transform group-hover:scale-110 transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setIsLoading(false);
          setError(true);
          e.target.src = 'https://dummyimage.com/400x400/e0e0e0/ffffff&text=No+Image';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
  const { language, formatPrice } = useLanguage();
  const navigate = useNavigate();
  const comparisonList = useSelector((state) => state.products.comparisonList);
  const savedItems = useSelector((state) => state.savedItems.items);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (query) {
      dispatch(fetchProducts(query));
    }
  }, [dispatch, query]);

  const getFilteredProducts = useCallback(() => {
    if (!Array.isArray(products)) return [];

    return products.filter(product => {
      const price = parseFloat(product.price);
      const inPriceRange = price >= priceRange.min && price <= priceRange.max;
      const inRatingRange = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(product.rating));
      const inSelectedStores = selectedStores.length === 0 || selectedStores.includes(product.source);

      return inPriceRange && inRatingRange && inSelectedStores;
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
  }, [products, priceRange, selectedRatings, selectedStores, sortOrder]);

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
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  const handleBuyNow = (product) => {
    window.open(product.link, '_blank');
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
                  onChange={handlePriceRangeChange}
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
                  onChange={handlePriceRangeChange}
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
            {['Amazon', 'eBay', 'Walmart'].map((store) => (
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Search Results for "{query}"
              </h1>
              <p className="text-gray-600">
                Found {getFilteredProducts().length} products
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="input min-w-[160px]"
              >
                <option value="relevance">Most Relevant</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="md:hidden btn-secondary flex items-center"
              >
                <FiFilter className="mr-2" /> Filters
              </button>

              {/* Desktop Filter Button */}
              <button
                onClick={() => dispatch(toggleFiltersPanel())}
                className="hidden md:flex btn-secondary items-center"
              >
                <FiFilter className="mr-2" /> Filters
              </button>

              <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => dispatch(toggleViewMode('grid'))}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => dispatch(toggleViewMode('list'))}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Filters Panel */}
        <AnimatePresence>
          {showMobileFilters && (
            <FiltersPanel isMobile />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Panel */}
          {showFilters && (
            <div className="hidden md:block">
              <FiltersPanel />
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="card animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-xl mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-red-500 text-xl mb-4">{error}</div>
                <button
                  onClick={() => dispatch(fetchProducts(query))}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </motion.div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                <AnimatePresence>
                  {getFilteredProducts().map((product) => (
                    <motion.div
                      key={`${product.title}-${product.source}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`card group hover:shadow-lg transition-shadow ${
                        viewMode === 'list' ? 'flex flex-col sm:flex-row gap-4 sm:gap-6' : ''
                      }`}
                    >
                      <div className={viewMode === 'list' ? 'w-full sm:w-48 md:w-56 lg:w-64 shrink-0' : ''}>
                        <ProductImage src={product.image} alt={product.title} />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
                            {product.title}
                          </h3>
                          <span className="text-sm font-medium px-2 py-1 bg-primary-50 text-primary-600 rounded-full shrink-0 self-start">
                            {product.source}
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, index) => (
                              <FiStar
                                key={index}
                                className={`w-4 h-4 ${
                                  index < Math.floor(product.rating)
                                    ? 'fill-current'
                                    : ''
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            ({product.rating})
                          </span>
                        </div>
                        <div className="text-2xl font-bold text-primary-600 mb-4">
                          {formatPrice(product.price)}
                        </div>
                        <div className={`flex gap-2 ${viewMode === 'list' ? 'sm:justify-start' : ''}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleCompare(product)}
                            className={`flex-grow sm:flex-grow-0 btn-primary flex items-center justify-center gap-2 ${
                              viewMode === 'list' ? 'sm:px-6' : ''
                            } ${
                              comparisonList.some(p => p.title === product.title)
                                ? 'bg-green-500 hover:bg-green-600'
                                : ''
                            }`}
                          >
                            <FiShoppingBag className="w-4 h-4" />
                            {comparisonList.some(p => p.title === product.title)
                              ? 'Added to Compare'
                              : 'Compare'}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSaveItem(product)}
                            className={`btn-secondary p-2 ${
                              savedItems.some(
                                item => item.title === product.title && 
                                item.source === product.source
                              )
                                ? 'text-red-500'
                                : ''
                            }`}
                          >
                            <FiHeart className={
                              savedItems.some(
                                item => item.title === product.title && 
                                item.source === product.source
                              )
                                ? 'fill-current'
                                : ''
                            } />
                          </motion.button>
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="btn-primary flex items-center"
                            >
                              <FiShoppingCart className="mr-2" />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => handleBuyNow(product)}
                              className="btn-secondary flex items-center"
                            >
                              <FiExternalLink className="mr-2" />
                              Buy Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Floating Button */}
      <AnimatePresence>
        {comparisonList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/compare')}
              className="btn-primary shadow-lg flex items-center gap-2 px-6 py-3"
            >
              <span>Compare Products ({comparisonList.length})</span>
              <FiChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchResults;