import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChatInterface from './components/ChatInterface';
import Benchmarks from './components/Benchmarks';
import Downloads from './components/Downloads';
import Footer from './components/Footer';
import { AppTab } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.HOME);

  const renderContent = () => {
    switch (currentTab) {
      case AppTab.HOME:
        return (
          <Hero 
            onStartChat={() => setCurrentTab(AppTab.CHAT)} 
            onDownload={() => setCurrentTab(AppTab.DOWNLOADS)} 
          />
        );
      case AppTab.CHAT:
        return <ChatInterface />;
      case AppTab.BENCHMARKS:
        return <Benchmarks />;
      case AppTab.DOWNLOADS:
        return <Downloads />;
      default:
        return <Hero 
            onStartChat={() => setCurrentTab(AppTab.CHAT)} 
            onDownload={() => setCurrentTab(AppTab.DOWNLOADS)} 
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {currentTab !== AppTab.CHAT && <Footer />}
    </div>
  );
};

export default App;
