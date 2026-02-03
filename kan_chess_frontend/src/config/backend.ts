const HOST = import.meta.env.VITE_BACKEND_HOST;
const PORT = import.meta.env.VITE_BACKEND_PORT;

export const BACKEND_HTTP = `http://${HOST}:${PORT}`;
export const BACKEND_WS = `ws://${HOST}:${PORT}/ws`;
