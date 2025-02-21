# Deployment Checklist

1. Ensure all dependencies are in package.json
2. Set up environment variables in Netlify:
   - DATABASE_URL
   - JWT_SECRET
   - BLOB_READ_WRITE_TOKEN
   - NODE_ENV=production

3. Database setup:
   - Ensure production database is provisioned
   - Run migrations: `npx prisma db push`

4. Verify build locally:
   ```bash
   npm run build
   ```

5. Git push and deploy:
   ```bash
   git add .
   git commit -m "Deploy to Netlify"
   git push
   ```

6. Monitor deployment:
   - Check Netlify deploy logs
   - Verify database connection
   - Test authentication flows 