# DiagramFlow-Tele v1.1.1

DiagramFlow-Tele is a lightweight automation platform for Telegram bots with GitHub-integrated plugin management and a responsive Web3-style UI.
This release adds an automatic configuration setup from the frontend so users do not need to edit backend environment files manually.

## Quickstart

1. Unzip the package and open a terminal.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Start backend and frontend in separate terminals:
   ```bash
   # terminal 1
   cd backend
   node src/server.js

   # terminal 2
   cd frontend
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.
6. On first run, open **Setup** in the UI and enter the following values:
   - GitHub Client ID
   - GitHub Client Secret
   - Session Secret (random string)
   - Telegram Bot Token (optional; can be set later in Bot Settings)
7. Click **Save Configuration**. The backend will persist configuration automatically and apply it without manual file edits.

## Notes
- The backend will create and update `backend/.env` when configuration is submitted from the UI.
- For plugin installation the host needs `git` installed.
- For production, run behind HTTPS and secure sessions.

## Credits
Developed by Paong & Evelyn (Main Developer: Paong)
Community: https://whatsapp.com/channel/0029Vb6cgi6LSmbec90kZv02
