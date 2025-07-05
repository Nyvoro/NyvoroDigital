export const getBaseUrl = () =>
  typeof window === 'undefined'
    ? 'http://127.0.0.1:5001' // ← NICHT "localhost"
    : '';
