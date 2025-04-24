import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart, FiExternalLink } from 'react-icons/fi';
import { addToCart } from '../store/slices/cartSlice';
import { toggleSavedItem } from '../store/slices/savedItemsSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const ProductImage = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const fallbackImage = 'https://dummyimage.com/400x400/e0e0e0/ffffff&text=No+Image';

    return (
        <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-gray-200 w-full h-full" />
                </div>
            )}
            <motion.img
                src={src || fallbackImage}
                alt={alt}
                className={`w-full h-full object-contain p-2 transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                    setIsLoading(false);
                    setError(true);
                    e.target.src = fallbackImage;
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );
};

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const savedItems = useSelector((state) => state.savedItems.items);
    const isSaved = savedItems.some(
        item => item.title === product.title && item.source === product.source
    );
    
    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };
    
    const handleToggleSave = () => {
        dispatch(toggleSavedItem(product));
        toast.success(isSaved ? 'Removed from saved items' : 'Added to saved items');
    };
    
    const handleBuyNow = () => {
        window.open(product.link, '_blank');
    };

    return (
        <motion.div 
            className="card overflow-hidden hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <ProductImage src={product.image} alt={product.title} />
            
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary-600 transition-colors">
                        {product.title}
                    </h3>
                    <span className="badge badge-primary shrink-0">
                        {product.source}
                    </span>
                </div>
                
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className={`text-lg ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                
                <div className="text-2xl font-bold text-primary-600 mb-4">
                    ${product.price}
                </div>
                
                <div className="flex flex-col gap-2 mt-auto">
                    <div className="grid grid-cols-2 gap-2">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleAddToCart}
                            className="btn-primary flex items-center justify-center py-2 px-3 text-sm"
                        >
                            <FiShoppingCart className="mr-1 w-4 h-4" />
                            <span>Add to Cart</span>
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleToggleSave}
                            className={`btn-secondary flex items-center justify-center py-2 px-3 text-sm ${isSaved ? 'text-red-500' : ''}`}
                        >
                            <FiHeart className={`mr-1 w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                            <span>{isSaved ? 'Saved' : 'Save'}</span>
                        </motion.button>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleBuyNow}
                        className="btn-secondary flex items-center justify-center py-2 px-3 text-sm w-full"
                    >
                        <FiExternalLink className="mr-1 w-4 h-4" />
                        <span>Buy Now</span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard; 