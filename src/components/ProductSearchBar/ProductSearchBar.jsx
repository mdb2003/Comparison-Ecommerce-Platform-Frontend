import React, { useState, useEffect } from 'react';
import { FiSearch, FiX, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, saveSearchHistory } from '../../store/slices/searchSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { t, isRTL as checkRTL } from '../../utils/translationUtils';

const ProductSearchBar = () => {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showClear, setShowClear] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { recentSearches } = useSelector(state => state.search);
    const [showRecentSearches, setShowRecentSearches] = useState(false);

    // Check for RTL languages
    const isRTL = checkRTL(language.code);

    useEffect(() => {
        // Show clear button only when there's text
        setShowClear(searchQuery.trim().length > 0);
    }, [searchQuery]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setIsLoading(true);
            setShowRecentSearches(false);

            // Update search state
            dispatch(setQuery(searchQuery));
            dispatch(saveSearchHistory(searchQuery));

            try {
                // Fetch products
                await dispatch(fetchProducts(searchQuery));
                
                // Navigate to search results
                navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setShowClear(false);
    };

    const handleRecentSearchClick = (search) => {
        setSearchQuery(search);
        setShowRecentSearches(false);
        handleSearch({ preventDefault: () => {} });
    };

    const handleFocus = () => {
        if (recentSearches?.length > 0) {
            setShowRecentSearches(true);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative">
            <form onSubmit={handleSearch} className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="relative">
                    <motion.input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={handleFocus}
                        placeholder={t('searchPlaceholder', language.code)}
                        className={`input pl-12 ${isRTL ? 'pr-4 text-right' : 'pr-12 text-left'} text-lg w-full transition-shadow duration-300 h-14 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none shadow-sm hover:shadow-md`}
                        initial={{ scale: 0.98 }}
                        whileFocus={{ scale: 1, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    />
                    <motion.div 
                        className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} text-gray-400`}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                    >
                        <FiSearch className="w-5 h-5" />
                    </motion.div>

                    <AnimatePresence>
                        {showClear && (
                            <motion.button
                                type="button"
                                onClick={handleClearSearch}
                                className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-14' : 'right-14'} text-gray-400 hover:text-gray-600 focus:outline-none`}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FiX className="w-5 h-5" />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    <motion.button
                        type="submit"
                        className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} btn-primary h-10 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white font-medium shadow-sm transition-all duration-200`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isLoading || !searchQuery.trim()}
                    >
                        {isLoading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >
                                <FiLoader className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            t('search', language.code)
                        )}
                    </motion.button>
                </div>
            </form>

            <AnimatePresence>
                {showRecentSearches && recentSearches?.length > 0 && (
                    <motion.div
                        className="absolute z-20 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="p-2">
                            <div className="text-xs font-medium text-gray-500 px-2 py-1">
                                {t('recentSearches', language.code)}
                            </div>
                            {recentSearches.slice(0, 5).map((search, index) => (
                                <motion.div
                                    key={index}
                                    className="px-2 py-2 hover:bg-gray-50 cursor-pointer flex items-center text-gray-700"
                                    onClick={() => handleRecentSearchClick(search)}
                                    whileHover={{ backgroundColor: "#f9fafb" }}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ 
                                        opacity: 1, 
                                        x: 0,
                                        transition: { delay: index * 0.05 } 
                                    }}
                                >
                                    <FiSearch className="w-4 h-4 mr-2 text-gray-400" />
                                    <span className="truncate">{search}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductSearchBar;