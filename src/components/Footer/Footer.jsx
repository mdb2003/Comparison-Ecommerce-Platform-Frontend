import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiCheck, FiX } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import API from '../../api';

function Footer() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ success: false, error: false, message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus({
        success: false,
        error: true,
        message: 'Please enter a valid email address'
      });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ success: false, error: false, message: '' });
    
    try {
      const response = await API.post('newsletter/', { email });
      setStatus({
        success: true,
        error: false,
        message: response.data.message || 'Successfully subscribed to newsletter!'
      });
      setEmail(''); // Clear the email field on success
    } catch (error) {
      setStatus({
        success: false,
        error: true,
        message: error.response?.data?.message || 'Failed to subscribe. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTranslation = (key) => {
    const translations = {
      about: {
        en: 'About Us',
        es: 'Sobre Nosotros',
        fr: 'À Propos',
        de: 'Über Uns'
      },
      contact: {
        en: 'Contact',
        es: 'Contacto',
        fr: 'Contact',
        de: 'Kontakt'
      },
      faq: {
        en: 'FAQ',
        es: 'Preguntas Frecuentes',
        fr: 'FAQ',
        de: 'FAQ'
      },
      privacy: {
        en: 'Privacy Policy',
        es: 'Política de Privacidad',
        fr: 'Politique de Confidentialité',
        de: 'Datenschutzrichtlinie'
      },
      terms: {
        en: 'Terms of Service',
        es: 'Términos de Servicio',
        fr: 'Conditions d\'Utilisation',
        de: 'Nutzungsbedingungen'
      },
      followUs: {
        en: 'Follow Us',
        es: 'Síguenos',
        fr: 'Suivez-nous',
        de: 'Folgen Sie uns'
      },
      description: {
        en: 'Find the best deals across multiple platforms and save money on your purchases.',
        es: 'Encuentra las mejores ofertas en múltiples plataformas y ahorra dinero en tus compras.',
        fr: 'Trouvez les meilleures offres sur plusieurs plateformes et économisez sur vos achats.',
        de: 'Finden Sie die besten Angebote auf verschiedenen Plattformen und sparen Sie Geld bei Ihren Einkäufen.'
      },
      rights: {
        en: 'All rights reserved.',
        es: 'Todos los derechos reservados.',
        fr: 'Tous droits réservés.',
        de: 'Alle Rechte vorbehalten.'
      },
      subscribe: {
        en: 'Subscribe to our newsletter',
        es: 'Suscríbete a nuestro boletín',
        fr: 'Abonnez-vous à notre newsletter',
        de: 'Abonnieren Sie unseren Newsletter'
      },
      email: {
        en: 'Your email',
        es: 'Tu correo electrónico',
        fr: 'Votre email',
        de: 'Deine E-Mail'
      },
      submit: {
        en: 'Submit',
        es: 'Enviar',
        fr: 'Soumettre',
        de: 'Einreichen'
      }
    };

    return translations[key][language.code] || translations[key]['en'];
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const socialIconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    hover: { scale: 1.2, rotate: 5 }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={footerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            className="md:col-span-4"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-500"
              variants={itemVariants}
            >
              CompareHub
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6"
              variants={itemVariants}
            >
              {getTranslation('description')}
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-medium text-gray-900 mb-2">{getTranslation('subscribe')}</h4>
              <form onSubmit={handleSubscribe} className="mt-2">
                <div className="flex">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={getTranslation('email')} 
                    className="px-4 py-2 w-full rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    disabled={isSubmitting}
                    required
                  />
                  <button 
                    type="submit" 
                    className={`bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md transition-all duration-200 transform hover:scale-105 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      getTranslation('submit')
                    )}
                  </button>
                </div>
                {status.success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-green-600 flex items-center"
                  >
                    <FiCheck className="mr-1" /> {status.message}
                  </motion.div>
                )}
                {status.error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-600 flex items-center"
                  >
                    <FiX className="mr-1" /> {status.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <motion.li variants={itemVariants}>
                <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center">
                  <span className="h-1 w-3 bg-primary-500 mr-2 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></span>
                  {getTranslation('about')}
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/contact" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center">
                  <span className="h-1 w-3 bg-primary-500 mr-2 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></span>
                  {getTranslation('contact')}
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/faq" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center">
                  <span className="h-1 w-3 bg-primary-500 mr-2 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></span>
                  {getTranslation('faq')}
                </Link>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Legal</h3>
            <ul className="space-y-3">
              <motion.li variants={itemVariants}>
                <Link to="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center">
                  <span className="h-1 w-3 bg-primary-500 mr-2 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></span>
                  {getTranslation('privacy')}
                </Link>
              </motion.li>
              <motion.li variants={itemVariants}>
                <Link to="/terms" className="text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center">
                  <span className="h-1 w-3 bg-primary-500 mr-2 opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></span>
                  {getTranslation('terms')}
                </Link>
              </motion.li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="md:col-span-4"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{getTranslation('followUs')}</h3>
            <div className="flex space-x-5">
              <motion.a 
                href="#" 
                className="text-gray-600 hover:text-[#4267B2] transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FiFacebook className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-600 hover:text-[#1DA1F2] transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FiTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-600 hover:text-[#E1306C] transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FiInstagram className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-600 hover:text-[#0077B5] transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FiLinkedin className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-600 hover:text-[#FF0000] transition-colors duration-200"
                variants={socialIconVariants}
                whileHover="hover"
              >
                <FiYoutube className="w-6 h-6" />
              </motion.a>
            </div>
            
            <motion.div 
              className="mt-8 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                  <span className="text-2xl font-bold text-primary-600">24/7</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Customer Support</h4>
                  <p className="text-gray-600 text-sm">We're here to help you</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t mt-12 pt-8 text-center text-gray-600 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} <span className="font-medium">CompareHub</span>. {getTranslation('rights')}</p>
          <div className="mt-4 md:mt-0">
            <motion.div 
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <span className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium">Made with ❤️ for shoppers</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;

