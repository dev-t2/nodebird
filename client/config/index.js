export const backend =
  process.env.NODE_ENV === 'production' ? 'https://api.dev-t2.com' : 'http://localhost:3065';
export const frontend =
  process.env.NODE_ENV === 'production' ? 'https://dev-t2.com' : 'http://localhost:3060';
