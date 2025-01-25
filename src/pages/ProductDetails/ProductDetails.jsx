import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4"></div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((thumb) => (
              <div key={thumb} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg cursor-pointer"></div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Name</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-400">
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <FiStar className="fill-current" />
                <span className="ml-2 text-gray-600">(4.5)</span>
              </div>
              <span className="text-gray-600">150 reviews</span>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Available Stores</h2>
            <div className="space-y-4">
              {[
                { store: 'Amazon', price: 599.99, delivery: '2-day shipping' },
                { store: 'eBay', price: 579.99, delivery: '3-5 days' },
                { store: 'Walmart', price: 589.99, delivery: 'Next day' },
              ].map((option) => (
                <div key={option.store} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{option.store}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <FiTruck className="mr-1" />
                      {option.delivery}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">${option.price}</p>
                    <button className="btn-primary text-sm flex items-center">
                      <FiShoppingCart className="mr-1" /> Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <p className="text-gray-600">
              Detailed product description goes here. This should include all the important
              features and specifications of the product.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetails;