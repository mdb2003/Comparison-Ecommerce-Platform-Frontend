import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // Load saved settings from localStorage or use defaults
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage ? JSON.parse(savedLanguage) : {
            code: 'en',
            name: 'English',
            flag: '🇺🇸'
        };
    });

    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency');
        return savedCurrency ? JSON.parse(savedCurrency) : {
            code: 'USD',
            symbol: '$',
            name: 'US Dollar'
        };
    });

    const [dateFormat, setDateFormat] = useState(() =>
        localStorage.getItem('dateFormat') || 'MM/DD/YYYY'
    );

    const [timeFormat, setTimeFormat] = useState(() =>
        localStorage.getItem('timeFormat') || '12'
    );

    // Save settings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('language', JSON.stringify(language));
    }, [language]);

    useEffect(() => {
        localStorage.setItem('currency', JSON.stringify(currency));
    }, [currency]);

    useEffect(() => {
        localStorage.setItem('dateFormat', dateFormat);
    }, [dateFormat]);

    useEffect(() => {
        localStorage.setItem('timeFormat', timeFormat);
    }, [timeFormat]);

    const formatPrice = (price) => {
        const formatter = new Intl.NumberFormat(language.code, {
            style: 'currency',
            currency: currency.code
        });
        return formatter.format(price);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat(language.code, {
            dateStyle: 'medium'
        }).format(new Date(date));
    };

    const formatTime = (date) => {
        return new Intl.DateTimeFormat(language.code, {
            timeStyle: 'short',
            hour12: timeFormat === '12'
        }).format(new Date(date));
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                currency,
                setCurrency,
                dateFormat,
                setDateFormat,
                timeFormat,
                setTimeFormat,
                formatPrice,
                formatDate,
                formatTime
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}