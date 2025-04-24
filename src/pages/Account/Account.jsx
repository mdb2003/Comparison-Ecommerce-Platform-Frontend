import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUser, FiHeart, FiClock, FiSettings, FiTrash2, FiShoppingCart, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { toggleSavedItem } from '../../store/slices/savedItemsSlice';
import { addToComparison } from '../../store/slices/productSlice';
import { toast } from 'react-hot-toast';
import API from '../../api';

function Account() {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileData, setProfileData] = useState({
        full_name: '',
        email: '',
        phone: '',
        created_at: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formatPrice } = useLanguage();
    
    // Get saved items and comparison list from Redux
    const savedItems = useSelector((state) => state.savedItems.items);
    const comparisonList = useSelector((state) => state.products.comparisonList);

    useEffect(() => {
        // Fetch profile data when component mounts
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setIsLoading(true);
        try {
            const response = await API.get('profile/');
            setProfileData({
                full_name: response.data.full_name || '',
                email: response.data.email || '',
                phone: '', // API doesn't provide phone yet
                created_at: response.data.created_at || ''
            });
        } catch (err) {
            console.error('Error fetching profile:', err);
            toast.error('Failed to load profile data');
            // If unauthorized, redirect to login
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');
        
        try {
            const response = await API.put('profile/', {
                full_name: profileData.full_name
            });
            
            if (response.status === 200) {
                toast.success('Profile updated successfully');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
            setError(err.response?.data?.message || 'Failed to update profile');
            toast.error('Failed to update profile');
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        navigate('/forgot-password');
    };

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }).format(date);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Profile</h2>
                        
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                            </div>
                        ) : (
                            <>
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <FiMail className="text-gray-500" />
                                        <span className="font-medium">Email:</span>
                                        <span>{profileData.email}</span>
                                    </div>
                                    
                                    {profileData.created_at && (
                                        <div className="flex items-center gap-3">
                                            <FiCalendar className="text-gray-500" />
                                            <span className="font-medium">Member Since:</span>
                                            <span>{formatDate(profileData.created_at)}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <form onSubmit={handleSaveProfile} className="space-y-4">
                                    <div>
                                        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <input 
                                            type="text" 
                                            id="full_name" 
                                            value={profileData.full_name} 
                                            onChange={handleInputChange}
                                            className="input mt-1" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                            Phone (optional)
                                        </label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            value={profileData.phone} 
                                            onChange={handleInputChange}
                                            className="input mt-1" 
                                        />
                                    </div>
                                    
                                    {error && <div className="text-red-600 text-sm">{error}</div>}
                                    
                                    <button 
                                        type="submit" 
                                        className="btn-primary"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                );
            case 'favorites':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Favorites</h2>
                        {savedItems.length === 0 ? (
                            <div className="text-center py-8">
                                <FiHeart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-lg font-medium mb-2">No Saved Items</h3>
                                <p className="text-gray-600 mb-4">
                                    Items you save will appear here
                                </p>
                                <button
                                    onClick={() => navigate('/')}
                                    className="btn-primary"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {savedItems.map((item) => (
                                    <motion.div
                                        key={`${item.title}-${item.source}`}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full aspect-square object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-medium mb-2 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-bold text-lg">
                                                    {formatPrice(item.price)}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {item.source}
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleCompare(item)}
                                                    className={`btn-primary flex-1 flex items-center justify-center gap-2 ${
                                                        comparisonList.some(p => p.title === item.title)
                                                            ? 'bg-green-500'
                                                            : ''
                                                    }`}
                                                >
                                                    <FiShoppingCart className="w-4 h-4" />
                                                    {comparisonList.some(p => p.title === item.title)
                                                        ? 'Added'
                                                        : 'Compare'}
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveItem(item)}
                                                    className="btn-secondary p-2"
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'history':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">History</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex gap-4 p-4 border rounded-lg">
                                    <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                                    <div>
                                        <h3 className="font-medium">Product Name</h3>
                                        <p className="text-gray-600">Viewed on {new Date().toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium mb-4">Notifications</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        Email notifications for price drops
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        Deal alerts for saved products
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium mb-4">Password</h3>
                                <button onClick={handleChangePassword} className="btn-secondary">
                                    Change Password
                                </button>
                            </div>
                            <div>
                                <h3 className="font-medium mb-4">Delete Account</h3>
                                <button className="text-red-600 hover:text-red-700">
                                    Delete my account
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                            activeTab === 'profile' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                        }`}
                    >
                        <FiUser className="mr-3" />
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                            activeTab === 'favorites' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                        }`}
                    >
                        <FiHeart className="mr-3" />
                        Favorites
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                            activeTab === 'history' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                        }`}
                    >
                        <FiClock className="mr-3" />
                        History
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${
                            activeTab === 'settings' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'
                        }`}
                    >
                        <FiSettings className="mr-3" />
                        Settings
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderTabContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
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

export default Account;
