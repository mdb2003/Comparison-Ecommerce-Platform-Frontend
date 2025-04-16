import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
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
    FiExternalLink
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
    ]
};

function CategoryProducts() {
    const { category } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formatPrice } = useLanguage();
    
    // Redux state
    const { products, loading, error, comparisonList } = useSelector((state) => state.products);
    const { viewMode, showFilters } = useSelector((state) => state.ui);
    const { priceRange, selectedRatings, selectedStores, sortOrder } = useSelector((state) => state.filter);
    const savedItems = useSelector((state) => state.savedItems.items);

    // Local state
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [showScrollButtons, setShowScrollButtons] = useState(false);

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
            dispatch(fetchProducts(query));
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
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };

    const handleBuyNow = (product) => {
        window.open(product.link, '_blank');
    };

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
                            className={`whitespace-nowrap px-4 py-2 rounded-full ${
                                selectedSubcategory === 'all'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                            All {category}
                        </button>
                        {subcategories.map((subcat) => (
                            <button
                                key={`subcat-${subcat}`}
                                onClick={() => setSelectedSubcategory(subcat)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full ${
                                    selectedSubcategory === subcat
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            >
                                {subcat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters and Sort */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => dispatch(toggleFiltersPanel())}
                    className="btn-secondary flex items-center"
                >
                    <FiFilter className="mr-2" />
                    Filters
                </button>

                <div className="flex items-center space-x-4">
                    <select
                        value={sortOrder}
                        onChange={(e) => dispatch(setSortOrder(e.target.value))}
                        className="input"
                    >
                        <option value="relevance">Relevance</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                    </select>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => dispatch(toggleViewMode())}
                            className={`btn-secondary p-2 ${viewMode === 'grid' ? 'bg-primary-100' : ''}`}
                        >
                            <FiGrid />
                        </button>
                        <button
                            onClick={() => dispatch(toggleViewMode())}
                            className={`btn-secondary p-2 ${viewMode === 'list' ? 'bg-primary-100' : ''}`}
                        >
                            <FiList />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-6">
                {/* Filters Panel */}
                {showFilters && (
                    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-4">
                        <div className="space-y-6">
                            {/* Price Range */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Price Range</h3>
                                <div className="space-y-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000"
                                        value={priceRange.max}
                                        onChange={(e) => dispatch(setPriceRange({ ...priceRange, max: e.target.value }))}
                                        className="w-full"
                                    />
                                    <div className="flex justify-between text-sm">
                                        <span>{formatPrice(priceRange.min)}</span>
                                        <span>{formatPrice(priceRange.max)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Ratings */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Rating</h3>
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <label key={`rating-${rating}`} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedRatings.includes(rating)}
                                            onChange={() => dispatch(toggleRating(rating))}
                                            className="mr-2"
                                        />
                                        <div className="flex text-yellow-400">
                                            {[...Array(rating)].map((_, i) => (
                                                <FiStar
                                                    key={`rating-star-${rating}-${i}`}
                                                    className="fill-current"
                                                />
                                            ))}
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Stores */}
                            <div className="mb-6">
                                <h3 className="font-medium mb-2">Stores</h3>
                                {['Amazon', 'Flipkart', 'eBay'].map((store) => (
                                    <label key={`store-${store}`} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedStores.includes(store)}
                                            onChange={() => dispatch(toggleStore(store))}
                                            className="mr-2"
                                        />
                                        {store}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Grid/List */}
                <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                }`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>Error: {error}</div>
                    ) : filteredProducts.length === 0 ? (
                        <div>No products found</div>
                    ) : (
                        filteredProducts.map((product) => (
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
                                    <div className="p-4">
                                        <h3 className="font-medium mb-2">{product.title}</h3>
                                        <div className="flex items-center mb-2">
                                            <div className="flex text-yellow-400 mr-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FiStar
                                                        key={`star-${i}-${product.title}`}
                                                        className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                                                    />
                                                ))}
                                            </div>
                                            <span>({product.rating})</span>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="font-bold text-lg">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="text-gray-600">
                                                {product.source}
                                            </span>
                                        </div>
                                        <div className="flex flex-col space-y-2">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleCompare(product)}
                                                    className={`btn-primary flex-1 ${
                                                        comparisonList.some(p => p.title === product.title)
                                                            ? 'bg-green-500'
                                                            : ''
                                                    }`}
                                                >
                                                    {comparisonList.some(p => p.title === product.title)
                                                        ? 'Added to Compare'
                                                        : 'Compare'}
                                                </button>
                                                <button 
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
                                                </button>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="btn-primary flex-1 items-center justify-center"
                                                >
                                                    <FiShoppingCart className="mr-2" />
                                                    Add to Cart
                                                </button>
                                                <button
                                                    onClick={() => handleBuyNow(product)}
                                                    className="btn-secondary flex-1 items-center justify-center"
                                                >
                                                    <FiExternalLink className="mr-2" />
                                                    Buy Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Comparison Floating Button */}
            {comparisonList.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <button
                        onClick={() => navigate('/compare')}
                        className="btn-primary shadow-lg flex items-center space-x-2 px-6 py-3"
                    >
                        <span>Compare Products ({comparisonList.length})</span>
                        <FiShoppingCart />
                    </button>
                </motion.div>
            )}
        </div>
    );
}

export default CategoryProducts;
