import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiThumbsUp, FiThumbsDown, FiFilter } from 'react-icons/fi';

function Reviews() {
    const [selectedPlatform, setSelectedPlatform] = useState('all');
    const [selectedRating, setSelectedRating] = useState('all');
    const [sortBy, setSortBy] = useState('recent');

    const platforms = ['Amazon', 'eBay', 'Walmart'];

    const reviews = Array(8).fill(null).map((_, index) => ({
        id: index + 1,
        platform: platforms[Math.floor(Math.random() * platforms.length)],
        rating: Math.floor(Math.random() * 3) + 3,
        date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
        userName: `User ${index + 1}`,
        title: `Review Title ${index + 1}`,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        helpful: Math.floor(Math.random() * 50),
        verified: Math.random() > 0.5
    }));

    const stats = {
        average: 4.5,
        total: reviews.length,
        distribution: {
            5: 45,
            4: 30,
            3: 15,
            2: 7,
            1: 3
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FiStar
                key={index}
                className={`w-5 h-5 ${index < rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
            />
        ));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold mb-4">Product Reviews</h1>
                <p className="text-gray-600">Reviews from multiple platforms</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Review Summary */}
                <div className="md:col-span-1">
                    <div className="card space-y-6">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary-600 mb-2">
                                {stats.average}
                            </div>
                            <div className="flex justify-center mb-2">
                                {renderStars(Math.floor(stats.average))}
                            </div>
                            <p className="text-gray-600">Based on {stats.total} reviews</p>
                        </div>

                        <div className="space-y-2">
                            {Object.entries(stats.distribution)
                                .reverse()
                                .map(([rating, percentage]) => (
                                    <div key={rating} className="flex items-center">
                                        <span className="w-12">{rating} star</span>
                                        <div className="flex-grow mx-4 h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-full bg-primary-600 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="w-12 text-right">{percentage}%</span>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="card mt-6">
                        <h3 className="font-semibold mb-4">Filter Reviews</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Platform
                                </label>
                                <select
                                    value={selectedPlatform}
                                    onChange={(e) => setSelectedPlatform(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">All Platforms</option>
                                    {platforms.map((platform) => (
                                        <option key={platform} value={platform}>
                                            {platform}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Rating
                                </label>
                                <select
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                    className="input"
                                >
                                    <option value="all">All Ratings</option>
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars & Up</option>
                                    <option value="3">3 Stars & Up</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sort By
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="input"
                                >
                                    <option value="recent">Most Recent</option>
                                    <option value="helpful">Most Helpful</option>
                                    <option value="rating">Highest Rating</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review List */}
                <div className="md:col-span-2 space-y-4">
                    {reviews.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="card"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center mb-1">
                                        {renderStars(review.rating)}
                                        <span className="ml-2 text-sm text-gray-500">
                                            {review.platform}
                                        </span>
                                    </div>
                                    <h3 className="font-medium">{review.title}</h3>
                                </div>
                                <span className="text-sm text-gray-500">{review.date}</span>
                            </div>

                            <p className="text-gray-600 mb-4">{review.content}</p>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button className="text-gray-500 hover:text-primary-600">
                                        <FiThumbsUp className="w-5 h-5" />
                                    </button>
                                    <span className="text-sm text-gray-500">
                                        {review.helpful} found this helpful
                                    </span>
                                </div>
                                {review.verified && (
                                    <span className="text-sm text-green-600">Verified Purchase</span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Reviews;

