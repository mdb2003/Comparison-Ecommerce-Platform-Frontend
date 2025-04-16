import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart } from 'react-icons/fi';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-hot-toast';

const ProductImage = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const fallbackImage = 'path/to/your/fallback/image.jpg';

    return (
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse bg-gray-200 w-full h-full" />
                </div>
            )}
            <img
                src={src || fallbackImage}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                    setIsLoading(false);
                    setError(true);
                    e.target.src = fallbackImage;
                }}
            />
        </div>
    );
};

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    
    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };

    return (
        <div className="flex space-x-2">
            <button
                onClick={handleAddToCart}
                className="btn-primary flex items-center"
            >
                <FiShoppingCart className="mr-2" />
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard; 