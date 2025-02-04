import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiTag } from 'react-icons/fi';
import { ProductSearchBar } from '../../components';
import { useLanguage } from '../../context/LanguageContext';

function Deals() {
    const { formatPrice } = useLanguage();
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sortBy, setSortBy] = useState('discount');
    const [deals, setDeals] = useState([]);
    const [filteredDeals, setFilteredDeals] = useState([]);

    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'];
    const platforms = ['Amazon', 'eBay', 'Walmart'];

    // Initialize deals with mock data
    useEffect(() => {
        const mockDeals = Array(12).fill(null).map((_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            originalPrice: Math.floor(Math.random() * 1000) + 299,
            discountPercentage: Math.floor(Math.random() * 50) + 10,
            platform: platforms[Math.floor(Math.random() * platforms.length)],
            category: categories.slice(1)[Math.floor(Math.random() * (categories.length - 1))],
            image: `https://source.unsplash.com/400x400/?product`
        }));

        setDeals(mockDeals);

        // Set initial max price based on highest product price
        const highest = Math.max(...mockDeals.map(deal => deal.originalPrice));
        setMaxPrice(Math.ceil(highest / 100) * 100); // Round up to nearest hundred
        setPriceRange([0, highest]);
    }, []);

    // Apply filters whenever filter states change
    useEffect(() => {
        let result = [...deals];

        // Category filter
        if (selectedCategory !== 'all') {
            result = result.filter(deal => deal.category === selectedCategory);
        }

        // Platform filter
        if (selectedPlatforms.length > 0) {
            result = result.filter(deal => selectedPlatforms.includes(deal.platform));
        }

        // Price filter
        result = result.filter(deal => {
            const discountedPrice = deal.originalPrice * (1 - deal.discountPercentage / 100);
            return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
        });

        // Sorting
        switch (sortBy) {
            case 'discount':
                result.sort((a, b) => b.discountPercentage - a.discountPercentage);
                break;
            case 'price_low':
                result.sort((a, b) => {
                    const priceA = a.originalPrice * (1 - a.discountPercentage / 100);
                    const priceB = b.originalPrice * (1 - b.discountPercentage / 100);
                    return priceA - priceB;
                });
                break;
            case 'price_high':
                result.sort((a, b) => {
                    const priceA = a.originalPrice * (1 - a.discountPercentage / 100);
                    const priceB = b.originalPrice * (1 - b.discountPercentage / 100);
                    return priceB - priceA;
                });
                break;
            default:
                break;
        }

        setFilteredDeals(result);
    }, [deals, selectedCategory, selectedPlatforms, priceRange, sortBy]);

    const handlePlatformToggle = (platform) => {
        setSelectedPlatforms(prev =>
            prev.includes(platform)
                ? prev.filter(p => p !== platform)
                : [...prev, platform]
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

    const clearAllFilters = () => {
        setSelectedCategory('all');
        setSelectedPlatforms([]);
        setPriceRange([0, maxPrice]);
        setSortBy('discount');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Hot Deals & Offers
                    </h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Discover the best deals across multiple platforms
                    </p>
                    <div className="max-w-2xl mx-auto">
                        <ProductSearchBar />
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
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
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'
                                }`}
                        >
                            <FiGrid />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'
                                }`}
                        >
                            <FiList />
                        </button>
                    </div>
                </div>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input"
                >
                    <option value="discount">Biggest Discount</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                </select>
            </div>

            <div className="flex gap-6">
                {/* Filters Sidebar */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-64 shrink-0"
                    >
                        <div className="card space-y-6">
                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold mb-3">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label key={category} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={selectedCategory === category.toLowerCase()}
                                                onChange={() => setSelectedCategory(category.toLowerCase())}
                                                className="mr-2"
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-semibold mb-3">Price Range</h3>
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

                            {/* Platforms */}
                            <div>
                                <h3 className="font-semibold mb-3">Platforms</h3>
                                <div className="space-y-2">
                                    {platforms.map((platform) => (
                                        <label key={platform} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedPlatforms.includes(platform)}
                                                onChange={() => handlePlatformToggle(platform)}
                                                className="mr-2"
                                            />
                                            {platform}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Active Filters */}
                            {(selectedCategory !== 'all' || selectedPlatforms.length > 0 ||
                                priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                                    <div>
                                        <h3 className="font-semibold mb-3">Active Filters</h3>
                                        <button
                                            onClick={clearAllFilters}
                                            className="btn-secondary w-full"
                                        >
                                            Clear All Filters
                                        </button>
                                    </div>
                                )}
                        </div>
                    </motion.div>
                )}

                {/* Deals Grid/List */}
                <div className="flex-grow">
                    <div className="mb-4 text-gray-600">
                        Showing {filteredDeals.length} of {deals.length} deals
                    </div>
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
                        {filteredDeals.map((deal) => (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`card ${viewMode === 'list' ? 'flex gap-4' : ''}`}
                            >
                                <div className={viewMode === 'grid' ? 'mb-4' : 'w-32 shrink-0'}>
                                    <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg relative">
                                        <img
                                            src={deal.image}
                                            alt={deal.name}
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                                            -{deal.discountPercentage}%
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-500">{deal.platform}</span>
                                        <span className="text-sm text-gray-500">{deal.category}</span>
                                    </div>
                                    <h3 className="font-medium mb-2">{deal.name}</h3>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-lg font-bold text-primary-600">
                                            {formatPrice(deal.originalPrice * (1 - deal.discountPercentage / 100))}
                                        </span>
                                        <span className="text-sm text-gray-500 line-through">
                                            {formatPrice(deal.originalPrice)}
                                        </span>
                                    </div>
                                    <button className="btn-primary w-full flex items-center justify-center">
                                        <FiTag className="mr-2" /> Get Deal
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {filteredDeals.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No deals match your filters.</p>
                            <button
                                onClick={clearAllFilters}
                                className="btn-primary mt-4"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Deals;
