import { motion } from 'framer-motion';
import { FiCheck, FiUsers, FiDollarSign, FiShoppingBag } from 'react-icons/fi';

function About() {
  const features = [
    {
      icon: FiUsers,
      title: 'User-Focused',
      description: 'We put our users first, ensuring the best shopping experience.',
    },
    {
      icon: FiDollarSign,
      title: 'Save Money',
      description: 'Find the best deals across multiple platforms in one place.',
    },
    {
      icon: FiShoppingBag,
      title: 'Wide Selection',
      description: 'Access products from multiple trusted online retailers.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          About CompareHub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to help shoppers make informed decisions by providing
          transparent price comparisons across multiple platforms.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card text-center"
          >
            <feature.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: 1, title: 'Search', description: 'Enter the product you\'re looking for' },
            { step: 2, title: 'Compare', description: 'View prices from multiple retailers' },
            { step: 3, title: 'Save', description: 'Choose the best deal and save money' },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Section */}
      <div className="card text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            'Real-time price updates',
            'Trusted retailers only',
            'Transparent comparisons',
            'User reviews and ratings',
            'Price drop alerts',
            'Secure and reliable',
          ].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <FiCheck className="text-green-500 w-5 h-5 shrink-0" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
