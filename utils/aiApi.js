const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const aiAPI = {
  transcribeVoice: async (audioBase64, mimeType = 'audio/webm') => {
    const response = await fetch(`${API_URL}/ai/transcribe-voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioBase64, mimeType }),
    });
    if (!response.ok) return { success: false };
    return response.json();
  },
};
