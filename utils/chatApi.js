const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const chatAPI = {
  sendMessage: async (message, sessionId, conversationHistory = []) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/chat/query`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, sessionId, conversationHistory }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      const msg = error.message || '';
      if (response.status === 429 || msg.includes('quota')) {
        throw new Error('AI is temporarily busy. Please wait a moment and try again.');
      }
      throw new Error(msg || 'Failed to send message');
    }
    return response.json();
  },

  compareProperties: async (propertyIds) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}/chat/compare`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ propertyIds }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Failed to compare properties');
    }
    return response.json();
  },
};
