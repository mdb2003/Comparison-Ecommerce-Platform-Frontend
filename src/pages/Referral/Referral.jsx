import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiGift, FiShare2, FiCopy, FiDollarSign } from 'react-icons/fi';

function Referral() {
    const [referralLink] = useState('https://comparehub.com/ref/user123');
    const [copied, setCopied] = useState(false);

    const stats = [
        { icon: FiUsers, label: 'Referred Users', value: '12' },
        { icon: FiDollarSign, label: 'Total Earnings', value: '$240.00' },
        { icon: FiGift, label: 'Available Credits', value: '$50.00' }
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOptions = [
        { name: 'Facebook', color: 'bg-blue-500' },
        { name: 'Twitter', color: 'bg-sky-500' },
        { name: 'WhatsApp', color: 'bg-green-500' },
        { name: 'Email', color: 'bg-gray-500' }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">Refer & Earn</h1>
                <p className="text-xl text-gray-600">
                    Invite friends and earn rewards when they make their first purchase
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card text-center"
                    >
                        <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-1">{stat.label}</h3>
                        <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="card mb-8"
                >
                    <h2 className="text-xl font-semibold mb-6">Your Referral Link</h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={referralLink}
                            readOnly
                            className="input flex-grow"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="btn-primary flex items-center"
                        >
                            <FiCopy className="mr-2" />
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </motion.div>

                <div className="card">
                    <h2 className="text-xl font-semibold mb-6">Share via</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {shareOptions.map((option) => (
                            <button
                                key={option.name}
                                className={`${option.color} text-white py-2 px-4 rounded-lg flex items-center justify-center`}
                            >
                                <FiShare2 className="mr-2" />
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-12 space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">How it works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { step: 1, title: 'Invite Friends', description: 'Share your unique referral link' },
                                { step: 2, title: 'Friends Shop', description: 'They make their first purchase' },
                                { step: 3, title: 'Earn Rewards', description: 'Get $20 for each referral' }
                            ].map((item) => (
                                <div key={item.step} className="card text-center">
                                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                        {item.step}
                                    </div>
                                    <h3 className="font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Referral bonus is awarded after friend's first purchase</li>
                            <li>Minimum purchase amount of $50 required</li>
                            <li>Maximum of 50 referrals per month</li>
                            <li>Rewards expire after 12 months</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Referral;

