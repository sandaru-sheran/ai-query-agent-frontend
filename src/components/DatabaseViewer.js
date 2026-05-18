import React, { useState, useRef } from 'react';

const DatabaseViewer = ({ database }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!database || database.length === 0) {
    return (
      <div className={`db-viewer ${isMinimized ? 'minimized' : ''}`}>
        <div className="db-viewer-header">
          <div className="warning-banner">This is only for development purposes only</div>
          <button className="toggle-btn" onClick={toggleMinimize}>
            {isMinimized ? 'Show Schema' : 'Hide'}
          </button>
        </div>
        {!isMinimized && <p>No database schema found.</p>}
      </div>
    );
  }

  return (
    <div className={`db-viewer ${isMinimized ? 'minimized' : ''}`}>
      <div className="db-viewer-header">
        <div className="warning-banner">This is only for development purposes only</div>
        <button className="toggle-btn" onClick={toggleMinimize}>
          {isMinimized ? 'Show Schema' : 'Hide'}
        </button>
      </div>
      {!isMinimized && (
        <div className="carousel-container">
          <button className="nav-btn" onClick={() => scroll('left')}>&#10094;</button>
          <div className="carousel-track" ref={scrollRef}>
            {database.map((table, idx) => (
              <div key={idx} className="table-card">
                <h3 className="table-name">{table.table_name}</h3>
                <table className="schema-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.schema.map((field, fIdx) => (
                      <tr key={fIdx}>
                        <td>{field.Field}</td>
                        <td>{field.Type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <button className="nav-btn" onClick={() => scroll('right')}>&#10095;</button>
        </div>
      )}
    </div>
  );
};

export default DatabaseViewer;
