// src/lib/rateLimiter.ts

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

export const rateLimit = (
  identifier: string,
  limit: number = 10,
  windowMs: number = 60 * 1000 // 1 minute
): boolean => {
  const now = Date.now();
  const key = `${identifier}`;

  if (!store[key]) {
    store[key] = { count: 1, resetTime: now + windowMs };
    return true;
  }

  if (now > store[key].resetTime) {
    store[key] = { count: 1, resetTime: now + windowMs };
    return true;
  }

  if (store[key].count < limit) {
    store[key].count++;
    return true;
  }

  return false;
};

export const getRateLimitInfo = (identifier: string) => {
  const key = `${identifier}`;
  return store[key] || null;
};