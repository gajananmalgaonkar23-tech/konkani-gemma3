import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="font-bold text-slate-900">Konkani-Gemma3-4B-v1</p>
          <p className="text-sm text-slate-500">Open source AI for the Konkan coast.</p>
        </div>
        <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors">HuggingFace</a>
            <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors">Github</a>
            <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors">Discord</a>
        </div>
        <div className="text-sm text-slate-400">
          Built with ❤️ in Goa.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
