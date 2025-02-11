import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

function CategoryProducts() {
    const { category } = useParams();
    const { formatPrice } = useLanguage();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedSubcategory, setSelectedSubcategory] = useState('all');
    const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('all');
    const [showScrollButtons, setShowScrollButtons] = useState(false);

    // Filter states
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [sortBy, setSortBy] = useState('popular');
    const [maxPrice, setMaxPrice] = useState(2000);

    const categoryIcons = {
        electronics: '📱',
        fashion: '👕',
        home: '🏠',
        beauty: '💄',
        sports: '⚽',
        books: '📚',
    };

    // Enhanced subcategories with sub-subcategories
    const subcategories = {
        electronics: [
            {
                id: 'smartphones',
                name: 'Smartphones',
                icon: '📱',
                subCategories: [
                    { id: 'android', name: 'Android Phones' },
                    { id: 'ios', name: 'iPhones' },
                    { id: 'flagship', name: 'Flagship Phones' },
                    { id: 'budget', name: 'Budget Phones' },
                    { id: '5g', name: '5G Phones' }
                ]
            },
            {
                id: 'laptops',
                name: 'Laptops',
                icon: '💻',
                subCategories: [
                    { id: 'gaming', name: 'Gaming Laptops' },
                    { id: 'business', name: 'Business Laptops' },
                    { id: 'ultrabook', name: 'Ultrabooks' },
                    { id: 'chromebook', name: 'Chromebooks' },
                    { id: 'macbook', name: 'MacBooks' }
                ]
            },
            {
                id: 'tablets',
                name: 'Tablets',
                icon: '📱',
                subCategories: [
                    { id: 'ipad', name: 'iPads' },
                    { id: 'android-tablets', name: 'Android Tablets' },
                    { id: 'windows-tablets', name: 'Windows Tablets' },
                    { id: 'drawing-tablets', name: 'Drawing Tablets' }
                ]
            },
            {
                id: 'cameras',
                name: 'Cameras',
                icon: '📸',
                subCategories: [
                    { id: 'dslr', name: 'DSLR Cameras' },
                    { id: 'mirrorless', name: 'Mirrorless Cameras' },
                    { id: 'point-shoot', name: 'Point & Shoot' },
                    { id: 'action-cameras', name: 'Action Cameras' },
                    { id: 'drones', name: 'Camera Drones' }
                ]
            },
            {
                id: 'audio',
                name: 'Audio',
                icon: '🎧',
                subCategories: [
                    { id: 'headphones', name: 'Headphones' },
                    { id: 'earbuds', name: 'Earbuds' },
                    { id: 'speakers', name: 'Speakers' },
                    { id: 'microphones', name: 'Microphones' },
                    { id: 'home-audio', name: 'Home Audio' }
                ]
            },
            {
                id: 'gaming',
                name: 'Gaming',
                icon: '🎮',
                subCategories: [
                    { id: 'consoles', name: 'Gaming Consoles' },
                    { id: 'pc-gaming', name: 'PC Gaming' },
                    { id: 'accessories', name: 'Gaming Accessories' },
                    { id: 'vr', name: 'Virtual Reality' }
                ]
            },
            {
                id: 'wearables',
                name: 'Wearables',
                icon: '⌚',
                subCategories: [
                    { id: 'smartwatches', name: 'Smartwatches' },
                    { id: 'fitness-trackers', name: 'Fitness Trackers' },
                    { id: 'smart-glasses', name: 'Smart Glasses' }
                ]
            },
            {
                id: 'smart-home',
                name: 'Smart Home',
                icon: '🏠',
                subCategories: [
                    { id: 'security', name: 'Security Devices' },
                    { id: 'automation', name: 'Home Automation' },
                    { id: 'lighting', name: 'Smart Lighting' },
                    { id: 'thermostats', name: 'Smart Thermostats' }
                ]
            }
        ],
        fashion: [
            { id: 'mens', name: "Men's Clothing", icon: '👔' },
            { id: 'womens', name: "Women's Clothing", icon: '👗' },
            { id: 'kids', name: "Kids' Clothing", icon: '🧒' },
            { id: 'shoes', name: 'Shoes', icon: '👟' },
            { id: 'accessories', name: 'Accessories', icon: '👜' },
            { id: 'jewelry', name: 'Jewelry', icon: '💍' },
        ],
        home: [
            { id: 'furniture', name: 'Furniture', icon: '🛋️' },
            { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
            { id: 'decor', name: 'Decor', icon: '🏺' },
            { id: 'bedding', name: 'Bedding', icon: '🛏️' },
            { id: 'lighting', name: 'Lighting', icon: '💡' },
            { id: 'storage', name: 'Storage', icon: '📦' },
        ],
        beauty: [
            { id: 'skincare', name: 'Skincare', icon: '🧴' },
            { id: 'makeup', name: 'Makeup', icon: '💄' },
            { id: 'haircare', name: 'Haircare', icon: '💇‍♀️' },
            { id: 'fragrance', name: 'Fragrance', icon: '🌸' },
            { id: 'tools', name: 'Beauty Tools', icon: '💅' },
            { id: 'sets', name: 'Gift Sets', icon: '🎁' },
        ],
        sports: [
            { id: 'fitness', name: 'Fitness Equipment', icon: '💪' },
            { id: 'outdoor', name: 'Outdoor Sports', icon: '🏃‍♂️' },
            { id: 'team-sports', name: 'Team Sports', icon: '⚽' },
            { id: 'water-sports', name: 'Water Sports', icon: '🏊‍♂️' },
            { id: 'clothing', name: 'Sports Clothing', icon: '👕' },
            { id: 'accessories', name: 'Sports Accessories', icon: '🎯' },
        ],
        books: [
            { id: 'fiction', name: 'Fiction', icon: '📚' },
            { id: 'non-fiction', name: 'Non-Fiction', icon: '📖' },
            { id: 'children', name: "Children's Books", icon: '🧸' },
            { id: 'academic', name: 'Academic', icon: '🎓' },
            { id: 'comics', name: 'Comics & Manga', icon: '💭' },
            { id: 'magazines', name: 'Magazines', icon: '📰' },
        ],
    };

    useEffect(() => {
        // Check if scroll buttons are needed
        const checkScrollButtons = () => {
            const container = document.getElementById('subcategories-container');
            if (container) {
                setShowScrollButtons(container.scrollWidth > container.clientWidth);
            }
        };

        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);

        return () => window.removeEventListener('resize', checkScrollButtons);
    }, [category]);

    const handleScroll = (direction) => {
        const container = document.getElementById('subcategories-container');
        if (container) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            const mockProducts = Array(12).fill(null).map((_, index) => ({
                id: index + 1,
                name: `${category.charAt(0).toUpperCase() + category.slice(1)} Product ${index + 1}`,
                price: Math.floor(Math.random() * 1000) + 99,
                rating: (Math.random() * 2 + 3).toFixed(1),
                reviews: Math.floor(Math.random() * 1000),
                discount: Math.floor(Math.random() * 50),
                isFavorite: false,
                image: `https://source.unsplash.com/400x400/?${category}`,
                subcategory: subcategories[category.toLowerCase()]?.[Math.floor(Math.random() * 6)]?.id || 'other',
            }));
            setProducts(mockProducts);

            // Set max price based on products
            const highest = Math.max(...mockProducts.map(p => p.price));
            setMaxPrice(Math.ceil(highest / 100) * 100); // Round up to nearest hundred
            setPriceRange([0, highest]);

            setLoading(false);
        }, 1000);
    }, [category]);

    // Apply filters whenever filter states change
    useEffect(() => {
        let result = [...products];

        // Subcategory filter
        if (selectedSubcategory !== 'all') {
            result = result.filter(product => product.subcategory === selectedSubcategory);
        }

        // Price filter
        result = result.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Rating filter
        if (selectedRatings.length > 0) {
            result = result.filter(product =>
                selectedRatings.some(rating => Math.floor(product.rating) === rating)
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
            case 'newest':
                result.sort((a, b) => b.id - a.id);
                break;
            default: // 'popular'
                result.sort((a, b) => b.reviews - a.reviews);
        }

        setFilteredProducts(result);
    }, [products, selectedSubcategory, priceRange, selectedRatings, sortBy]);

    const toggleRating = (rating) => {
        setSelectedRatings(prev =>
            prev.includes(rating)
                ? prev.filter(r => r !== rating)
                : [...prev, rating]
        );
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

    const handlePriceRangeChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.id === 'minPrice') {
            setPriceRange([value, priceRange[1]]);
        } else {
            setPriceRange([priceRange[0], value]);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Category Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <span className="text-6xl mb-4 block">{categoryIcons[category.toLowerCase()]}</span>
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </h1>
                <p className="text-xl text-gray-600">
                    Discover amazing {category.toLowerCase()} at the best prices
                </p>
            </motion.div>

            {/* Enhanced Subcategories Section */}
            <div className="relative mb-8">
                {showScrollButtons && (
                    <>
                        <button
                            onClick={() => handleScroll('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <FiChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => handleScroll('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            <FiChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                <div
                    id="subcategories-container"
                    className="overflow-x-auto hide-scrollbar"
                >
                    <div className="flex space-x-4 pb-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => {
                                setSelectedSubcategory('all');
                                setSelectedSubSubcategory('all');
                            }}
                            className={`shrink-0 px-6 py-3 rounded-xl transition-colors ${selectedSubcategory === 'all'
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            All {category}
                        </motion.button>
                        {subcategories[category.toLowerCase()]?.map((subcat) => (
                            <motion.button
                                key={subcat.id}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => {
                                    setSelectedSubcategory(subcat.id);
                                    setSelectedSubSubcategory('all');
                                }}
                                className={`shrink-0 px-6 py-3 rounded-xl transition-all ${selectedSubcategory === subcat.id
                                        ? 'bg-primary-600 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="mr-2">{subcat.icon}</span>
                                {subcat.name}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Sub-subcategories */}
                {selectedSubcategory !== 'all' && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                    >
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedSubSubcategory('all')}
                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${selectedSubSubcategory === 'all'
                                        ? 'bg-primary-100 text-primary-600 font-medium'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                All {subcategories[category.toLowerCase()]?.find(s => s.id === selectedSubcategory)?.name}
                            </button>
                            {subcategories[category.toLowerCase()]
                                ?.find(s => s.id === selectedSubcategory)
                                ?.subCategories.map((subSubcat) => (
                                    <button
                                        key={subSubcat.id}
                                        onClick={() => setSelectedSubSubcategory(subSubcat.id)}
                                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${selectedSubSubcategory === subSubcat.id
                                                ? 'bg-primary-100 text-primary-600 font-medium'
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {subSubcat.name}
                                    </button>
                                ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn-secondary flex items-center"
                    >
                        <FiFilter className="mr-2" /> Filters
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
                <select
                    className="input"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                </select>
            </div>

            <div className="flex gap-8">
                {/* Filters */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-64 shrink-0"
                    >
                        <div className="space-y-6">
                            <div className="card">
                                <h3 className="font-semibold mb-4">Price Range</h3>
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
                                <h3 className="font-semibold mb-4">Rating</h3>
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
                            {/* Active Filters */}
                            {(selectedRatings.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                                <div className="card">
                                    <h3 className="font-semibold mb-4">Active Filters</h3>
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
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Products Grid/List */}
                <div className="flex-grow">
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
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
                                            {product.discount > 0 && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                                                    -{product.discount}%
                                                </div>
                                            )}
                                            <button
                                                onClick={() => toggleFavorite(product.id)}
                                                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                                            >
                                                <FiHeart
                                                    className={`w-5 h-5 ${product.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors">
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
                                                    {formatPrice(product.price * (1 - product.discount / 100))}
                                                </span>
                                                {product.discount > 0 && (
                                                    <span className="ml-2 text-sm text-gray-500 line-through">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="btn-primary flex-grow flex items-center justify-center">
                                                    <FiShoppingCart className="mr-2" /> Add to Cart
                                                </button>
                                                <button className="btn-secondary flex-grow">Compare</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {filteredProducts.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-600">No products match your filters.</p>
                                    <button
                                        onClick={() => {
                                            setSelectedRatings([]);
                                            setPriceRange([0, maxPrice]);
                                            setSelectedSubcategory('all');
                                        }}
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

export default CategoryProducts;
