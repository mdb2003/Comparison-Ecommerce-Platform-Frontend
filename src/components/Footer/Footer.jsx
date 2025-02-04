import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

function Footer() {
  const { language } = useLanguage();

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
      }
    };

    return translations[key][language.code] || translations[key]['en'];
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CompareHub</h3>
            <p className="text-gray-600">
              {getTranslation('description')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-primary-600">{getTranslation('about')}</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-primary-600">{getTranslation('contact')}</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-primary-600">{getTranslation('faq')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-primary-600">{getTranslation('privacy')}</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-primary-600">{getTranslation('terms')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation('followUs')}</h3>
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
          <p>&copy; {new Date().getFullYear()} CompareHub. {getTranslation('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

