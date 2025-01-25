import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

function FAQ() {
  const faqs = [
    {
      question: 'How does CompareHub work?',
      answer: 'CompareHub aggregates product prices from multiple online retailers, allowing you to easily compare prices and find the best deals. We update our prices regularly to ensure accuracy.',
    },
    {
      question: 'Is it free to use CompareHub?',
      answer: 'Yes, CompareHub is completely free to use. We earn a small commission from retailers when you make a purchase through our links, at no additional cost to you.',
    },
    {
      question: 'How often are prices updated?',
      answer: 'We update prices multiple times daily to ensure you have the most current information for making your purchase decisions.',
    },
    {
      question: 'Which retailers do you compare?',
      answer: "We compare prices from major online retailers including Amazon, eBay, Walmart, and many others. We're constantly adding new retailers to provide you with more options.",
    },
    {
      question: 'Can I create price alerts?',
      answer: "Yes, registered users can set price alerts for specific products. We'll notify you via email when the price drops below your target price.",
    },
    {
      question: 'Are the prices accurate?',
      answer: "We strive to maintain accurate prices, but they can change frequently. We recommend verifying the final price on the retailer's website before making a purchase.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  // Define the words/phrases you want to highlight
  const highlightWords = ['easily compare prices', 'free to use', 'no additional cost to you', 'current information for making your purchase decisions', 'provide you with more options'];

  // Function to highlight specific words in the text
  const highlightText = (text) => {
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi'); // Create a regex for matching any of the words

    return text.split(regex).map((part, index) =>
      highlightWords.some((word) => part.toLowerCase() === word.toLowerCase()) ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about CompareHub
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card cursor-pointer"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <FiChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 text-gray-600"
                  >
                    <p>{highlightText(faq.answer)}</p> {/* Render highlighted answer */}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default FAQ;
