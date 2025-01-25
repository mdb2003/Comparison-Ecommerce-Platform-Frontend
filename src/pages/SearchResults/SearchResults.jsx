import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { motion } from 'framer-motion';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const results = Array(8).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 99,
    rating: (Math.random() * 2 + 3).toFixed(1),
    stores: Math.floor(Math.random() * 3) + 2
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
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
      </div>

      <div className="flex gap-6">
        {showFilters && (
          <div className="w-64 shrink-0">
            <div className="card">
              <h2 className="font-semibold mb-4">Filters</h2>
              {/* Price Range */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <input type="range" className="w-full" />
              </div>
              {/* Ratings */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
                <select className="input">
                  <option>Any</option>
                  <option>4+ Stars</option>
                  <option>3+ Stars</option>
                </select>
              </div>
              {/* Stores */}
              <div>
                <h3 className="text-sm font-medium mb-2">Stores</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Amazon
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> eBay
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> Walmart
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' : 'space-y-4'}>
            {results.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={viewMode === 'grid' ? 'card' : 'card flex gap-4'}
              >
                <div className={viewMode === 'grid' ? 'mb-4' : 'w-32 shrink-0'}>
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">From ${product.price}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{product.stores} stores available</span>
                    <button className="btn-primary text-sm">Compare</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;