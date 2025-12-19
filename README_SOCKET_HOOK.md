# Socket Hook Refactor & Configuration System

## Overview

This document outlines the recent refactoring of the `useSocket` hook and the implementation of a full configuration API for the Dashboard.

## 1. `useSocket` Refactor

The `useSocket` hook was causing infinite re-rendering loops in components because it listed the `events` object (which is created on every render in parent components) as a dependency for `useEffect` that triggers connection logic.

### The Problem

```typescript
// Old Implementation
useEffect(() => {
  // Connection logic...
}, [namespace, events]); // 'events' changes on every render!
```

### The Solution (Ref Pattern)

We updated the hook to use `useRef` to store the latest event handlers.

1.  **Refs for Handlers**: `eventsRef`, `onConnectRef`, `onDisconnectRef` hold the latest callbacks.
2.  **Stable Dependencies**: The main `useEffect` for connection now **only** depends on `namespace` (and the _keys_ of events, assuming stable keys).
3.  **Dynamic Invocation**: The socket listeners call `eventsRef.current[eventName]()`, ensuring they always execute the latest logic without re-binding the listener or re-connecting the socket.

This makes the hook "industry grade" safe, meaning users don't strictly need to `useMemo` their event handlers (though it's still good practice).

## 2. Configuration System

We introduced `ConfigurationApi` (RTK Query) to handle persistence.

- **Old Way**: `SkinApi` only handled skins. Configuration (match #) was memory-only in React state.
- **New Way**:
  - `GET /api/config`: Fetches current match number & skin.

````
# Socket Hook Refactor & Configuration System

## Overview

This document outlines the recent refactoring of the `useSocket` hook and the implementation of a full configuration API for the Dashboard.

## 1. `useSocket` Refactor

The `useSocket` hook was causing infinite re-rendering loops in components because it listed the `events` object (which is created on every render in parent components) as a dependency for `useEffect` that triggers connection logic.

### The Problem

```typescript
// Old Implementation
useEffect(() => {
  // Connection logic...
}, [namespace, events]); // 'events' changes on every render!
````

### The Solution (Ref Pattern)

We updated the hook to use `useRef` to store the latest event handlers.

1.  **Refs for Handlers**: `eventsRef`, `onConnectRef`, `onDisconnectRef` hold the latest callbacks.
2.  **Stable Dependencies**: The main `useEffect` for connection now **only** depends on `namespace` (and the _keys_ of events, assuming stable keys).
3.  **Dynamic Invocation**: The socket listeners call `eventsRef.current[eventName]()`, ensuring they always execute the latest logic without re-binding the listener or re-connecting the socket.

This makes the hook "industry grade" safe, meaning users don't strictly need to `useMemo` their event handlers (though it's still good practice).

## 2. Configuration System

We introduced `ConfigurationApi` (RTK Query) to handle persistence.

- **Old Way**: `SkinApi` only handled skins. Configuration (match #) was memory-only in React state.
- **New Way**:
  - `GET /api/config`: Fetches current match number & skin.
  - `POST /api/config`: Updates them and **broadcasts via Socket**.
  - `useGetConfigQuery`: Auto-syncs Dashboard UI on load.
  - `useUpdateConfigMutation`: Scalable way to save settings.

## 3. Server Updates

- Increased upload limit to **50MB** to fix `413 Payload Too Large`.
- Implemented persistent config API routes.

## 4. Troubleshooting deployment (tournalink.com)

If you see errors when deploying:

### 413 Request Entity Too Large

If you updated the Node.js code but still get 413, check your **Nginx** configuration on the server.
Add `client_max_body_size 50M;` to your `nginx.conf` or site block:

```nginx
server {
    ...
    client_max_body_size 50M;
    ...
}
```

### 405 Method Not Allowed (POST /api/config)

If you get 405, it means the server running at `tournalink.com` **does not have the latest code**.

- Ensure you deployed the updated `server/index.js` which contains `app.post("/api/config", ...)`
- Restart the server process (pm2 restart, etc.).
- If testing locally, ensure `VITE_API_BASE_URL` points to `http://localhost:5000`, NOT the production URL.

```

```
