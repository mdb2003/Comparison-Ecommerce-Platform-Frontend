import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { useLanguage } from '../../context/LanguageContext';
import { toast } from 'react-hot-toast';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formatPrice } = useLanguage();
    const { items, total } = useSelector((state) => state.cart);

    const handleQuantityChange = (product, newQuantity) => {
        dispatch(updateQuantity({ product, quantity: newQuantity }));
        if (newQuantity === 0) {
            toast.success('Item removed from cart');
        }
    };

    const handleRemoveItem = (item) => {
        dispatch(removeFromCart(item));
        toast.success('Item removed from cart');
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.success('Cart cleared');
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <FiShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-4">
                        Add some products to your cart!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Shopping Cart ({items.length})</h1>
                <button
                    onClick={handleClearCart}
                    className="btn-secondary flex items-center"
                >
                    <FiTrash2 className="mr-2" />
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {items.map((item) => (
                        <motion.div
                            key={`${item.title}-${item.source}`}
                            layout
                            className="bg-white rounded-lg shadow-md p-4 mb-4"
                        >
                            <div className="flex gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-2">{item.source}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                                className="btn-secondary p-1"
                                            >
                                                <FiMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                                className="btn-secondary p-1"
                                            >
                                                <FiPlus />
                                            </button>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className="font-bold">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                            <button
                                                onClick={() => handleRemoveItem(item)}
                                                className="btn-secondary p-2"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="btn-primary w-full"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
