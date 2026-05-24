import React, { useRef } from 'react';

const DatabaseViewer = ({ database }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };


  if (!database || database.length === 0) {
    return (
      <div className="db-viewer">
        <p>No database schema found.</p>
      </div>
    );
  }

  return (
    <div className="db-viewer">
      <div className="carousel-container">
        <button className="nav-btn" onClick={() => scroll('left')}>&#10094;</button>
        <div className="carousel-track" ref={scrollRef}>
          {(database || []).map((table, idx) => (
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
                  {(table.columns || []).map((field, fIdx) => (
                    <tr key={fIdx}>
                      <td>{field.Field || field.field || field.name || 'N/A'}</td>
                      <td>{field.Type || field.type || field.data_type || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <button className="nav-btn" onClick={() => scroll('right')}>&#10095;</button>
      </div>
    </div>
  );
};

export default DatabaseViewer;
