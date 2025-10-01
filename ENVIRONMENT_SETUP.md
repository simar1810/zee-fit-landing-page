# Environment Setup Guide

## Environment Variables

This project uses environment variables for configuration. Follow these steps to set up your environment:

### 1. Copy Environment Template

```bash
cp env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your specific values:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3010/api

# Environment
VITE_NODE_ENV=development

# App Configuration
VITE_APP_NAME=ZeeFit
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

### 3. Environment Files Priority

Vite loads environment files in this order (higher priority overrides lower):

1. `.env.local` (always ignored by git)
2. `.env.[mode].local` (e.g., `.env.development.local`)
3. `.env.[mode]` (e.g., `.env.development`)
4. `.env`

### 4. Available Modes

- **Development**: `npm run dev` (uses `.env.development`)
- **Production**: `npm run build` (uses `.env.production`)

### 5. Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3010/api` | Yes |
| `VITE_NODE_ENV` | Environment mode | `development` | No |
| `VITE_APP_NAME` | Application name | `ZeeFit` | No |
| `VITE_APP_VERSION` | Application version | `1.0.0` | No |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | `false` | No |
| `VITE_ENABLE_DEBUG` | Enable debug mode | `true` | No |

### 6. Using Environment Variables in Code

```typescript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const isDebug = import.meta.env.VITE_ENABLE_DEBUG === 'true';

// Type-safe environment variables
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_NODE_ENV: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG: string;
}
```

### 7. Security Notes

- Never commit `.env.local` or `.env.production.local` files
- Only variables prefixed with `VITE_` are exposed to the client
- Sensitive data should be handled server-side only

### 8. Production Deployment

For production deployment:

1. Set up environment variables in your hosting platform
2. Ensure `VITE_NODE_ENV=production`
3. Update `VITE_API_BASE_URL` to your production API URL
4. Set `VITE_ENABLE_DEBUG=false`
