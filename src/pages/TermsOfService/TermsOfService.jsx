import { motion } from 'framer-motion';
import { FiFileText, FiChevronRight } from 'react-icons/fi';

function TermsOfService() {
    const sections = [
        {
            id: 'introduction',
            title: 'Introduction',
            content: `Welcome to CompareHub ("we," "our," "us"). These Terms of Service ("Terms") govern your use of our website CompareHub and related services.

By accessing or using our platform, you agree to these Terms. If you do not agree, please refrain from using our services.`
        },
        {
            id: 'services',
            title: 'Description of Services',
            content: 'We provide a platform that allows users to search for products, compare prices from multiple e-commerce websites, and purchase via affiliate links. We do not sell products directly; all purchases are completed on third-party platforms.'
        },
        {
            id: 'responsibilities',
            title: 'User Responsibilities',
            items: [
                'Provide accurate and lawful information',
                'Use our platform only for legitimate purposes',
                'Not engage in fraudulent activities, scraping, or data mining',
                'Not attempt to disrupt or exploit vulnerabilities in our system',
                'Respect intellectual property rights of all parties',
                'Not use automated scripts or bots to access our services'
            ],
            note: 'Violation of these terms may result in account suspension or termination.'
        },
        {
            id: 'affiliate',
            title: 'Affiliate Disclosure',
            content: `Our platform participates in affiliate marketing programs. This means when users click on affiliate links and make purchases, we may earn a commission at no extra cost to you.

We do not guarantee product availability, pricing, or quality, as these are controlled by third-party e-commerce platforms.`
        },
        {
            id: 'intellectual-property',
            title: 'Intellectual Property',
            content: 'All content on our platform, including trademarks, logos, and text, is owned by us or licensed to us. Users may not reproduce, modify, or distribute our content without permission.'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
                    <FiFileText className="w-8 h-8 text-primary-600" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                <p className="text-gray-600">
                    Last Updated: January 1, 2025
                </p>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card mb-8"
            >
                <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <FiChevronRight className="w-5 h-5 text-primary-600 mr-2" />
                            <span>{section.title}</span>
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Content Sections */}
            <div className="space-y-12">
                {sections.map((section, index) => (
                    <motion.section
                        key={section.id}
                        id={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="card"
                    >
                        <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                        {section.content && (
                            <p className="text-gray-600 mb-6 whitespace-pre-line">
                                {section.content}
                            </p>
                        )}
                        {section.items && (
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {section.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        )}
                        {section.note && (
                            <p className="mt-4 text-sm text-gray-500 italic">
                                Note: {section.note}
                            </p>
                        )}
                    </motion.section>
                ))}
            </div>

            {/* Additional Legal Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 card"
            >
                <h2 className="text-xl font-semibold mb-4">Additional Legal Information</h2>
                <div className="space-y-4 text-gray-600">
                    <div>
                        <h3 className="font-medium mb-2">Disclaimer of Warranties</h3>
                        <p>
                            We provide our services "as is" without warranties of any kind. We do not guarantee:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>The accuracy or reliability of product data</li>
                            <li>That our platform will be error-free or uninterrupted</li>
                            <li>The quality of products from third-party sites</li>
                            <li>The security of external websites linked from our platform</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">Limitation of Liability</h3>
                        <p>
                            To the fullest extent permitted by law, CompareHub is not liable for:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Any direct, indirect, or consequential damages</li>
                            <li>Any issues arising from third-party transactions</li>
                            <li>Any data loss, revenue loss, or reputational damage</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-center"
            >
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                    For any questions regarding these Terms, please contact us at:
                </p>
                <div className="mt-2">
                    <a
                        href="mailto:support@email.com"
                        className="text-primary-600 hover:text-primary-700"
                    >
                        support@email.com
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

export default TermsOfService;