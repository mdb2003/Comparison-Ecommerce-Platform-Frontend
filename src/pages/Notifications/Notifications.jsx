import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTag, FiClock, FiPackage, FiBell, FiTrash2, FiSettings } from 'react-icons/fi';

function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'price_drop',
            title: 'Price Drop Alert',
            message: 'The price of "Product 1" has dropped by 20%',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'deal',
            title: 'New Deal Available',
            message: 'New deals available in your favorite category',
            time: '5 hours ago',
            read: true
        },
        {
            id: 3,
            type: 'order',
            title: 'Order Update',
            message: 'Your order #1234 has been delivered',
            time: '1 day ago',
            read: true
        }
    ]);

    const [settings, setSettings] = useState({
        emailNotifications: true,
        browserNotifications: false,
        priceDropAlerts: true,
        dealAlerts: true,
        orderUpdates: true
    });

    const getIcon = (type) => {
        switch (type) {
            case 'price_drop':
                return <FiTag className="w-6 h-6 text-green-500" />;
            case 'deal':
                return <FiBell className="w-6 h-6 text-blue-500" />;
            case 'order':
                return <FiPackage className="w-6 h-6 text-purple-500" />;
            default:
                return <FiClock className="w-6 h-6 text-gray-500" />;
        }
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-3xl font-bold mb-2">Notifications</h1>
                    <p className="text-gray-600">Stay updated with price drops and deals</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-4"
                >
                    <button onClick={markAllAsRead} className="btn-secondary">
                        Mark all as read
                    </button>
                    <button className="btn-primary flex items-center">
                        <FiSettings className="mr-2" /> Settings
                    </button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    {notifications.map((notification) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`card ${!notification.read ? 'border-l-4 border-primary-500' : ''}`}
                        >
                            <div className="flex gap-4">
                                <div className="shrink-0">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{notification.title}</h3>
                                            <p className="text-gray-600">{notification.message}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="card">
                        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between">
                                <span>Email Notifications</span>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-primary-600"
                                />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Browser Notifications</span>
                                <input
                                    type="checkbox"
                                    checked={settings.browserNotifications}
                                    onChange={(e) => setSettings({ ...settings, browserNotifications: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-primary-600"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="card">
                        <h2 className="text-lg font-semibold mb-4">Alert Preferences</h2>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between">
                                <span>Price Drop Alerts</span>
                                <input
                                    type="checkbox"
                                    checked={settings.priceDropAlerts}
                                    onChange={(e) => setSettings({ ...settings, priceDropAlerts: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-primary-600"
                                />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Deal Alerts</span>
                                <input
                                    type="checkbox"
                                    checked={settings.dealAlerts}
                                    onChange={(e) => setSettings({ ...settings, dealAlerts: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-primary-600"
                                />
                            </label>
                            <label className="flex items-center justify-between">
                                <span>Order Updates</span>
                                <input
                                    type="checkbox"
                                    checked={settings.orderUpdates}
                                    onChange={(e) => setSettings({ ...settings, orderUpdates: e.target.checked })}
                                    className="form-checkbox h-5 w-5 text-primary-600"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;

