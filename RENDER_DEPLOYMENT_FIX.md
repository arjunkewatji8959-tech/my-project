# SNDF Render deployment fix

## Why the login JSON error appears
The login page expects `POST /api/login` to be handled by the Express backend in `server.js`. If this project is deployed as a Render **Static Site**, `/api/login` is not served by Express and may return an HTML/empty response. The updated `login.js` now displays a useful deployment error instead of `Unexpected end of JSON input`.

## Required Render setup
1. Push the contents of this folder (including `package.json` and `server.js`) to a GitHub repository.
2. In Render, create a **New + → Web Service**, connect that repository, and set:
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`
3. After deploy, open `https://YOUR-WEB-SERVICE.onrender.com/api/health`. It should return JSON with `"status":"healthy"`.
4. Then open `https://YOUR-WEB-SERVICE.onrender.com/login.html` and test login.
5. If an existing Static Site is using the same name/domain, it must not be mistaken for the backend Web Service. Use the new Web Service URL, or configure the custom domain to point to the Web Service.

## SQLite persistence
Render's local filesystem may be temporary. For production use, attach persistent storage if supported by your plan and set `HOSTINGER_DATA_DIR` to the mounted path, or migrate SQLite to a managed database. Do not delete any existing database/volume without taking a backup.

## Important security note
The current source bootstraps a known default Master Admin credential (`adi123` / `sndf1234`). Before public production use, change this behavior and rotate the credential. Do not use the default password on an internet-facing deployment.

## Browser Dangerous warning
This code change does not remove a Google Safe Browsing warning. Check the exact deployed URL with Google Safe Browsing Site Status and resolve any flagged content separately.
