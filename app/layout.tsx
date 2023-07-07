export const metadata = {
  title: 'Tabi blog',
  description: 'We are going to introduce my travel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head />
      <body>{children}</body>
    </html>
  )
}
