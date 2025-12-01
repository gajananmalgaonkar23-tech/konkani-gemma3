import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { SAMPLE_PROMPTS, MODEL_NAME } from '../constants';
import { GoogleGenAI } from "@google/genai";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Dev Borem Korum! I am ${MODEL_NAME}. I can speak fluent Konkani (Devanagari & Roman) and English. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are Konkani-Gemma3-4B-v1, a specialized Small Language Model (SLM) trained on 1.2 billion Konkani tokens.
        
        Personality:
        - You are helpful, polite, and culturally aware of Goa, Mangalore, and the Konkan coast.
        - You speak fluent Konkani (both Devanagari and Roman scripts) and English.
        - You understand and use code-switching (mixing Konkani and English) naturally, as locals do.
        - You are technically proficient but also artistic (poems, stories).
        
        Constraints:
        - If asked about your architecture, you are a 4 billion parameter model based on Gemma 3, fine-tuned by the "Konkani AI" team.
        - Always reply in the language the user initiates, or mix if they mix.
        - If the user asks for translations, provide them accurately in the requested script.
        - Keep responses concise (SLM style) unless asked for long form.
      `;

      // Construct chat history for context
      const history = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));

      // Add current user message
      history.push({ role: 'user', parts: [{ text }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: systemInstruction }] }, // Prepend system instruction as a user prompt for better adherence in stateless calls or use systemInstruction in config if strictly following new API
            ...history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: h.parts
            }))
        ],
        config: {
            temperature: 0.7,
            maxOutputTokens: 500,
        }
      });

      const replyText = response.text || "Sorgar... I'm having trouble thinking right now. Please try again.";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: replyText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Maka maaf kor. I encountered a network error. Please check your connection.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto bg-white shadow-xl md:my-6 md:rounded-2xl overflow-hidden border border-slate-200">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-slate-200' : 'bg-gradient-to-br from-orange-500 to-red-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-slate-600" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              
              <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-white text-slate-800 rounded-tr-none border border-slate-100' 
                  : 'bg-white text-slate-800 rounded-tl-none border border-orange-100'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                 <div className="flex flex-row items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-orange-100 shadow-sm flex items-center gap-2">
                         <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                         <span className="text-sm text-slate-500">Thinking (Konkani-Gemma3)...</span>
                    </div>
                 </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        {messages.length < 2 && (
            <div className="mb-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {SAMPLE_PROMPTS.map((prompt, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleSend(prompt)}
                        className="flex-shrink-0 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs md:text-sm rounded-full border border-orange-100 transition-colors whitespace-nowrap"
                    >
                        {prompt}
                    </button>
                ))}
            </div>
        )}
        <div className="relative flex items-center gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message in English or Konkani..."
            className="flex-1 p-3 md:p-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-slate-800 placeholder-slate-400 max-h-32"
            rows={1}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2 bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white rounded-lg transition-colors shadow-sm"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="mt-2 text-center">
            <p className="text-[10px] text-slate-400">Konkani-Gemma3 can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
