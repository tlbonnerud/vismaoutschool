'use client';

import { useState, useRef, useEffect } from 'react';
import DarkVeil from "@/components/DarkVeil";
import { queryAgent } from '@/lib/ai/HandleAI';

interface Message {
   role: 'user' | 'assistant';
   content: string;
}

export default function AIChat() {
   const [messages, setMessages] = useState<Message[]>([]);
   const [input, setInput] = useState('');
   const [loading, setLoading] = useState(false);
   const messagesEndRef = useRef<HTMLDivElement>(null);

   // Auto-scroll to bottom when new messages arrive
   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!input.trim() || loading) return;

      const userMessage: Message = {
         role: 'user',
         content: input.trim()
      };

      // Add user message to chat
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setLoading(true);

      try {
         // Query the agent
         const response = await queryAgent(userMessage.content);

         // Add assistant response to chat
         const assistantMessage: Message = {
            role: 'assistant',
            content: response
         };

         setMessages(prev => [...prev, assistantMessage]);
      } catch (error) {
         console.error('Error:', error);

         // Add error message
         const errorMessage: Message = {
            role: 'assistant',
            content: 'Sorry, there was an error processing your request. Please try again.'
         };

         setMessages(prev => [...prev, errorMessage]);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center text-white overflow-hidden relative z-0">
         <DarkVeil />

         <div className="fixed w-full max-w-2xl h-[70vh] bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg flex flex-col overflow-hidden z-10">
            <div className="flex-1 p-4 overflow-y-auto">
               {/* Chat history area */}
               <div className="space-y-4">
                  {messages.length === 0 ? (
                     <div className="text-center text-gray-400 mt-8">
                        <p>Start a conversation with the AI assistant</p>
                     </div>
                  ) : (
                     messages.map((message, index) => (
                        <div
                           key={index}
                           className={`p-3 rounded-lg max-w-[80%] ${message.role === 'user'
                              ? 'bg-blue-600 bg-opacity-50 ml-auto'
                              : 'bg-gray-700 bg-opacity-50'
                              }`}
                        >
                           <p className="font-semibold text-sm mb-1">
                              {message.role === 'user' ? 'You' : 'AI Assistant'}
                           </p>
                           <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                     ))
                  )}

                  {/* Loading indicator */}
                  {loading && (
                     <div className="bg-gray-700 bg-opacity-50 p-3 rounded-lg max-w-[80%]">
                        <p className="font-semibold text-sm mb-1">AI Assistant</p>
                        <div className="flex space-x-2">
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                     </div>
                  )}

                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
               </div>
            </div>

            <div className="p-4 border-t border-gray-600 bg-gray-800 bg-opacity-50">
               {/* Message input area */}
               <form onSubmit={handleSubmit} className="flex">
                  <input
                     type="text"
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Type your message..."
                     className="flex-1 p-2 rounded-l-lg bg-gray-700 bg-opacity-50 text-white focus:outline-none placeholder-gray-400"
                     disabled={loading}
                  />
                  <button
                     type="submit"
                     disabled={loading || !input.trim()}
                     className="bg-blue-600 hover:bg-blue-700 text-white p-2 px-6 rounded-r-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition"
                  >
                     {loading ? 'Sending...' : 'Send'}
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
}
