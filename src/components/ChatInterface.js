import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Sparkles } from 'lucide-react';

const ChatInterface = ({ history, onSendMessage, onClearHistory, isLoading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header h-[80px] border-b border-gray-800 relative">
        <div className="max-w-[800px] w-full mx-auto h-full flex justify-between items-center px-[25px]">
          <div className="header-left flex items-center gap-4">
            <div className="bg-purple-500/10 p-2.5 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SQL AI Agent
            </h1>
          </div>
          <div className="header-right">
            <button 
              className="text-sm text-gray-400 bg-transparent border border-gray-700 px-4 py-2 rounded-md hover:text-white hover:border-gray-500 transition-colors" 
              onClick={onClearHistory}
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
      
      <div className="chat-history flex-1 overflow-y-auto pt-6">
        <div className="max-w-3xl w-full mx-auto flex flex-col gap-8 px-4 pb-20">
          {history.length === 0 && !isLoading && (
            <div className="empty-state py-20 text-center">
              <div className="empty-state-icon text-6xl mb-6 opacity-30">🤖</div>
              <h3 className="text-xl font-semibold text-gray-200">How can I help you today?</h3>
              <p className="text-gray-400">Ask me anything about your database.</p>
            </div>
          )}
          {history.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.role === 'human' ? 'items-end' : 'items-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <div className="bg-purple-500/10 p-1.5 rounded-md">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">AI Assistant</span>
                </div>
              )}
              
            <div className={`
                message-bubble max-w-[85%] text-[15px] leading-7
                ${msg.role === 'human' 
                  ? 'bg-gray-800 text-white px-5 py-3 rounded-2xl rounded-br-sm' 
                  : 'bg-gray-900/40 border border-gray-800/50 p-4 rounded-2xl w-full text-gray-200'}
              `}>
                {msg.role === 'ai' ? (
                  <div className="prose prose-invert prose-p:leading-7 prose-pre:bg-black/50 prose-pre:border prose-pre:border-gray-800">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({node, inline, className, children, ...props}) {
                          if (inline) {
                            return (
                              <code className="font-mono text-sm bg-black/40 rounded-md px-1.5 py-0.5 text-purple-300 border border-gray-800/30" {...props}>
                                {children}
                              </code>
                            );
                          }
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                        strong({node, children, ...props}) {
                          return (
                            <strong className="font-mono text-sm bg-black/40 rounded-md px-1.5 py-0.5 text-purple-300 border border-gray-800/30" {...props}>
                              {children}
                            </strong>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-2 ml-1">
                <div className="bg-purple-500/10 p-1.5 rounded-md animate-pulse">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">AI is thinking...</span>
              </div>
              <div className="bg-gray-900/40 border border-gray-800/50 p-4 rounded-2xl w-full animate-pulse">
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-container">
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
