import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router";
import Router from "./Router.tsx";
import {SocketProvider} from "./features/socket/SocketContext.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Router />
    </BrowserRouter>
)
