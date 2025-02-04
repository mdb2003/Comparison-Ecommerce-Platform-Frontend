import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ProductSearchBar } from '../../components';
import Typewriter from 'typewriter-effect';  // Import the typewriter effect


function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'bg-blue-100 hover:bg-blue-200' },
    { name: 'Fashion', icon: '👕', color: 'bg-pink-100 hover:bg-pink-200' },
    { name: 'Home', icon: '🏠', color: 'bg-green-100 hover:bg-green-200' },
    { name: 'Beauty', icon: '💄', color: 'bg-purple-100 hover:bg-purple-200' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100 hover:bg-orange-200' },
    { name: 'Books', icon: '📚', color: 'bg-yellow-100 hover:bg-yellow-200' },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          <Typewriter
            options={{
              strings: ['Find the Best Deals', 'Instantly'],
              autoStart: true,
              loop: true,
              delay: 100,
            }}
          />
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Compare prices across multiple platforms and save money on your purchases
        </p>

        {/* Search Bar */}
        <ProductSearchBar />
      </motion.div>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.4 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(category.name)}
              className={`card cursor-pointer transition-all transform hover:shadow-xl ${category.color} group`}
            >
              <div className="text-center p-6">
                <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <h3 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <div className="flex items-center mb-6">
          <FiTrendingUp className="w-6 h-6 text-primary-600 mr-2" />
          <h2 className="text-2xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -5 }}
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-medium mb-2">Product Name</h3>
              <p className="text-gray-600 mb-2">From $99.99</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">3 stores available</span>
                <button className="btn-secondary text-sm">Compare</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;