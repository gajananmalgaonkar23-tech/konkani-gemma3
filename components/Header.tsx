import React from 'react';
import { AppTab } from '../types';
import { Sparkles, Download, BarChart2, MessageCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { tab: AppTab.HOME, label: 'Overview', icon: Sparkles },
    { tab: AppTab.CHAT, label: 'Try Chat', icon: MessageCircle },
    { tab: AppTab.BENCHMARKS, label: 'Benchmarks', icon: BarChart2 },
    { tab: AppTab.DOWNLOADS, label: 'Download', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onTabChange(AppTab.HOME)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Konkani-Gemma3</h1>
              <p className="text-xs text-slate-500 font-medium">4B Parameter SLM</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentTab === item.tab
                    ? 'bg-orange-100 text-orange-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-2 shadow-lg absolute w-full">
           {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  onTabChange(item.tab);
                  setIsMenuOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 rounded-lg text-sm font-medium ${
                  currentTab === item.tab
                    ? 'bg-orange-50 text-orange-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
        </div>
      )}
    </header>
  );
};

export default Header;
