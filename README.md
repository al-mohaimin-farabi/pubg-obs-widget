# PUBG Scrim Widget

A monorepo containing both client and server for the PUBG Scrim Widget application.

## Structure

- `client/`: React frontend built with Vite
- `server/`: Node.js backend with Express and Socket.io

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the client in development mode:

   ```bash
   npm run dev:client
   ```

3. Start the server in development mode:
   ```bash
   npm run dev:server
   ```

## Scripts

- `npm run dev:client`: Start client dev server
- `npm run dev:server`: Start server dev server
- `npm run build:client`: Build client for production
- `npm run start:server`: Start server in production

## GitHub Repository

This is a single repository containing both client and server code, managed as a monorepo using npm workspaces.
