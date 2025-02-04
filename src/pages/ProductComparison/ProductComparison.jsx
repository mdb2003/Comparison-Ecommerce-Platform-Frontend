import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function ProductComparison() {
  const { productId } = useParams();

  // Mock data for demonstration
  const stores = [
    { name: 'Amazon', price: 599.99, rating: 4.5, delivery: '2-day shipping', inStock: true, "url": "https://www.amazon.in/Samsung-Smartphone-Titanium-Storage-_without/dp/B0CT5BJC16/ref=sr_1_3?crid=2EYDWAQ56DZXR&dib=eyJ2IjoiMSJ9.l3Iykx6bCc44vtyTG51s1LUm-piy42_KS9AemhmYbWT0N3rFFgyI9VV7ZMjIs0LI1iBgWcBiIpxJ772vKMDCR3buHyFtNKnew3LV5Fvxho8lR5ZDECppVkfx_gU8XeMQNyPjFk13ldRFn0un1G2HuVM4gFL70tyJK98h5fqw3xpAnzoZI7pl2e1ufiB81_QleNXb9anYX2sGgn3IYGnR01QkC9H2xa6nUeCsvl5tYFA.utYmES16KxlCUGskwRjcTM7Wq4xn99DJ6hq3f--DKW8&dib_tag=se&keywords=samsung%2Bs24%2Bultra%2B5%2Bg%2Bmobile&nsdOptOutParam=true&qid=1738129614&sprefix=samsung%2Bs25%2Bultra%2B5%2Bg%2Bmobile%2Caps%2C318&sr=8-3&th=1" },
    { name: 'eBay', price: 579.99, rating: 4.3, delivery: '3-5 days', inStock: true, "url": "https://www.ebay.com/itm/276700620319?_skw=samsung+galaxy+s24+ultra&epid=23064930687&itmmeta=01JJR9SN2BKGZ83NB8J6X5DEMD&hash=item406ca4661f:g:Z64AAOSwvNRnK7jU&itmprp=enc%3AAQAJAAAA8HoV3kP08IDx%2BKZ9MfhVJKk5NHMv%2BkxXjGRBxMQMMNcOlJvnZJDd2t%2F7vFdbVKTZ9e91NjNihcutqeS6dVZCb1FhTr68G6wl7OSlz1iCNOP%2Fu7fGcC0HDgeOOyn7cJtEuG97h9vEVC%2BeDsOLgD5jhYfSKN6e0nfGd%2B2GCOLnFmyTzOU0NDWw%2BmlXzb1yUKy17mFik1iBTL8yXIEKwYsVLFRiBkAiLJhQxhf5MoLc6IV9BaPKSyrKbhLto%2FI%2BFnaez8d0zwOeKRGTNSHmUU31oaljNiIrVNSNOzr9WSGzwWGzJUbTE15SU9IQaaJtgodMUQ%3D%3D%7Ctkp%3ABFBMttHmiZZl" },
    { name: 'Walmart', price: 589.99, rating: 4.4, delivery: 'Next day', inStock: false, "url": "https://www.walmart.com/ip/Samsung-Galaxy-S24-Ultra-256GB-Unlocked-Android-Smartphone-with-200MP-Camera-8K-Video-Long-Battery-Titanium-Gray/5176689747?classType=VARIANT&from=/search" },
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
                  <Link to={store.url}>Buy Now</Link>
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