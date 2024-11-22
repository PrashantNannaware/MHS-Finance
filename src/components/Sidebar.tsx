import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Shield, 
  BarChart3,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const navItems = [
    { path: '/', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { path: '/billing', icon: <Receipt className="w-5 h-5" />, label: 'Billing' },
    { path: '/insurance', icon: <Shield className="w-5 h-5" />, label: 'Insurance' },
    { path: '/reports', icon: <BarChart3 className="w-5 h-5" />, label: 'Reports' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-blue-50 border-r border-blue-100 px-4 py-6 relative transition-all duration-300 ease-in-out`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border border-blue-100 rounded-full p-1 hover:bg-blue-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-blue-600" /> : <ChevronLeft className="w-4 h-4 text-blue-600" />}
      </button>

      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-2'} mb-8`}>
        <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
        {!isCollapsed && <span className="ml-2 text-xl font-bold text-gray-800">MedFinance</span>}
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 text-sm rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-blue-100/50 hover:text-blue-600'
              }`
            }
          >
            <div className={`${isCollapsed ? 'w-10 h-10 flex items-center justify-center' : 'mr-3'}`}>
              {item.icon}
            </div>
            {!isCollapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={`absolute bottom-0 left-0 right-0 p-4 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <div className="border-t border-blue-100 pt-4 space-y-2 w-full">
          <button 
            onClick={() => setShowSettings(true)}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 text-sm text-gray-600 hover:bg-blue-100/50 hover:text-blue-600 rounded-lg w-full transition-colors`}
          >
            <Settings className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && 'Settings'}
          </button>
          <button 
            onClick={handleLogout}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors`}
          >
            <LogOut className={`w-5 h-5 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && 'Logout'}
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full p-2 border rounded-lg">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notifications
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="ml-2 text-sm">Email Notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="ml-2 text-sm">SMS Notifications</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;