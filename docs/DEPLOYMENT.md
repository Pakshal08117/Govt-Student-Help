# 🚀 Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel provides the best experience for Vite + React applications with zero configuration.

#### Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Deploy via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your Git repository
3. Configure environment variables (see below)
4. Click "Deploy"

### Option 2: Netlify

#### Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Deploy via Netlify Dashboard
1. Go to [Netlify Dashboard](https://app.netlify.com/start)
2. Import your Git repository
3. Build settings are auto-detected from `netlify.toml`
4. Add environment variables
5. Click "Deploy site"

### Option 3: AWS Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect your Git repository
4. Configure build settings (auto-detected)
5. Add environment variables
6. Deploy

## Environment Variables

All deployment platforms require these environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_ADMIN_USERNAME=your-admin-username
VITE_ADMIN_PASSWORD=your-secure-password
```

### How to Add Environment Variables

**Vercel:**
- Dashboard → Project Settings → Environment Variables
- Or use CLI: `vercel env add VITE_SUPABASE_URL`

**Netlify:**
- Dashboard → Site Settings → Environment Variables
- Or add to `netlify.toml` (not recommended for secrets)

**AWS Amplify:**
- Console → App Settings → Environment Variables

## Build Configuration

The project uses these build settings (auto-detected by most platforms):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

## Post-Deployment Checklist

After deployment, verify:

- ✅ Application loads correctly
- ✅ User authentication works
- ✅ Admin panel is accessible
- ✅ Supabase connection is working
- ✅ All 12 languages work correctly
- ✅ AI Assistant responds properly
- ✅ Voice features work (Chrome recommended)
- ✅ Mobile responsiveness is maintained
- ✅ All pages load without errors

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records

### AWS Amplify
1. Go to App Settings → Domain Management
2. Add custom domain
3. Configure DNS records

## SSL/HTTPS

All platforms provide free SSL certificates automatically:
- Vercel: Automatic via Let's Encrypt
- Netlify: Automatic via Let's Encrypt
- AWS Amplify: Automatic via AWS Certificate Manager

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Check variable names match exactly

### 404 on Page Refresh
- Configure redirects for SPA routing
- Vercel: Automatic
- Netlify: Already configured in `netlify.toml`
- AWS Amplify: Add rewrite rule in console

## Performance Optimization

### Recommended Settings
- Enable compression (automatic on all platforms)
- Configure caching headers
- Enable CDN (automatic on all platforms)
- Monitor Core Web Vitals

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `src/main.tsx`:
```typescript
import { inject } from '@vercel/analytics';
inject();
```

## Monitoring & Logs

- **Vercel**: Dashboard → Deployments → View Logs
- **Netlify**: Dashboard → Deploys → Deploy Log
- **AWS Amplify**: Console → App → Deployment History

## Rollback

If deployment fails:
- **Vercel**: Dashboard → Deployments → Previous Deployment → Promote
- **Netlify**: Dashboard → Deploys → Previous Deploy → Publish
- **AWS Amplify**: Console → Redeploy previous version

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Contact platform support
- Open GitHub issue for project-specific problems
