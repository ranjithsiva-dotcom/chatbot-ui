/* writes src/environments/environment.prod.ts from environment variables at build time
   Usage (Render build):
     node scripts/write-env.js
   Expected env vars (set these in your Render dashboard):
     - API_URL
     - SOCKET_URL
*/
const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

const apiUrl = process.env.API_URL || process.env.NG_APP_API_URL || 'https://api.example.com';
const socketUrl = process.env.SOCKET_URL || process.env.NG_APP_SOCKET_URL || 'https://org-chatbot-api.onrender.com';

const content = `export const environment = {\r\n  production: true,\r\n  apiUrl: '${apiUrl}',\r\n  socketUrl: '${socketUrl}'\r\n};\r\n`;

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, content, { encoding: 'utf8' });
console.log('Wrote', targetPath);
