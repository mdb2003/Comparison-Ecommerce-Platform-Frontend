import { motion } from 'framer-motion';
import { FiGlobe, FiDollarSign, FiCheck, FiClock, FiCalendar, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { getLanguageInfo, isRTL, t } from '../../utils/translationUtils';
import { getExchangeRate } from '../../utils/currencyUtils';

function Language() {
    const {
        language,
        setLanguage,
        currency,
        setCurrency,
        dateFormat,
        setDateFormat,
        timeFormat,
        setTimeFormat,
        formatPrice,
        baseCurrency
    } = useLanguage();

    // Use our language utility to determine if the current language is RTL
    const currentIsRTL = isRTL(language.code);

    // Sample price for demonstrating currency conversion
    const SAMPLE_PRICE = 100.00;

    // Get available languages from our utility
    const availableLanguages = [
        getLanguageInfo('en'),
        getLanguageInfo('es'),
        getLanguageInfo('fr'),
        getLanguageInfo('de'),
        getLanguageInfo('it'),
        getLanguageInfo('pt'),
        getLanguageInfo('ja'),
        getLanguageInfo('zh'),
        getLanguageInfo('ar'),
        getLanguageInfo('ru'),
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

    const dateFormats = [
        { value: 'MM/DD/YYYY', label: '12/31/2023 (MM/DD/YYYY)' },
        { value: 'DD/MM/YYYY', label: '31/12/2023 (DD/MM/YYYY)' },
        { value: 'YYYY-MM-DD', label: '2023-12-31 (YYYY-MM-DD)' },
        { value: 'DD.MM.YYYY', label: '31.12.2023 (DD.MM.YYYY)' }
    ];

    const timeFormats = [
        { value: '12', label: '12-hour (1:30 PM)' },
        { value: '24', label: '24-hour (13:30)' }
    ];

    const handleLanguageChange = (langInfo) => {
        setLanguage({
            code: langInfo.code,
            name: langInfo.name,
            flag: langInfo.flag
        });
    };

    const handleCurrencyChange = (currencyCode) => {
        const selectedCurrency = currencies.find(curr => curr.code === currencyCode);
        setCurrency(selectedCurrency);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" dir={currentIsRTL ? 'rtl' : 'ltr'}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">
                    {t('languageAndSettings', language.code) || 'Language & Settings'}
                </h1>
                <p className="text-xl text-gray-600">
                    {t('customizeExperience', language.code) || 'Customize your browsing experience'}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Language Selection */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-xl p-6 shadow-md"
                >
                    <div className="flex items-center mb-6">
                        <FiGlobe className="w-6 h-6 text-primary-600 mr-2" />
                        <h2 className="text-xl font-semibold">
                            {t('selectLanguage', language.code) || 'Select Language'}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {availableLanguages.map((lang) => (
                            <motion.button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang)}
                                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                    language.code === lang.code
                                        ? 'bg-primary-50 text-primary-600'
                                        : 'hover:bg-gray-50'
                                }`}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">{lang.flag}</span>
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">{lang.name}</span>
                                        <span className="text-sm text-gray-500">{lang.nativeName}</span>
                                    </div>
                                </div>
                                {language.code === lang.code && (
                                    <FiCheck className="w-5 h-5" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Currency, Date & Time Settings */}
                <div className="space-y-8">
                    {/* Currency Selection */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-xl p-6 shadow-md"
                    >
                        <div className="flex items-center mb-6">
                            <FiDollarSign className="w-6 h-6 text-primary-600 mr-2" />
                            <h2 className="text-xl font-semibold">
                                {t('selectCurrency', language.code) || 'Select Currency'}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {currencies.map((curr) => {
                                const exchangeRate = getExchangeRate(baseCurrency, curr.code);
                                const isBaseCurrency = curr.code === baseCurrency;
                                return (
                                    <motion.button
                                        key={curr.code}
                                        onClick={() => handleCurrencyChange(curr.code)}
                                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                            currency.code === curr.code
                                                ? 'bg-primary-50 text-primary-600'
                                                : 'hover:bg-gray-50'
                                        }`}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-lg font-bold mr-3">{curr.symbol}</span>
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium">{curr.code}</span>
                                                <span className="text-sm text-gray-500">
                                                    {curr.name}
                                                    {isBaseCurrency && (
                                                        <span className="ml-1 text-xs text-blue-500 font-medium">
                                                            (Base Currency)
                                                        </span>
                                                    )}
                                                    {!isBaseCurrency && (
                                                        <span className="ml-1 text-xs text-gray-400">
                                                            (1 {baseCurrency} = {exchangeRate.toFixed(4)} {curr.code})
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                        {currency.code === curr.code && (
                                            <FiCheck className="w-5 h-5" />
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Date & Time Formats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                        className="bg-white rounded-xl p-6 shadow-md"
                    >
                        <div className="space-y-6">
                            {/* Date Format */}
                            <div>
                                <div className="flex items-center mb-4">
                                    <FiCalendar className="w-6 h-6 text-primary-600 mr-2" />
                                    <h2 className="text-xl font-semibold">
                                        {t('dateFormat', language.code) || 'Date Format'}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {dateFormats.map((format) => (
                                        <motion.button
                                            key={format.value}
                                            onClick={() => setDateFormat(format.value)}
                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                                dateFormat === format.value
                                                    ? 'bg-primary-50 text-primary-600'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <span className="font-medium">{format.label}</span>
                                            {dateFormat === format.value && (
                                                <FiCheck className="w-5 h-5" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Format */}
                            <div>
                                <div className="flex items-center mb-4">
                                    <FiClock className="w-6 h-6 text-primary-600 mr-2" />
                                    <h2 className="text-xl font-semibold">
                                        {t('timeFormat', language.code) || 'Time Format'}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {timeFormats.map((format) => (
                                        <motion.button
                                            key={format.value}
                                            onClick={() => setTimeFormat(format.value)}
                                            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                                                timeFormat === format.value
                                                    ? 'bg-primary-50 text-primary-600'
                                                    : 'hover:bg-gray-50'
                                            }`}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <span className="font-medium">{format.label}</span>
                                            {timeFormat === format.value && (
                                                <FiCheck className="w-5 h-5" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Preview Section with Currency Conversion Example */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                className="mt-12 bg-white rounded-xl p-6 shadow-md"
            >
                <h2 className="text-xl font-semibold mb-6">
                    {t('previewSettings', language.code) || 'Preview Your Settings'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-600 mb-2">
                            {t('languagePreview', language.code) || 'Language'}
                        </h3>
                        <div className="flex items-center">
                            <span className="text-2xl mr-2">{language.flag}</span>
                            <span className="font-medium">{language.name}</span>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-600 mb-2">
                            {t('currencyPreview', language.code) || 'Currency'}
                        </h3>
                        <div className="font-medium">
                            <div className="mb-2">
                                <span className="text-xl">{currency.symbol}</span> {currency.name} ({currency.code})
                            </div>
                            <div className="text-sm text-gray-600 mt-2 flex items-center">
                                <FiRefreshCw className="w-4 h-4 mr-1" />
                                <span>Exchange rate: 1 {baseCurrency} = {getExchangeRate(baseCurrency, currency.code).toFixed(2)} {currency.code}</span>
                            </div>
                            {currency.code !== baseCurrency && (
                                <div className="mt-2 p-3 bg-white rounded-md border border-gray-200">
                                    <div className="text-sm text-gray-500 mb-1">Sample Price Conversion:</div>
                                    <div className="flex justify-between items-center">
                                        <div>{SAMPLE_PRICE.toFixed(2)} {baseCurrency}</div>
                                        <div className="text-xl">→</div>
                                        <div className="font-bold text-primary-600">{formatPrice(SAMPLE_PRICE)}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-600 mb-2">
                            {t('dateTimePreview', language.code) || 'Date & Time'}
                        </h3>
                        <div>
                            <div className="font-medium">
                                {new Intl.DateTimeFormat(language.code, {
                                    dateStyle: 'medium'
                                }).format(new Date())}
                            </div>
                            <div className="font-medium">
                                {new Intl.DateTimeFormat(language.code, {
                                    timeStyle: 'short',
                                    hour12: timeFormat === '12'
                                }).format(new Date())}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Language;

