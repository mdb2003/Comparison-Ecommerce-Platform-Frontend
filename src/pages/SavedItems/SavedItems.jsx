import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiSearch, FiTrash2, FiRefreshCw } from 'react-icons/fi';

function SavedItems() {
    const [activeTab, setActiveTab] = useState('products');

    const savedProducts = Array(4).fill(null).map((_, index) => ({
        id: index + 1,
        name: `Saved Product ${index + 1}`,
        price: Math.floor(Math.random() * 1000) + 99,
        platform: ['Amazon', 'eBay', 'Walmart'][Math.floor(Math.random() * 3)],
        dateAdded: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    }));

    const savedSearches = Array(4).fill(null).map((_, index) => ({
        id: index + 1,
        query: `Search Query ${index + 1}`,
        category: ['Electronics', 'Fashion', 'Home'][Math.floor(Math.random() * 3)],
        dateSearched: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Saved Items</h1>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 rounded-lg ${activeTab === 'products'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <FiHeart className="inline-block mr-2" /> Saved Products
                        </button>
                        <button
                            onClick={() => setActiveTab('searches')}
                            className={`px-4 py-2 rounded-lg ${activeTab === 'searches'
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <FiSearch className="inline-block mr-2" /> Saved Searches
                        </button>
                    </div>
                </motion.div>
            </div>

            {activeTab === 'products' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="card flex gap-4"
                        >
                            <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0"></div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-medium">{product.name}</h3>
                                        <p className="text-sm text-gray-500">{product.platform}</p>
                                    </div>
                                    <button className="text-red-600 hover:text-red-700">
                                        <FiTrash2 />
                                    </button>
                                </div>
                                <p className="text-lg font-bold text-primary-600 mb-2">
                                    ${product.price}
                                </p>
                                <p className="text-sm text-gray-500 mb-4">
                                    Added on {product.dateAdded}
                                </p>
                                <div className="flex gap-2">
                                    <button className="btn-primary flex-grow">Compare Now</button>
                                    <button className="btn-secondary flex-grow">Buy Now</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {savedSearches.map((search) => (
                        <motion.div
                            key={search.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="card"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium mb-1">{search.query}</h3>
                                    <p className="text-sm text-gray-500">
                                        Category: {search.category} • Searched on {search.dateSearched}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="btn-primary flex items-center"
                                        title="Re-run search"
                                    >
                                        <FiRefreshCw className="mr-2" /> Search Again
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-700"
                                        title="Remove saved search"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedItems;

