import { motion } from 'framer-motion';
import { FiShield, FiChevronRight } from 'react-icons/fi';

function PrivacyPolicy() {
    const sections = [
        {
            id: 'introduction',
            title: 'Introduction',
            content: `Welcome to CompareHub ("we," "our," "us"). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect your information when you use our website CompareHub and related services.

By accessing or using our platform, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, please refrain from using our services. We are committed to complying with global data protection laws, including the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable regulations worldwide.`
        },
        {
            id: 'information-we-collect',
            title: 'Information We Collect',
            subsections: [
                {
                    title: 'Personal Information',
                    items: [
                        'Name, email address, and contact details (if provided by the user)',
                        'Account login credentials (if applicable)',
                        'User preferences and saved searches',
                        'Communication data, such as messages sent to our support team'
                    ]
                },
                {
                    title: 'Automatically Collected Information',
                    items: [
                        'IP address, browser type, and device information',
                        'Cookies and tracking data',
                        'Search queries and interactions with product listings',
                        'Geolocation data (if enabled by the user)',
                        'Log files recording user activity and platform interactions'
                    ]
                },
                {
                    title: 'Affiliate Link Tracking',
                    items: [
                        'When you click an affiliate link, we may track the click for commission purposes',
                        'We do not store purchase details from third-party e-commerce platforms',
                        'Certain third-party platforms may also track your activity per their own privacy policies'
                    ]
                }
            ]
        },
        {
            id: 'how-we-use',
            title: 'How We Use Your Information',
            items: [
                'To provide and improve our product search and comparison services',
                'To personalize user experience based on search history',
                'To comply with affiliate program requirements',
                "To analyze and optimize our platform's performance",
                'To communicate important updates and promotional offers (with consent)',
                'To ensure security, prevent fraud, and comply with legal obligations',
                'To improve our website experience using analytics tools and customer feedback'
            ],
            note: 'We do not sell or share your personal data for direct marketing purposes.'
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
                    <FiShield className="w-8 h-8 text-primary-600" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
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
                        {section.subsections && (
                            <div className="space-y-6">
                                {section.subsections.map((subsection) => (
                                    <div key={subsection.title}>
                                        <h3 className="text-lg font-semibold mb-3">
                                            {subsection.title}
                                        </h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                                            {subsection.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
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

            {/* Contact Information */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-center"
            >
                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600">
                    For any privacy-related questions, please contact us at:
                </p>
                <div className="mt-2">
                    <a
                        href="mailto:privacy@email.com"
                        className="text-primary-600 hover:text-primary-700"
                    >
                        privacy@email.com
                    </a>
                </div>
            </motion.div>
        </div>
    );
}

export default PrivacyPolicy;