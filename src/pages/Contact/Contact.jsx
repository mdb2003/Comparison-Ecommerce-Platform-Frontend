import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Contact() {
  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email',
      content: 'support@comparehub.com',
      link: 'mailto:support@comparehub.com',
    },
    {
      icon: FiPhone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: FiMapPin,
      title: 'Address',
      content: '123 Compare Street, Shop City, SC 12345',
      link: '#',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions? We're here to help!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {contactInfo.map((item, index) => (
          <motion.a
            key={item.title}
            href={item.link}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card text-center hover:shadow-lg transition-shadow"
          >
            <item.icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.content}</p>
          </motion.a>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input type="text" id="name" className="input mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input type="email" id="email" className="input mt-1" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input type="text" id="subject" className="input mt-1" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="input mt-1"
              ></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;