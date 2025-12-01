import React from 'react';
import { AppTab } from '../types';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  onStartChat: () => void;
  onDownload: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartChat, onDownload }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-orange-200/40 via-red-100/40 to-yellow-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-32 md:pb-32 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-medium mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
          v1.0 Release • 1.2B Tokens
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Konkani AI</span> You've Been Waiting For.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Fluent in Devanagari and Roman scripts. Deeply knowledgeable about Goan culture. 
          Ready to run on your laptop or phone today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartChat}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-slate-200/50 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat Live Demo
          </button>
          <button
            onClick={onDownload}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-full font-semibold transition-all flex items-center justify-center gap-2 group"
          >
            Download Model
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Grid Mini */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20 text-left">
           <div className="p-6 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Dual-Script Mastery</h3>
              <p className="text-sm text-slate-500">Seamlessly switches between Devanagari (देवनागरी) and Roman (Romi) scripts based on your input.</p>
           </div>
           <div className="p-6 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Cultural IQ</h3>
              <p className="text-sm text-slate-500">Trained on local literature, tiatr scripts, and news to understand the nuances of Goa and Mangalore.</p>
           </div>
           <div className="p-6 bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm">
              <h3 className="font-bold text-slate-900 mb-2">Edge Ready</h3>
              <p className="text-sm text-slate-500">4 Billion parameters. Quantized to 4-bit (2.8GB). Runs incredibly fast on consumer hardware.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
