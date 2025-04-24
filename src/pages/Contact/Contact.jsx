import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import API from '../../api';
import { API_BASE_URL } from '../../config/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({
      success: false,
      error: false,
      message: ''
    });

    try {
      const response = await API.post(`contact/`, formData);
      
      setSubmitStatus({
        success: true,
        error: false,
        message: response.data.message || 'Your message has been sent successfully!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      setSubmitStatus({
        success: false,
        error: true,
        message: error.response?.data?.message || 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          
          {submitStatus.success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center"
            >
              <FiCheck className="mr-2 text-green-500" />
              {submitStatus.message}
            </motion.div>
          )}
          
          {submitStatus.error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md"
            >
              {submitStatus.message}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input mt-1" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input mt-1" 
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input 
                type="text" 
                id="subject" 
                value={formData.subject}
                onChange={handleChange}
                required
                className="input mt-1" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="input mt-1"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`btn-primary w-full ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;