import React, { useState } from 'react';
import { Plus, Calculator, FileText, Search, X } from 'lucide-react';

interface HeaderButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'floating';
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ icon, label, onClick, variant = 'outline' }) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white border border-blue-200 text-blue-600 hover:bg-blue-50',
    outline: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    floating: 'fixed right-6 bottom-6 bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl md:relative md:right-0 md:bottom-0 z-50'
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg flex items-center transition-all duration-200 ${variants[variant]} ${
        variant === 'floating' ? 'md:px-4 md:py-2' : ''
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        className: `w-4 h-4 ${variant === 'floating' ? 'md:mr-2' : 'mr-2'}`
      })}
      <span className={`${variant === 'floating' ? 'hidden md:inline' : ''}`}>{label}</span>
    </button>
  );
};

interface DashboardHeaderProps {
  onCostEstimatorClick: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCostEstimatorClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    }
  };

  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Admin</p>
      </div>

      <div className={`flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-3 ${
        isSearchVisible ? 'w-full md:w-auto' : ''
      }`}>
        {isSearchVisible ? (
          <div className="relative flex items-center">
            <input
              id="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dashboard..."
              className="w-full md:w-64 pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3" />
            <button
              onClick={toggleSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={toggleSearch}
            className="md:hidden flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
        )}

        <div className="hidden md:flex md:space-x-3">
          <HeaderButton
            icon={<Search />}
            label="Search"
            onClick={toggleSearch}
            variant="outline"
          />
          <HeaderButton
            icon={<Calculator />}
            label="Cost Estimate"
            onClick={onCostEstimatorClick}
            variant="outline"
          />
          <HeaderButton
            icon={<FileText />}
            label="Generate Report"
            variant="secondary"
          />
        </div>

        <HeaderButton
          icon={<Plus />}
          label="New Invoice"
          onClick={() => window.location.href = '/billing'}
          variant="floating"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;