import type { Metadata } from 'next'
import './globals.css'
import ProtectedLayout from './(protected)/layout';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" />
      </head>
      <body>
        <main>
          <ProtectedLayout>
            {children}
          </ProtectedLayout>
        </main>
      </body>
    </html>
  )
}

export default AppLayout;
