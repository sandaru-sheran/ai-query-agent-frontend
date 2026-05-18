const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export const fetchDatabase = async () => {
  const response = await fetch(`${BASE_URL}/api/database`);
  if (!response.ok) throw new Error('Failed to fetch database schema');
  return response.json();
};

export const fetchHistory = async () => {
  const response = await fetch(`${BASE_URL}/api/history`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
};

export const deleteHistory = async () => {
  const response = await fetch(`${BASE_URL}/api/history`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to clear history');
  return response.json();
};

export const sendQuery = async (query) => {
  const response = await fetch(`${BASE_URL}/api/query?query=${encodeURIComponent(query)}`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to send query');
  return response.json();
};
