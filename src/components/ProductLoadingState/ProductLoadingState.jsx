import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { isRTL } from '../../utils/translationUtils';

const ProductLoadingState = ({ count = 6, type = 'grid' }) => {
  const { language } = useLanguage();
  // Use our utility for consistent RTL detection
  const isRtl = isRTL(language.code);

  // Create skeleton array based on count prop
  const skeletonArray = Array.from({ length: count }, (_, i) => i);

  const shimmerVariants = {
    initial: {
      backgroundPosition: isRtl ? '500px 0' : '-500px 0',
    },
    animate: {
      backgroundPosition: isRtl ? '-500px 0' : '500px 0',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "linear",
      },
    },
  };

  // Different UI for grid vs list view
  if (type === 'list') {
    return (
      <div className="space-y-4" dir={isRtl ? 'rtl' : 'ltr'}>
        {skeletonArray.map((n) => (
          <motion.div
            key={n}
            className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: n * 0.05,
                duration: 0.4
              }
            }}
          >
            {/* Product Image */}
            <div className={`sm:w-56 aspect-square bg-gray-200 rounded-xl ${isRtl ? 'sm:rounded-l-none' : 'sm:rounded-r-none'} relative overflow-hidden`}>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>

            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              {/* Product Title */}
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>

              {/* Product Description */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <div className="h-4 bg-gray-200 rounded w-5/6 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>

              {/* Price and Store */}
              <div className="mt-auto flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-24 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
                <div className="h-8 bg-gray-200 rounded-full w-32 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {skeletonArray.map((n) => (
        <motion.div 
          key={n}
          className="card animate-pulse bg-white rounded-xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: n * 0.05,
              duration: 0.4
            }
          }}
        >
          {/* Product Image */}
          <div className="aspect-square bg-gray-200 relative overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
            />
          </div>

          <div className="p-4">
            {/* Product Title */}
            <div className={`h-6 bg-gray-200 rounded ${isRtl ? 'w-3/4 mr-auto' : 'w-3/4 ml-0'} mb-2 relative overflow-hidden`}>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>

            {/* Product Price */}
            <div className={`h-5 bg-gray-200 rounded ${isRtl ? 'w-1/2 mr-auto' : 'w-1/2 ml-0'} mb-4 relative overflow-hidden`}>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
              />
            </div>

            {/* Rating */}
            <div className={`flex ${isRtl ? 'space-x-reverse' : 'space-x-1'} mb-4`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-5 h-5 rounded-full bg-gray-200 relative overflow-hidden">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
              <div className="h-10 bg-gray-200 rounded w-24 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
              <div className="h-10 bg-gray-200 rounded w-24 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductLoadingState; 