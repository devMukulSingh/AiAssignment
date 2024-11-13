export const base_url_client =
  process.env.NODE_ENV === 'production'
    ? 'https://ai-assignment-client.vercel.app'
    : 'http://localhost:3000';
