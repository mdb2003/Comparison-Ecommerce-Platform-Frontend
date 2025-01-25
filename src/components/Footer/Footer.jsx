import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CompareHub</h3>
            <p className="text-gray-600">
              Find the best deals across multiple platforms and save money on your purchases.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary-600">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary-600">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary-600">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary-600">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FiFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FiTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary-600">
                <FiInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} CompareHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;