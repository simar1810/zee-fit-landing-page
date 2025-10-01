// Environment Configuration Example
// Copy this file to config.js and update the values

export const config = {
  // API Configuration
  API_BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3010/api',
  
  // Environment
  NODE_ENV: process.env.VITE_NODE_ENV || 'development',
  
  // App Configuration
  APP_NAME: process.env.VITE_APP_NAME || 'ZeeFit',
  APP_VERSION: process.env.VITE_APP_VERSION || '1.0.0',
  
  // Feature Flags
  ENABLE_ANALYTICS: process.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: process.env.VITE_ENABLE_DEBUG === 'true',
  
  // External Services
  GOOGLE_ANALYTICS_ID: process.env.VITE_GOOGLE_ANALYTICS_ID || '',
  SENTRY_DSN: process.env.VITE_SENTRY_DSN || '',
};

export default config;
