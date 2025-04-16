import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2, FiShoppingCart, FiExternalLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toggleSavedItem, clearSavedItems } from '../../store/slices/savedItemsSlice';
import { addToComparison } from '../../store/slices/productSlice';
import { useLanguage } from '../../context/LanguageContext';
import { toast } from 'react-hot-toast';
import { addToCart } from '../../store/slices/cartSlice';

function SavedItems() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formatPrice } = useLanguage();
    const savedItems = useSelector((state) => state.savedItems.items);
    const comparisonList = useSelector((state) => state.products.comparisonList);

    const handleRemoveItem = (item) => {
        dispatch(toggleSavedItem(item));
        toast.success('Item removed from saved items');
    };

    const handleCompare = (product) => {
        if (comparisonList.length < 3) {
            dispatch(addToComparison(product));
            toast.success('Added to comparison');
        } else {
            toast.error('Maximum 3 products can be compared at once');
        }
    };

    const handleClearAll = () => {
        dispatch(clearSavedItems());
        toast.success('All saved items cleared');
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success('Added to cart');
    };

    const handleBuyNow = (product) => {
        window.open(product.link, '_blank');
    };

    if (savedItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <FiHeart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No Saved Items</h2>
                    <p className="text-gray-600 mb-4">
                        Start saving items you're interested in!
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-primary"
                    >
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Saved Items ({savedItems.length})</h1>
                <button
                    onClick={handleClearAll}
                    className="btn-secondary flex items-center"
                >
                    <FiTrash2 className="mr-2" />
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item) => (
                    <motion.div
                        key={`${item.title}-${item.source}`}
                        layout
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full aspect-square object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-medium mb-2">{item.title}</h3>
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-bold text-lg">
                                    {formatPrice(item.price)}
                                </span>
                                <span className="text-gray-600">
                                    {item.source}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleCompare(item)}
                                        className={`btn-primary flex-1 ${
                                            comparisonList.some(p => p.title === item.title)
                                                ? 'bg-green-500'
                                                : ''
                                        }`}
                                    >
                                        {comparisonList.some(p => p.title === item.title)
                                            ? 'Added to Compare'
                                            : 'Compare'}
                                    </button>
                                    <button
                                        onClick={() => handleRemoveItem(item)}
                                        className="btn-secondary p-2"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="btn-primary flex-1 items-center justify-center"
                                    >
                                        <FiShoppingCart className="mr-2" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(item)}
                                        className="btn-secondary flex-1 items-center justify-center"
                                    >
                                        <FiExternalLink className="mr-2" />
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Comparison Floating Button */}
            {comparisonList.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <button
                        onClick={() => navigate('/compare')}
                        className="btn-primary shadow-lg flex items-center space-x-2 px-6 py-3"
                    >
                        <span>Compare Products ({comparisonList.length})</span>
                        <FiShoppingCart />
                    </button>
                </motion.div>
            )}
        </div>
    );
}

export default SavedItems;

