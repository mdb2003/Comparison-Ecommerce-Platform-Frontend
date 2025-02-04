import { motion } from 'framer-motion';
import { FiGlobe, FiDollarSign, FiCheck } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

function Language() {
    const {
        language,
        setLanguage,
        currency,
        setCurrency,
        dateFormat,
        setDateFormat,
        timeFormat,
        setTimeFormat
    } = useLanguage();

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'it', name: 'Italiano', flag: '🇮🇹' },
        { code: 'pt', name: 'Português', flag: '🇵🇹' },
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'zh', name: '中文', flag: '🇨🇳' }
    ];

    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
        { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
        { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        { code: 'INR', symbol: '₹', name: 'Indian Rupee' }
    ];

    const handleLanguageChange = (code) => {
        const selectedLanguage = languages.find(lang => lang.code === code);
        setLanguage(selectedLanguage);
    };

    const handleCurrencyChange = (code) => {
        const selectedCurrency = currencies.find(curr => curr.code === code);
        setCurrency(selectedCurrency);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">Language & Currency</h1>
                <p className="text-xl text-gray-600">
                    Customize your browsing experience
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Language Selection */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="card">
                        <div className="flex items-center mb-6">
                            <FiGlobe className="w-6 h-6 text-primary-600 mr-2" />
                            <h2 className="text-xl font-semibold">Select Language</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${language.code === lang.code
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <span className="text-2xl mr-3">{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </div>
                                    {language.code === lang.code && (
                                        <FiCheck className="w-5 h-5" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Currency Selection */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="card">
                        <div className="flex items-center mb-6">
                            <FiDollarSign className="w-6 h-6 text-primary-600 mr-2" />
                            <h2 className="text-xl font-semibold">Select Currency</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {currencies.map((curr) => (
                                <button
                                    key={curr.code}
                                    onClick={() => handleCurrencyChange(curr.code)}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${currency.code === curr.code
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <span className="w-8 text-lg font-medium">
                                            {curr.symbol}
                                        </span>
                                        <span>{curr.name}</span>
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({curr.code})
                                        </span>
                                    </div>
                                    {currency.code === curr.code && (
                                        <FiCheck className="w-5 h-5" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card mt-6">
                        <h2 className="text-xl font-semibold mb-4">Currency Information</h2>
                        <ul className="space-y-3 text-gray-600">
                            <li>• Exchange rates are updated every hour</li>
                            <li>• All prices will be displayed in your selected currency</li>
                            <li>• Final checkout may be in the retailer's local currency</li>
                            <li>• Some payment methods may have additional conversion fees</li>
                        </ul>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card mt-8"
            >
                <h2 className="text-xl font-semibold mb-4">Regional Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date Format
                        </label>
                        <select
                            className="input"
                            value={dateFormat}
                            onChange={(e) => setDateFormat(e.target.value)}
                        >
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Time Format
                        </label>
                        <select
                            className="input"
                            value={timeFormat}
                            onChange={(e) => setTimeFormat(e.target.value)}
                        >
                            <option value="12">12-hour (AM/PM)</option>
                            <option value="24">24-hour</option>
                        </select>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Language;

