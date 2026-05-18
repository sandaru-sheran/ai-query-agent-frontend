import React, { useState, useEffect } from 'react';
import './App.css';
import DatabaseViewer from './components/DatabaseViewer';
import ChatInterface from './components/ChatInterface';
import { fetchDatabase, fetchHistory, deleteHistory, sendQuery } from './api';

function App() {
  const [database, setDatabase] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [dbData, historyData] = await Promise.all([
        fetchDatabase(),
        fetchHistory()
      ]);
      setDatabase(dbData.database);
      setHistory(historyData);
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const handleSendMessage = async (query) => {
    // Optimistically update UI
    const humanMsg = { role: 'human', content: query };
    setHistory(prev => [...prev, humanMsg]);
    setIsLoading(true);

    try {
      const response = await sendQuery(query);
      setHistory(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending query:', error);
      setHistory(prev => [...prev, { role: 'ai', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    try {
      await deleteHistory();
      const freshHistory = await fetchHistory();
      setHistory(freshHistory);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return (
    <div className="app-container">
      <DatabaseViewer database={database} />
      <ChatInterface 
        history={history} 
        onSendMessage={handleSendMessage} 
        onClearHistory={handleClearHistory}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
