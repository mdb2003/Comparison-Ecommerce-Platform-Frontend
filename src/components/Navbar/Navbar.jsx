import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut, FiHome, FiTag, FiHeart, FiPackage, FiBell, FiUsers, FiSettings, FiHelpCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';
import AuthContext from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      <nav className="bg-white shadow-md relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Main Nav */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <FiHome className="h-6 w-6 text-primary-600 mr-2" />
                <span className="text-2xl font-bold text-primary-600">CompareHub</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {menuItems.map((section) => (
                  <div
                    key={section.title}
                    className="relative"
                    onMouseEnter={() => setShowMegaMenu(section.title)}
                    onMouseLeave={() => setShowMegaMenu(false)}
                  >
                    <button className="px-3 py-2 text-gray-600 hover:text-primary-600">
                      {section.title}
                    </button>
                    <AnimatePresence>
                      {showMegaMenu === section.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 w-64 mt-2 bg-white rounded-lg shadow-lg p-4"
                        >
                          <div className="grid gap-4">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                              >
                                {typeof item.icon === 'string' ? (
                                  <span className="mr-3">{item.icon}</span>
                                ) : (
                                  <span className="mr-3">{item.icon}</span>
                                )}
                                {item.name}
                              </Link>
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
            <div className="hidden md:flex md:items-center md:space-x-4">
              <ProductSearchBar />
              <Link
                to="/cart"
                className="p-2 text-gray-600 hover:text-primary-600 relative"
              >
                <FiShoppingCart className="w-6 h-6" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 focus:outline-none"
                  >
                    <FiUser className="w-6 h-6" />
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div className="p-4 border-b">
                          <p className="text-sm text-gray-500">Signed in as</p>
                          <p className="font-medium">user@example.com</p>
                        </div>
                        <div className="py-2">
                          {userMenuItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className="flex items-center px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              {item.icon}
                              <span className="ml-3">{item.name}</span>
                            </Link>
                          ))}
                          <button
                            onClick={() => {
                              handleLogout();
                              setShowProfileMenu(false);
                            }}
                            className="w-full flex items-center px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                          >
                            <FiLogOut className="mr-3" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary"
                >
                  {getTranslation('login')}
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary-600 focus:outline-none"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
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
              className="md:hidden bg-white border-t"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                <ProductSearchBar />
                {menuItems.map((section) => (
                  <div key={section.title} className="py-2">
                    <h3 className="text-sm font-medium text-gray-500 px-3 mb-2">
                      {section.title}
                    </h3>
                    {section.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center px-3 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {typeof item.icon === 'string' ? (
                          <span className="mr-3">{item.icon}</span>
                        ) : (
                          <span className="mr-3">{item.icon}</span>
                        )}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}

                {isAuthenticated ? (
                  <>
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center px-3 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-3 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <FiLogOut className="mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-primary-600 hover:text-primary-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {getTranslation('login')}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Backdrop for mega menu */}
      {showMegaMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setShowMegaMenu(false)}
        />
      )}
    </>
  );
}

export default Navbar;