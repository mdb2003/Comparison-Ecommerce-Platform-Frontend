import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheck, FiClock } from 'react-icons/fi';

function OrderTracking() {
    const [orders] = useState([
        {
            id: '1234',
            platform: 'Amazon',
            date: '2024-03-15',
            status: 'delivered',
            trackingNumber: 'AMZ123456789',
            items: [
                { name: 'Product 1', price: 99.99, quantity: 1 }
            ]
        },
        {
            id: '1235',
            platform: 'eBay',
            date: '2024-03-14',
            status: 'in_transit',
            trackingNumber: 'EBY987654321',
            items: [
                { name: 'Product 2', price: 149.99, quantity: 2 }
            ]
        },
        {
            id: '1236',
            platform: 'Walmart',
            date: '2024-03-13',
            status: 'processing',
            trackingNumber: 'WMT456789123',
            items: [
                { name: 'Product 3', price: 79.99, quantity: 1 }
            ]
        }
    ]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <FiCheck className="w-6 h-6 text-green-500" />;
            case 'in_transit':
                return <FiTruck className="w-6 h-6 text-blue-500" />;
            case 'processing':
                return <FiClock className="w-6 h-6 text-yellow-500" />;
            default:
                return <FiPackage className="w-6 h-6 text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'delivered':
                return 'Delivered';
            case 'in_transit':
                return 'In Transit';
            case 'processing':
                return 'Processing';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold mb-4">Order Tracking</h1>
                <p className="text-gray-600">Track your orders across multiple platforms</p>
            </motion.div>

            <div className="space-y-6">
                {orders.map((order) => (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="card"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                {getStatusIcon(order.status)}
                                <div>
                                    <h3 className="font-medium">Order #{order.id}</h3>
                                    <p className="text-sm text-gray-500">
                                        {order.platform} • {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                    order.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                                        'bg-yellow-100 text-yellow-800'
                                }`}>
                                {getStatusText(order.status)}
                            </span>
                        </div>

                        <div className="border-t border-b py-4 mb-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Tracking Number</p>
                                <p className="font-medium">{order.trackingNumber}</p>
                            </div>
                            <button
                                onClick={() => window.open(`https://${order.platform.toLowerCase()}.com/track/${order.trackingNumber}`)}
                                className="btn-primary"
                            >
                                Track Order
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default OrderTracking;

