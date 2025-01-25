import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ProductComparison() {
  const { productId } = useParams();

  // Mock data for demonstration
  const stores = [
    { name: 'Amazon', price: 599.99, rating: 4.5, delivery: '2-day shipping', inStock: true },
    { name: 'eBay', price: 579.99, rating: 4.3, delivery: '3-5 days', inStock: true },
    { name: 'Walmart', price: 589.99, rating: 4.4, delivery: 'Next day', inStock: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>
        <div className="card p-6 mb-6">
          <div className="flex gap-6">
            <div className="w-48 shrink-0">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg"></div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Product Name</h2>
              <p className="text-gray-600 mb-4">Product description goes here...</p>
              <div className="flex items-center text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <span className="ml-2 text-gray-600">(4.5 average)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.map((store, index) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-semibold mb-4">{store.name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-2xl font-bold text-primary-600">${store.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">{store.rating}</span>
                    <FiStar className="text-yellow-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery</p>
                  <p>{store.delivery}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Availability</p>
                  <p className={store.inStock ? 'text-green-600' : 'text-red-600'}>
                    {store.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <button
                  className="btn-primary w-full flex items-center justify-center"
                  disabled={!store.inStock}
                >
                  <FiShoppingCart className="mr-2" />
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductComparison;