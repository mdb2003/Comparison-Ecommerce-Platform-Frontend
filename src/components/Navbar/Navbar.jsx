import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import ProductSearchBar from '../ProductSearchBar/ProductSearchBar';
import AuthContext from '../../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login'); // Navigate to login page
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">CompareHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <ProductSearchBar />
            <Link to="/about" className="text-gray-600 hover:text-primary-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary-600">
              Contact
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-primary-600">
              <FiShoppingCart className="w-6 h-6" />
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 focus:outline-none"
                >
                  <FiUser className="w-6 h-6" />
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        role="menuitem"
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Login
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

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary-600"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:text-primary-600 flex items-center"
                >
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-primary-600 hover:text-primary-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            <ProductSearchBar />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
