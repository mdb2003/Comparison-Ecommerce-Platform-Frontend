import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCompare } from '../../redux/slices/productSlice';
import { useLanguage } from '../../context/LanguageContext';
import { t, isRTL } from '../../utils/translationUtils';

const ProductCard = ({ product, isCompact }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { language, formatPrice, formatDate } = useLanguage();
  const isRtl = isRTL(language.code);

  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCompare(product));
  };

  if (isCompact) {
    return (
      <motion.div 
        className="compact-card bg-white rounded-lg shadow-sm overflow-hidden flex"
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="w-20 h-20 bg-gray-50 flex-shrink-0 relative">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain p-2" 
            loading="lazy"
          />
        </div>
        <div className="p-3 flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-1 truncate">{product.brand || t('unknownBrand', language.code)}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-primary-600">{formatPrice(product.price)}</span>
            <button 
              onClick={handleAddToCompare}
              className="text-gray-400 hover:text-primary-600 transition-colors"
              aria-label={t('addToCompare', language.code)}
            >
              <FiBarChart2 size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="card bg-white rounded-xl overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain p-4 transition-transform duration-500 ease-out"
            style={{ 
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            loading="lazy"
          />
          {product.discount > 0 && (
            <span className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-0 bg-red-500 text-white text-xs font-bold ${isRtl ? 'rounded-br-md' : 'rounded-bl-md'} py-1 px-2`}>
              -{product.discount}%
            </span>
          )}
          
          {/* Quick action buttons */}
          <motion.div 
            className={`absolute bottom-2 ${isRtl ? 'left-2' : 'right-2'} space-y-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
          >
            <button 
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              aria-label={t('addToWishlist', language.code)}
            >
              <FiHeart size={16} />
            </button>
            <button 
              onClick={handleAddToCompare}
              className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
              aria-label={t('addToCompare', language.code)}
            >
              <FiBarChart2 size={16} />
            </button>
          </motion.div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-sm text-gray-500">{product.brand || t('unknownBrand', language.code)}</h3>
            <h2 className="font-medium text-gray-900 line-clamp-2 h-12">{product.name}</h2>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs font-medium text-gray-500 ms-1">
                {product.rating?.toFixed(1) || '0.0'}
              </span>
            </div>
            {product.reviews && (
              <span className="text-xs text-gray-400 ms-2">
                ({product.reviews} {t('reviews', language.code)})
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              {product.originalPrice && product.originalPrice > product.price ? (
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
                  <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                </div>
              ) : (
                <span className="text-lg font-bold text-primary-600">{formatPrice(product.price)}</span>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium flex items-center"
            >
              <FiShoppingCart className={`${isRtl ? 'ml-1' : 'mr-1'}`} size={16} />
              {t('viewDetails', language.code)}
            </motion.button>
          </div>
          
          {product.freeShipping && (
            <div className="mt-3 text-xs text-green-600 font-medium">
              {t('freeShipping', language.code)}
            </div>
          )}
          
          {product.date && (
            <div className="mt-2 text-xs text-gray-400">
              {t('addedOn', language.code)}: {formatDate(product.date)}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard; 