import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';

const ProductSearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
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
                    placeholder="Search for products..."
                    className="input pl-12 text-lg"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button type="submit" className="btn-primary absolute right-2 top-1/2 transform -translate-y-1/2">
                    Search
                </button>
            </div>
        </form>
    )
}

export default ProductSearchBar