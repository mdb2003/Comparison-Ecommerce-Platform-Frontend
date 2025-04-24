import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiHome, FiTag, FiHeart, FiPackage, FiBell, FiUsers, FiSettings, FiHelpCircle, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';
import AuthContext from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

function Navbar() {
  const { isAuthenticated, userEmail, logout } = useContext(AuthContext);
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      title: 'Shop',
      items: [
        { name: 'Electronics', icon: '📱', path: '/category/electronics' },
        { name: 'Fashion', icon: '👕', path: '/category/fashion' },
        { name: 'Home', icon: '🏠', path: '/category/home' },
        { name: 'Beauty', icon: '💄', path: '/category/beauty' },
        { name: 'Sports', icon: '⚽', path: '/category/sports' },
        { name: 'Books', icon: '📚', path: '/category/books' },
      ]
    },
    {
      title: 'Deals',
      items: [
        { name: 'Today\'s Deals', icon: <FiTag />, path: '/deals' },
        { name: 'Clearance', icon: <FiTag />, path: '/deals?type=clearance' },
        { name: 'Season Sale', icon: <FiTag />, path: '/deals?type=season' },
      ]
    },
    {
      title: 'Customer',
      items: [
        { name: 'Help Center', icon: <FiHelpCircle />, path: '/faq' },
        { name: 'Contact Us', icon: <FiUsers />, path: '/contact' },
        { name: 'About Us', icon: <FiUsers />, path: '/about' },
      ]
    }
  ];

  const userMenuItems = [
    { name: 'My Account', icon: <FiUser />, path: '/account' },
    { name: 'Orders', icon: <FiPackage />, path: '/orders' },
    { name: 'Saved Items', icon: <FiHeart />, path: '/saved-items' },
    { name: 'Notifications', icon: <FiBell />, path: '/notifications' },
    { name: 'Settings', icon: <FiSettings />, path: '/language' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getTranslation = (key) => {
    const translations = {
      about: {
        en: 'About',
        es: 'Acerca de',
        fr: 'À propos',
        de: 'Über uns'
      },
      contact: {
        en: 'Contact',
        es: 'Contacto',
        fr: 'Contact',
        de: 'Kontakt'
      },
      login: {
        en: 'Login',
        es: 'Iniciar sesión',
        fr: 'Connexion',
        de: 'Anmelden'
      }
    };

    return translations[key][language.code] || translations[key]['en'];
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg' 
            : 'bg-white shadow-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Main Nav */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <FiHome className="h-7 w-7 text-primary-600 mr-2" />
                </motion.div>
                <motion.span 
                  className="text-2xl font-bold text-gradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  CompareHub
                </motion.span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                {menuItems.map((section) => (
                  <div
                    key={section.title}
                    className="relative"
                    onMouseEnter={() => setShowMegaMenu(section.title)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <motion.button 
                      className="px-3 py-2 text-gray-600 hover:text-primary-600 font-medium flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      {section.title}
                      <FiChevronDown className={`w-4 h-4 transition-transform ${showMegaMenu === section.title ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <AnimatePresence>
                      {showMegaMenu === section.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 w-64 mt-2 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
                        >
                          <div className="grid gap-1">
                            {section.items.map((item) => (
                              <motion.div
                                key={item.name}
                                whileHover={{ x: 5 }}
                              >
                                <Link
                                  to={item.path}
                                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-all"
                                >
                                  {typeof item.icon === 'string' ? (
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                  ) : (
                                    <span className="mr-3 text-primary-500">{item.icon}</span>
                                  )}
                                  {item.name}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Search, Cart, and Profile */}
            <div className="hidden md:flex md:items-center md:space-x-5">
              <ProductSearchBar />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/cart"
                  className="p-2 text-gray-600 hover:text-primary-600 relative"
                >
                  <FiShoppingCart className="w-6 h-6" />
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    3
                  </motion.span>
                </Link>
              </motion.div>

              {isAuthenticated ? (
                <div className="relative" ref={profileMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
                      <FiUser className="w-5 h-5 text-primary-600" />
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-72 rounded-xl overflow-hidden shadow-xl bg-white ring-1 ring-black ring-opacity-5 border border-gray-100"
                      >
                        <div className="p-4 border-b bg-primary-50">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="font-medium text-primary-700">{userEmail || 'Loading...'}</p>
                        </div>
                        <div className="py-2">
                          {userMenuItems.map((item, index) => (
                            <motion.div
                              key={item.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0,
                                transition: { delay: index * 0.05 }
                              }}
                            >
                              <Link
                                to={item.path}
                                className="flex items-center px-4 py-3 text-gray-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                onClick={() => setShowProfileMenu(false)}
                              >
                                <span className="mr-3 text-primary-500">{item.icon}</span>
                                <span>{item.name}</span>
                              </Link>
                            </motion.div>
                          ))}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              transition: { delay: userMenuItems.length * 0.05 }
                            }}
                          >
                            <button
                              onClick={() => {
                                handleLogout();
                                setShowProfileMenu(false);
                              }}
                              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <FiLogOut className="mr-3" />
                              Logout
                            </button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg font-medium transition-colors"
                  >
                    {getTranslation('login')}
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 focus:outline-none"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t shadow-lg overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <ProductSearchBar />
                
                <div className="flex justify-between items-center py-2">
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    <span>Cart (3)</span>
                  </Link>
                  
                  {isAuthenticated ? (
                    <Link
                      to="/account"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser className="w-5 h-5" />
                      <span>{userEmail ? userEmail.split('@')[0] : 'Account'}</span>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser className="w-5 h-5" />
                      <span>{getTranslation('login')}</span>
                    </Link>
                  )}
                </div>
                
                {menuItems.map((section, sectionIndex) => (
                  <motion.div 
                    key={section.title} 
                    className="py-2 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: sectionIndex * 0.1 }
                    }}
                  >
                    <h3 className="text-sm font-medium text-gray-500 px-3 mb-2">
                      {section.title}
                    </h3>
                    {section.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }
                        }}
                      >
                        <Link
                          to={item.path}
                          className="flex items-center px-3 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                          onClick={() => setIsOpen(false)}
                        >
                          {typeof item.icon === 'string' ? (
                            <span className="mr-3 text-lg">{item.icon}</span>
                          ) : (
                            <span className="mr-3 text-primary-500">{item.icon}</span>
                          )}
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
                
                {isAuthenticated && (
                  <motion.div 
                    className="pt-4 mt-2 border-t border-gray-100"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <FiLogOut className="mr-3" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className="h-16"></div> {/* Spacer for fixed navbar */}
    </>
  );
}

export default Navbar;