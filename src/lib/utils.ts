export const base_url_client =
  process.env.NODE_ENV === 'production'
    ? 'https://ai-assignment-client.vercel.app'
    : 'http://localhost:3000';

export const base_url_server = `https://aiassignment.onrender.com`;
