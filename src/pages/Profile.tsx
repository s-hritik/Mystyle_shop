import React, { useState} from 'react';
import { useUser } from '../context/UserContext';
import { products } from '../data/products';
import { User, ShoppingBag, Heart, Bell, Key, CreditCard, HelpCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockOrders = [
  { id: '#12345', date: '2025-08-15', status: 'Shipped', total: 299.99 },
  { id: '#12344', date: '2025-08-12', status: 'Delivered', total: 89.99 },
];

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Key },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'help', label: 'Help', icon: HelpCircle },
];

export const Profile: React.FC = () => {
  const { user, updateUser, wishlist } = useUser();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    promotions: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activityStatus: true,
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: profileName, email: profileEmail });
    alert('Profile updated successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700">
                Save Changes
              </button>
            </div>
          </form>
        );
      case 'orders':
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Orders</h3>
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div key={order.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold">{order.id}</p>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total}</p>
                    <span className={`text-sm px-2 py-1 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'wishlist':
        const wishlistProducts = products.filter(p => wishlist.includes(p.id));
        return (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Wishlist</h3>
            {wishlistProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4 text-center">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-emerald-600">${product.price}</p>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500">You have no items in your wishlist.</p>}
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notifications.email} onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Receive updates via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={notifications.sms} onChange={(e) => setNotifications(prev => ({ ...prev, sms: e.target.checked }))} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Privacy Settings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Profile Visibility</h4>
                <select value={privacy.profileVisibility} onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">Activity Status</h4>
                  <p className="text-sm text-gray-500">Show when you're active</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={privacy.activityStatus} onChange={(e) => setPrivacy(prev => ({ ...prev, activityStatus: e.target.checked }))} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
   
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={security.twoFactor} onChange={(e) => setSecurity(prev => ({ ...prev, twoFactor: e.target.checked }))} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div>
                  <h4 className="font-medium">Login Alerts</h4>
                  <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={security.loginAlerts} onChange={(e) => setSecurity(prev => ({ ...prev, loginAlerts: e.target.checked }))} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                Change Password
              </button>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
              <button className="text-emerald-600 hover:text-emerald-700 font-medium">Add New Card</button>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CreditCard size={24} className="text-gray-400" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/26</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings size={20} />
              </button>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Help Center</h3>
            <div className="space-y-4">
              <Link to="/faq" className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 block">
                <h4 className="font-medium">Frequently Asked Questions</h4>
                <p className="text-sm text-gray-500">Find answers to common questions</p>
              </Link>
              <Link to="/contact" className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 block">
                <h4 className="font-medium">Contact Support</h4>
                <p className="text-sm text-gray-500">Get help from our support team</p>
              </Link>
            </div>
          </div>
        );

      default:
        return <p>Content for {activeTab} is coming soon.</p>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-emerald-600 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User size={40} className="text-emerald-600" />
            </div>
            <div>
              {/* Correctly display dynamic user info */}
              <h1 className="text-2xl font-bold">Hritik Singh </h1>
              <p className="text-emerald-100">hritik@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <nav className="flex flex-wrap overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium flex items-center gap-2 flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-emerald-600 text-emerald-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};