const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}

export default AppLayout;
