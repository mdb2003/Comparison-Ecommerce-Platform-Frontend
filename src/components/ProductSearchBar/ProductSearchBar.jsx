import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuery, saveSearchHistory } from '../../store/slices/searchSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import { useLanguage } from '../../context/LanguageContext';

const ProductSearchBar = () => {
    const { language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Update search state
            dispatch(setQuery(searchQuery));
            dispatch(saveSearchHistory(searchQuery));

            // Fetch products
            await dispatch(fetchProducts(searchQuery));

            // Navigate to search results
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                        language.code === 'en' ? "Search for products..." :
                            language.code === 'es' ? "Buscar productos..." :
                                language.code === 'fr' ? "Rechercher des produits..." :
                                    language.code === 'de' ? "Produkte suchen..." :
                                        "Search for products..."
                    }
                    className="input pl-12 text-lg"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button type="submit" className="btn-primary absolute right-2 top-1/2 transform -translate-y-1/2">
                    {language.code === 'en' ? "Search" :
                        language.code === 'es' ? "Buscar" :
                            language.code === 'fr' ? "Rechercher" :
                                language.code === 'de' ? "Suchen" :
                                    "Search"}
                </button>
            </div>
        </form>
    );
};

export default ProductSearchBar;