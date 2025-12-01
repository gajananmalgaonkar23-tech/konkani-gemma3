import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, Globe, Cpu, CheckCircle } from 'lucide-react';

const translationData = [
  { name: 'Navarasa 2.0', score: 22.4, fill: '#94a3b8' },
  { name: 'Gemma 2 Base', score: 18.1, fill: '#cbd5e1' },
  { name: 'Konkani-Gemma3', score: 28.4, fill: '#ea580c' }, // Orange for our model
];

const accuracyData = [
  { name: 'Llama 2 7B', score: 65, fill: '#94a3b8' },
  { name: 'RomanSetu', score: 82, fill: '#cbd5e1' },
  { name: 'Konkani-Gemma3', score: 94, fill: '#ea580c' },
];

const Benchmarks: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 animate-fade-in">
      
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">State-of-the-Art Performance</h2>
        <p className="text-lg text-slate-600">
          Evaluated on FLORES-200, Goan Cultural QA, and Roman-Devanagari Transliteration benchmarks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Translation Quality */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">English ↔ Konkani (BLEU)</h3>
            <Globe className="w-5 h-5 text-orange-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={translationData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 35]} />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {translationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            Higher is better. Tested on FLORES-200 test set.
          </p>
        </div>

        {/* Script Transliteration */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">Roman → Devanagari Accuracy</h3>
            <CheckCircle className="w-5 h-5 text-orange-500" />
          </div>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {accuracyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            Percentage accuracy on local Goan text corpus.
          </p>
        </div>
      </div>

      {/* Speed & Specs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Tokens/Sec (RTX 3060)', value: '82', icon: Zap },
          { label: 'Tokens/Sec (iPhone)', value: '~25', icon: Cpu },
          { label: 'Perplexity (Goan)', value: '9.8', icon: CheckCircle },
          { label: 'Training Tokens', value: '1.2B', icon: Globe },
        ].map((stat, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center hover:bg-orange-50 transition-colors cursor-default">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-orange-600">
              <stat.icon className="w-5 h-5" />
            </div>
            <span className="text-3xl font-bold text-slate-900 block">{stat.value}</span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Benchmarks;
