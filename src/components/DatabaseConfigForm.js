import React, { useState } from 'react';
import { changeDatabase } from '../api';

const DatabaseConfigForm = ({ onDatabaseChanged }) => {
  const [dbType, setDbType] = useState('mysql');
  const [dbName, setDbName] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setIsError(false);

    const config = {
      db_type: dbType,
      db_name: dbName,
      host: dbType === 'sqlite' ? '' : host,
      port: dbType === 'sqlite' ? '' : port,
      username: dbType === 'sqlite' ? '' : username,
      password: dbType === 'sqlite' ? '' : password,
    };

    try {
      const response = await changeDatabase(config);
      setMessage(response.message || 'Database changed successfully');
      setIsError(false);
      if (onDatabaseChanged) {
        onDatabaseChanged();
      }
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSqlite = dbType === 'sqlite';

  return (
    <div className="db-config-container">
      <h3>Change Database Connection</h3>
      <form onSubmit={handleSubmit} className="db-config-form">
        <div className="form-group">
          <label>Database Type:</label>
          <select 
            value={dbType} 
            onChange={(e) => setDbType(e.target.value)}
            required
          >
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
            <option value="oracle">Oracle</option>
          </select>
        </div>

        <div className="form-group">
          <label>{isSqlite ? 'Database Path:' : 'Database Name:'}</label>
          <input
            type="text"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
            required
            placeholder={isSqlite ? '/path/to/database.db' : 'my_database'}
          />
        </div>

        {!isSqlite && (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Host:</label>
                <input
                  type="text"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                  required={!isSqlite}
                  placeholder="localhost"
                />
              </div>
              <div className="form-group">
                <label>Port:</label>
                <input
                  type="text"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  required={!isSqlite}
                  placeholder="3306"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isSqlite}
                  placeholder="user"
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!isSqlite}
                  placeholder="password"
                />
              </div>
            </div>
          </>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Connecting...' : 'Connect'}
        </button>

        {message && (
          <div className={`form-message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default DatabaseConfigForm;
