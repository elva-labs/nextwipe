import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import GameEditPage from "./app/game/edit.tsx";
import GameCreatePage from "./app/game/new.tsx";
import GamePage from "./app/game/page.tsx";
import HomePage from "./app/home.tsx";
import Layout from "./app/layout.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="game/new" element={<GameCreatePage />} />
              <Route path="game/:id" element={<GamePage />} />
              <Route path="game/:id/edit" element={<GameEditPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
