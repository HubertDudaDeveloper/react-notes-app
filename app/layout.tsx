// app/layout.tsx
import "@/assets/styles/globals.scss";
import { NotesProvider } from "@/context/NotesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider>
          <NotesProvider>
            {children}
          </NotesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
