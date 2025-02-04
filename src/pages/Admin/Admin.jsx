import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiDollarSign, FiActivity, FiSettings, FiUserX, FiRefreshCw, FiEye } from 'react-icons/fi';

function Admin() {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { icon: FiUsers, label: 'Total Users', value: '15,234' },
        { icon: FiSearch, label: 'Active Searches', value: '2,845' },
        { icon: FiDollarSign, label: 'Revenue', value: '$12,456' },
        { icon: FiActivity, label: 'API Calls', value: '45,678' },
    ];

    const users = Array(5).fill(null).map((_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        status: ['active', 'inactive'][Math.floor(Math.random() * 2)],
        lastLogin: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    }));

    const apiStats = [
        { platform: 'Amazon', calls: '15,234', errors: '123', usage: '78%' },
        { platform: 'eBay', calls: '12,456', errors: '89', usage: '65%' },
        { platform: 'Walmart', calls: '8,901', errors: '45', usage: '42%' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button className="btn-primary">
                    <FiSettings className="mr-2" /> Settings
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card"
                    >
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                                <p className="text-xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Management */}
                <div className="lg:col-span-2">
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold">User Management</h2>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b">
                                        <th className="pb-3">Name</th>
                                        <th className="pb-3">Email</th>
                                        <th className="pb-3">Status</th>
                                        <th className="pb-3">Last Login</th>
                                        <th className="pb-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="py-3">{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${user.status === 'active'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>{user.lastLogin}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button className="p-1 text-gray-600 hover:text-primary-600">
                                                        <FiEye />
                                                    </button>
                                                    <button className="p-1 text-gray-600 hover:text-red-600">
                                                        <FiUserX />
                                                    </button>
                                                    <button className="p-1 text-gray-600 hover:text-primary-600">
                                                        <FiRefreshCw />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* API Monitoring */}
                <div>
                    <div className="card">
                        <h2 className="text-lg font-semibold mb-6">API Monitoring</h2>
                        <div className="space-y-6">
                            {apiStats.map((api) => (
                                <div key={api.platform} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{api.platform}</span>
                                        <span className="text-sm text-gray-500">{api.usage} used</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-600 rounded-full"
                                            style={{ width: api.usage }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Calls: {api.calls}</span>
                                        <span>Errors: {api.errors}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;

