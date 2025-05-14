// app/layout.tsx
import '@/app/globals.scss'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
          <h1 style={{ textAlign: 'center' }}>📝 React Notes App</h1>
          {children}
        </main>
      </body>
    </html>
  )
}