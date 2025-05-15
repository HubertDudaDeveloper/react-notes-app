// app/layout.tsx
import "@/app/globals.scss";
import { NotesProvider } from "@/context/NotesContext";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
          <NotesProvider>{children}</NotesProvider>
      </body>
    </html>
  );
}
