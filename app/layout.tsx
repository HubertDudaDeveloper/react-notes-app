// app/layout.tsx
import "@/app/globals.scss";
import { NotesProvider } from "@/context/NotesContext";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="app__main">
          <h1 style={{ textAlign: "center" }}>📝 React Notes App</h1>
          <NotesProvider>{children}</NotesProvider>
        </main>
      </body>
    </html>
  );
}
