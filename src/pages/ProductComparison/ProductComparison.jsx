import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiStar, FiShoppingBag, FiArrowLeft, FiCheck, FiInfo } from 'react-icons/fi';
import { removeFromComparison } from '../../store/slices/productSlice';
import { useLanguage } from '../../context/LanguageContext';

const ComparisonAttribute = ({ label, values, highlight = false }) => (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-4 ${highlight ? 'bg-gray-50' : ''} rounded-lg`}>
        <div className="font-medium text-gray-600">{label}</div>
        {values.map((value, index) => (
            <div key={index} className="text-gray-800">
                {value}
            </div>
        ))}
    </div>
);

function ProductComparison() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formatPrice } = useLanguage();
    const comparisonList = useSelector((state) => state.products.comparisonList);

    const getHighlightedValue = (attribute) => {
        const values = comparisonList.map(product => product[attribute]);
        if (attribute === 'price') {
            return Math.min(...values);
        }
        if (attribute === 'rating') {
            return Math.max(...values);
        }
        return null;
    };

    if (comparisonList.length === 0) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center px-4"
                >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FiInfo className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">No Products to Compare</h2>
                    <p className="text-gray-600 mb-8">Add products to comparison to see their features side by side</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className="btn-primary flex items-center justify-center mx-auto"
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Search
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    const bestPrice = getHighlightedValue('price');
    const bestRating = getHighlightedValue('rating');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Product Comparison</h1>
                    <p className="text-gray-600">Compare features and prices side by side</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="btn-secondary flex items-center"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Search
                </motion.button>
            </motion.div>

            {/* Product Cards - Mobile View */}
            <div className="md:hidden space-y-6 mb-8">
                <AnimatePresence>
                    {comparisonList.map((product, index) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className="card relative"
                        >
                            <button
                                onClick={() => dispatch(removeFromComparison(product))}
                                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <FiX className="w-5 h-5" />
                            </button>

                            <div className="flex gap-4">
                                <div className="w-24 h-24 shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">{product.title}</h3>
                                    <div className="flex items-center mb-2">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">({product.rating})</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="text-xl font-bold text-primary-600">
                                            {formatPrice(product.price)}
                                            {product.price === bestPrice && (
                                                <span className="ml-2 text-sm font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                                    Best Price
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Store:</span>
                                    <span className="font-medium">{product.source}</span>
                                </div>
                                <a
                                    href={product.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full flex items-center justify-center"
                                >
                                    <FiShoppingBag className="mr-2" />
                                    Buy Now
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Comparison Table - Desktop View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Product Headers */}
                <div className="grid grid-cols-4 gap-4 p-6 border-b">
                    <div className="font-semibold text-lg">Compare</div>
                    {comparisonList.map((product) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative"
                        >
                            <button
                                onClick={() => dispatch(removeFromComparison(product))}
                                className="absolute -top-2 -right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <FiX className="w-4 h-4" />
                            </button>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full aspect-square object-cover rounded-lg mb-4"
                            />
                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                            <div className="flex items-center mb-2">
                                <div className="flex text-yellow-400 mr-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">({product.rating})</span>
                            </div>
                            <div className="text-2xl font-bold text-primary-600 mb-4">
                                {formatPrice(product.price)}
                                {product.price === bestPrice && (
                                    <div className="mt-1 text-sm font-medium inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                        <FiCheck className="w-4 h-4 mr-1" />
                                        Best Price
                                    </div>
                                )}
                            </div>
                            <a
                                href={product.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary w-full flex items-center justify-center"
                            >
                                <FiShoppingBag className="mr-2" />
                                Buy Now
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Attributes */}
                <div className="divide-y">
                    <ComparisonAttribute
                        label="Store"
                        values={comparisonList.map(product => (
                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-sm">
                                {product.source}
                            </span>
                        ))}
                    />
                    <ComparisonAttribute
                        label="Price"
                        values={comparisonList.map(product => (
                            <div className={product.price === bestPrice ? 'text-green-600 font-semibold' : ''}>
                                {formatPrice(product.price)}
                            </div>
                        ))}
                        highlight
                    />
                    <ComparisonAttribute
                        label="Rating"
                        values={comparisonList.map(product => (
                            <div className={product.rating === bestRating ? 'text-yellow-600 font-semibold' : ''}>
                                <div className="flex items-center">
                                    <div className="flex text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                                            />
                                        ))}
                                    </div>
                                    <span>({product.rating})</span>
                                </div>
                            </div>
                        ))}
                        highlight
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductComparison;