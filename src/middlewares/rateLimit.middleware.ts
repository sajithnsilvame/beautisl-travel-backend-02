import rateLimit from 'express-rate-limit';
import appConfig from '@/config/app.config';

const { rateLimit: rateLimitConfig } = appConfig;

export const apiLimiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false,  // Disable the X-RateLimit-* headers
    message: 'Too many requests from this IP, please try again later.',
});

// For sensitive routes (e.g., login), you might want a stricter rate limit:
export const authLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per minute
    skipSuccessfulRequests: true, // Do not count successful requests
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many login attempts from this IP, please try again after a minute.',
});