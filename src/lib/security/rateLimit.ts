/**
 * Anti-Brute Force and Rate Limiting Protection System
 * Supports sliding window rate limiting with progressive backoff.
 */

interface RateLimitConfig {
  maxRequests: number;     // Maximum allowed requests within window
  windowMs: number;        // Time window in milliseconds
  blockDurationMs?: number;// Duration to lock out after exceeding limit
}

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
}

// In-memory rate limit store
const memoryStore = new Map<string, RateLimitRecord>();

// Predefined rate limiting configurations
export const RATE_LIMIT_CONFIGS = {
  // Login: 5 attempts per 15 minutes, block for 15 mins on breach
  LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000,
    blockDurationMs: 15 * 60 * 1000,
  },
  // Password Reset: 3 attempts per 30 minutes
  PASSWORD_RESET: {
    maxRequests: 3,
    windowMs: 30 * 60 * 1000,
    blockDurationMs: 30 * 60 * 1000,
  },
  // User Registration: 3 accounts per hour per IP/identifier
  REGISTRATION: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000,
    blockDurationMs: 60 * 60 * 1000,
  },
  // Result Search: 20 searches per minute
  RESULT_SEARCH: {
    maxRequests: 20,
    windowMs: 60 * 1000,
    blockDurationMs: 60 * 1000,
  },
  // Contact Form: 5 messages per 10 minutes
  CONTACT_FORM: {
    maxRequests: 5,
    windowMs: 10 * 60 * 1000,
    blockDurationMs: 15 * 60 * 1000,
  },
  // General API / action rate: 60 requests per minute
  DEFAULT: {
    maxRequests: 60,
    windowMs: 60 * 1000,
  },
} as const;

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  resetTimeMs: number;
  retryAfterSeconds: number;
}

/**
 * Check and increment rate limit for a specific action and identifier (IP, email, or session)
 */
export function checkRateLimit(
  identifier: string,
  actionKey: keyof typeof RATE_LIMIT_CONFIGS = "DEFAULT",
  customConfig?: Partial<RateLimitConfig>
): RateLimitResult {
  const config = {
    ...RATE_LIMIT_CONFIGS[actionKey],
    ...customConfig,
  };

  const key = `${actionKey}:${identifier.toLowerCase().trim()}`;
  const now = Date.now();

  let record = memoryStore.get(key);

  if (!record) {
    record = { timestamps: [] };
    memoryStore.set(key, record);
  }

  // 1. Check if currently blocked
  if (record.blockedUntil && record.blockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      resetTimeMs: record.blockedUntil,
      retryAfterSeconds,
    };
  }

  // 2. Filter out timestamps outside the sliding window
  const windowStart = now - config.windowMs;
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  // 3. Check if exceeded
  if (record.timestamps.length >= config.maxRequests) {
    const blockDuration = config.blockDurationMs || config.windowMs;
    record.blockedUntil = now + blockDuration;
    const retryAfterSeconds = Math.ceil(blockDuration / 1000);

    return {
      allowed: false,
      remainingAttempts: 0,
      resetTimeMs: record.blockedUntil,
      retryAfterSeconds,
    };
  }

  // 4. Record new attempt
  record.timestamps.push(now);
  const remainingAttempts = Math.max(0, config.maxRequests - record.timestamps.length);
  const oldestTimestamp = record.timestamps[0] || now;
  const resetTimeMs = oldestTimestamp + config.windowMs;

  return {
    allowed: true,
    remainingAttempts,
    resetTimeMs,
    retryAfterSeconds: 0,
  };
}

/**
 * Reset rate limit tracking for a specific identifier upon successful authentication
 */
export function resetRateLimit(identifier: string, actionKey: keyof typeof RATE_LIMIT_CONFIGS): void {
  const key = `${actionKey}:${identifier.toLowerCase().trim()}`;
  memoryStore.delete(key);
}

/**
 * Clean up stale keys periodically to avoid memory leaks
 */
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of memoryStore.entries()) {
      const isBlocked = record.blockedUntil && record.blockedUntil > now;
      const hasRecentTimestamps = record.timestamps.some((ts) => now - ts < 3600000);
      if (!isBlocked && !hasRecentTimestamps) {
        memoryStore.delete(key);
      }
    }
  }, 5 * 60 * 1000); // Every 5 minutes
}
