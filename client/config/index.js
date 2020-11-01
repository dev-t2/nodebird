export const backend =
  process.env.NODE_ENV === 'production' ? 'http://api.dev-t2.com' : 'http://localhost:3065';
export const frontend =
  process.env.NODE_ENV === 'production' ? 'http://dev-t2.com' : 'http://localhost:3060';
