import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import Router from "./Router.tsx";
import {SocketProvider} from "./socket/SocketContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <SocketProvider>
          <BrowserRouter>
              <Router />
          </BrowserRouter>
      </SocketProvider>
  </StrictMode>,
)
