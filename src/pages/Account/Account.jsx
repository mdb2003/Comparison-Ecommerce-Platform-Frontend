import { useState } from 'react';
import { FiUser, FiHeart, FiClock, FiSettings } from 'react-icons/fi';

function Account() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'favorites', name: 'Favorites', icon: FiHeart },
    { id: 'history', name: 'History', icon: FiClock },
    { id: 'settings', name: 'Settings', icon: FiSettings },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="space-y-1">
              {tabs.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center px-4 py-2 rounded-lg ${
                    activeTab === id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          <div className="card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input type="text" id="name" className="input mt-1" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input type="email" id="email" className="input mt-1" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input type="tel" id="phone" className="input mt-1" />
                  </div>
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Favorite Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                      <div>
                        <h3 className="font-medium">Product Name</h3>
                        <p className="text-gray-600">$299.99</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Browsing History</h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                      <div>
                        <h3 className="font-medium">Product Name</h3>
                        <p className="text-gray-600">Viewed on {new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Email notifications for price drops
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Deal alerts for saved products
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Password</h3>
                    <button className="btn-secondary">Change Password</button>
                  </div>
                  <div>
                    <h3 className="font-medium mb-4">Delete Account</h3>
                    <button className="text-red-600 hover:text-red-700">
                      Delete my account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
