import React, { useState, useEffect } from 'react';
import './App.css';
import DatabaseViewer from './components/DatabaseViewer';
import ChatInterface from './components/ChatInterface';
import DatabaseConfigForm from './components/DatabaseConfigForm';
import { fetchDatabase, fetchHistory, deleteHistory, sendQuery } from './api';

function App() {
  const [database, setDatabase] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSchemaVisible, setIsSchemaVisible] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async (shouldClearHistory = false) => {
    try {
      const dbData = await fetchDatabase();

      const dbArray = dbData.database || dbData;
      setDatabase(Array.isArray(dbArray) ? dbArray : []);

      if (shouldClearHistory) {
        await handleClearHistory();
      } else {
        const historyData = await fetchHistory();
        setHistory(historyData);
      }
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSchema = () => {
    setIsSchemaVisible(!isSchemaVisible);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="menu-toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className="sidebar-content">
          <DatabaseConfigForm onDatabaseChanged={() => loadInitialData(true)} />

          <div className="sidebar-footer">
            <div className="warning-banner">This is only for development purposes only</div>
            <button className="toggle-schema-btn" onClick={toggleSchema}>
              {isSchemaVisible ? 'Hide Schema' : 'Show Schema'}
            </button>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {!isSidebarOpen && (
          <button className="menu-toggle-btn floating" onClick={toggleSidebar}>
            ☰
          </button>
        )}

        <ChatInterface
          history={history}
          onSendMessage={handleSendMessage}
          onClearHistory={handleClearHistory}
          isLoading={isLoading}
        />

        {isSchemaVisible && (
          <div className="schema-overlay">
            <div className="schema-overlay-content">
              <button className="close-overlay" onClick={toggleSchema}>✕</button>
              <DatabaseViewer database={database} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
