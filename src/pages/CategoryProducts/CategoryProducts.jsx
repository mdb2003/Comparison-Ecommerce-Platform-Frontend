import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiFilter, 
    FiGrid, 
    FiList, 
    FiStar, 
    FiHeart, 
    FiShoppingCart, 
    FiChevronLeft, 
    FiChevronRight,
    FiSmartphone,
    FiPackage,
    FiHome,
    FiBook,
    FiHeadphones,
    FiMonitor,
    FiCamera,
    FiWatch,
    FiExternalLink,
    FiChevronDown
} from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProducts, addToComparison } from '../../store/slices/productSlice';
import { toggleViewMode, toggleFiltersPanel } from '../../store/slices/uiSlice';
import {
    setPriceRange,
    toggleRating,
    toggleStore,
    setSortOrder,
    clearFilters,
} from '../../store/slices/filterSlice';
import { toggleSavedItem } from '../../store/slices/savedItemsSlice';
import { toast } from 'react-hot-toast';
import { addToCart } from '../../store/slices/cartSlice';

// Define category icons
const categoryIcons = {
    electronics: FiSmartphone,
    fashion: FiPackage,
    home: FiHome,
    books: FiBook,
    beauty: FiPackage,
    audio: FiHeadphones,
    computers: FiMonitor,
    cameras: FiCamera,
    watches: FiWatch
};

// Define subcategories for each main category
const categorySubcategories = {
    electronics: [
        'Smartphones',
        'Laptops',
        'Tablets',
        'Cameras',
        'Audio',
        'Gaming',
        'Accessories'
    ],
    fashion: [
        'Men\'s Clothing',
        'Women\'s Clothing',
        'Kids\' Clothing',
        'Shoes',
        'Accessories',
        'Watches',
        'Jewelry'
    ],
    home: [
        'Furniture',
        'Kitchen',
        'Decor',
        'Bedding',
        'Lighting',
        'Storage',
        'Appliances'
    ],
    books: [
        'Fiction',
        'Non-Fiction',
        'Educational',
        'Comics',
        'Children\'s Books',
        'Business',
        'Self-Help'
    ],
    beauty: [
        'Makeup',
        'Skincare',
        'Haircare',
        'Fragrance',
        'Tools',
        'Bath & Body',
        'Nails'
    ]
};

function CategoryProducts() {
    const { category } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formatPrice, language } = useLanguage();
    
    // Redux state
    const { products, loading, error, comparisonList } = useSelector((state) => state.products);
    const { viewMode, showFilters } = useSelector((state) => state.ui);
    const { priceRange, selectedRatings, selectedStores, sortOrder } = useSelector((state) => state.filter);
    const savedItems = useSelector((state) => state.savedItems.items);

    // Local state
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [showScrollButtons, setShowScrollButtons] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [filtersVisible, setFiltersVisible] = useState(true);

    // Get subcategories for current category
    const subcategories = categorySubcategories[category?.toLowerCase()] || [];

    // Scroll functionality for subcategories
    const handleScroll = (direction) => {
        const container = document.getElementById('subcategories-container');
        const scrollAmount = 200;
        if (container) {
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Check if scroll buttons should be shown
    useEffect(() => {
        const container = document.getElementById('subcategories-container');
        if (container) {
            const checkScroll = () => {
                setShowScrollButtons(container.scrollWidth > container.clientWidth);
            };
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, [subcategories]);

    // Fetch products when category or subcategory changes
    useEffect(() => {
        if (category) {
            const query = selectedSubcategory === 'all' 
                ? category 
                : `${category} ${selectedSubcategory}`;
            
            // Create a category-specific query to ensure different results
            // This adds a tag to ensure we get back category-specific test data
            const categorizedQuery = `${query}:category=${category}`;
            dispatch(fetchProducts(categorizedQuery));
        }
    }, [category, selectedSubcategory, dispatch]);

    // Filter and sort products
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

    const handleCompare = (product) => {
        if (comparisonList.length < 3) {
            dispatch(addToComparison(product));
        } else {
            alert('Maximum 3 products can be compared at once');
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

    // Toggle ratings in filter
    const handleToggleRating = (rating) => {
        dispatch(toggleRating(rating));
    };

    // Toggle stores in filter
    const handleToggleStore = (store) => {
        dispatch(toggleStore(store));
    };

    // Handle sort order change
    const handleSortChange = (e) => {
        dispatch(setSortOrder(e.target.value));
    };

    // Handle clearing all filters
    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    // Filters Panel Component
    const FiltersPanel = ({ isMobile = false }) => (
        <div className={`bg-white rounded-xl p-5 shadow-sm border border-gray-200 ${isMobile ? 'h-full' : ''}`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-lg">Filters</h2>
                <button
                    onClick={handleClearFilters}
                    className="text-sm text-primary-600 hover:text-primary-800"
                >
                    Clear Filters
                </button>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
                <h3 className="font-medium mb-2">Price</h3>
                <div className="flex items-center">
                    <input 
                        type="range" 
                        min="0" 
                        max="1000" 
                        value={priceRange.max} 
                        onChange={(e) => dispatch(setPriceRange({ min: 0, max: parseInt(e.target.value) }))} 
                        className="w-full"
                    />
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(priceRange.max)}</span>
                </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
                <h3 className="font-medium mb-2">Rating</h3>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`rating-${rating}`}
                                checked={selectedRatings.includes(rating)}
                                onChange={() => handleToggleRating(rating)}
                                className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                            />
                            <label htmlFor={`rating-${rating}`} className="ml-2 text-gray-700 flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar 
                                        key={i} 
                                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                ))}
                                <span className="ml-1 text-sm">and up</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Store Filter */}
            <div>
                <h3 className="font-medium mb-2">Store</h3>
                <div className="space-y-2 max-h-48 overflow-auto">
                    {['Amazon', 'Flipkart', 'eBay', 'Walmart'].map((store) => (
                        <div key={store} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`store-${store}`}
                                checked={selectedStores.includes(store)}
                                onChange={() => handleToggleStore(store)}
                                className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                            />
                            <label htmlFor={`store-${store}`} className="ml-2 text-gray-700">
                                {store}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            
            {isMobile && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <button 
                        onClick={() => setShowMobileFilters(false)}
                        className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );

    const filteredProducts = getFilteredProducts();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Category Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3">
                    {categoryIcons[category?.toLowerCase()] && React.createElement(categoryIcons[category.toLowerCase()], {
                        className: "w-8 h-8 text-primary-600"
                    })}
                    <h1 className="text-3xl font-bold capitalize">{category}</h1>
                </div>
                <p className="text-gray-600 mt-2">
                    {filteredProducts.length} products found
                </p>
            </div>

            {/* Subcategories Scrollable List */}
            {subcategories.length > 0 && (
                <div className="relative mb-8">
                    {showScrollButtons && (
                        <>
                            <button
                                onClick={() => handleScroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                onClick={() => handleScroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2"
                            >
                                <FiChevronRight />
                            </button>
                        </>
                    )}
                    <div
                        id="subcategories-container"
                        className="flex overflow-x-auto hide-scrollbar space-x-4 px-2"
                    >
                        <button
                            onClick={() => setSelectedSubcategory('all')}
                            className={`shrink-0 px-4 py-2 rounded-full shadow-sm ${
                                selectedSubcategory === 'all' 
                                    ? 'bg-primary-600 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            All
                        </button>
                        {subcategories.map((subcat) => (
                            <button
                                key={subcat}
                                onClick={() => setSelectedSubcategory(subcat)}
                                className={`shrink-0 px-4 py-2 rounded-full shadow-sm ${
                                    selectedSubcategory === subcat 
                                        ? 'bg-primary-600 text-white' 
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {subcat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* View Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold">
                    {selectedSubcategory === 'all' ? 'All Products' : selectedSubcategory}
                </h2>
                
                <div className="flex items-center space-x-4">
                    {/* View Mode Toggle */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex p-1">
                        <button
                            onClick={() => dispatch(toggleViewMode('grid'))}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="Grid view"
                        >
                            <FiGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => dispatch(toggleViewMode('list'))}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                            aria-label="List view"
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

            {/* Main Content */}
            <div className="flex mt-6 gap-6">
                {/* Desktop Filters Sidebar */}
                <AnimatePresence>
                    {filtersVisible && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="hidden md:block w-64"
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
                    {/* Loading State */}
                    {loading && (
                        <div className="col-span-full flex justify-center items-center p-8">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                                <p>Loading products...</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Error State */}
                    {error && (
                        <div className="col-span-full p-8 text-center">
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-red-600">{error}</p>
                            </div>
                        </div>
                    )}
                    
                    {/* No Results */}
                    {!loading && !error && filteredProducts.length === 0 && (
                        <div className="p-8 bg-white rounded-xl shadow-sm text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600 mb-6">We couldn't find any products matching your filters.</p>
                            <button
                                onClick={handleClearFilters}
                                className="btn-primary"
                            >
                                Clear filters and try again
                            </button>
                        </div>
                    )}
                    
                    {/* Product Grid/List */}
                    {!loading && !error && filteredProducts.length > 0 && (
                        <div className={`grid gap-6 ${
                            viewMode === 'grid' 
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                                : 'grid-cols-1'
                        }`}>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={`${product.title}-${product.source}`}
                                    layout
                                    className="bg-white rounded-lg shadow-md overflow-hidden"
                                >
                                    <div className={`${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                                        <div className={`${viewMode === 'list' ? 'w-48 shrink-0' : ''}`}>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full aspect-square object-cover"
                                            />
                                        </div>
                                        
                                        <div className="p-4 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                                                    {product.source}
                                                </span>
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 mr-1">★</span>
                                                    <span className="text-sm">{product.rating}</span>
                                                </div>
                                            </div>
                                            
                                            <h3 className="font-medium line-clamp-2 mb-2">
                                                {product.title}
                                            </h3>
                                            
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mt-auto">
                                                <span className="text-lg font-bold">
                                                    {formatPrice(product.price)}
                                                </span>
                                                
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleAddToCart(product)}
                                                        className={`p-2 rounded-full ${
                                                            comparisonList.some(p => p.id === product.id)
                                                                ? 'bg-green-100 text-green-600'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                        title="Add to cart"
                                                    >
                                                        <FiShoppingCart className="w-5 h-5" />
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => dispatch(toggleSavedItem(product))}
                                                        className={`p-2 rounded-full ${
                                                            savedItems.some(item => item.id === product.id)
                                                                ? 'bg-red-100 text-red-600'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                        }`}
                                                        title="Save for later"
                                                    >
                                                        <FiHeart className="w-5 h-5" />
                                                    </button>
                                                    
                                                    <button
                                                        onClick={() => handleCompare(product)}
                                                        className="btn-primary"
                                                    >
                                                        Add to Compare
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
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
        </div>
    );
}

export default CategoryProducts;
