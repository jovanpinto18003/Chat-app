import '../styles/globals.css'

export const metadata = {
  title: 'Chat App',
  description: 'A simple chat application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}