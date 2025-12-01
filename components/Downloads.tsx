import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, Smartphone, HardDrive } from 'lucide-react';
import { LINKS } from '../constants';

const Downloads: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const CodeBlock = ({ code, id, label }: { code: string, id: string, label: string }) => (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 border-b border-slate-700">
        <span className="text-xs text-slate-400 font-mono">{label}</span>
        <button 
          onClick={() => handleCopy(code, id)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {copied === id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 font-mono text-sm text-green-400 overflow-x-auto">
        <pre>{code}</pre>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">Run Locally in Seconds</h2>
        <p className="text-slate-600 mt-2">Privacy-first. No internet required after download.</p>
      </div>

      {/* Quick Start: Ollama */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
            <Terminal className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Option 1: Ollama (Recommended)</h3>
        </div>
        <p className="text-slate-600 mb-4">
            Works on Mac, Windows, Linux. Ensure you have <a href="https://ollama.com" target="_blank" className="text-orange-600 hover:underline">Ollama installed</a>.
        </p>
        
        <CodeBlock 
          id="ollama-cmd" 
          label="Terminal / PowerShell" 
          code={`ollama create konkani-gemma3 -f https://huggingface.co/konkani/Konkani-Gemma3-4B-v1/raw/main/Modelfile\nollama run konkani-gemma3`} 
        />
      </section>

      {/* Mobile */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Option 2: Android / iOS</h3>
        </div>
        <ol className="list-decimal list-inside space-y-3 text-slate-600 ml-1">
            <li>Download <strong>MLC Chat</strong> or <strong>Layla</strong> from your App Store.</li>
            <li>Select "Add Model via URL".</li>
            <li>Paste this GGUF link:</li>
        </ol>
        <div className="mt-4 flex gap-2">
            <input 
                readOnly 
                value={LINKS.gguf} 
                className="flex-1 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 truncate"
            />
            <button 
                onClick={() => handleCopy(LINKS.gguf, 'gguf-url')}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
            >
                {copied === 'gguf-url' ? 'Copied' : 'Copy'}
            </button>
        </div>
      </section>

      {/* Manual Download */}
      <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <HardDrive className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Raw Files & Training Data</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
            <a href={LINKS.huggingFace} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all group">
                <div>
                    <span className="font-semibold text-slate-900 block">HuggingFace Model</span>
                    <span className="text-xs text-slate-500">Safetensors & GGUF</span>
                </div>
                <Download className="w-5 h-5 text-slate-400 group-hover:text-orange-500" />
            </a>
            <a href={LINKS.dataset} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all group">
                <div>
                    <span className="font-semibold text-slate-900 block">Training Dataset</span>
                    <span className="text-xs text-slate-500">1.2B Tokens + Instructions</span>
                </div>
                <Download className="w-5 h-5 text-slate-400 group-hover:text-orange-500" />
            </a>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
