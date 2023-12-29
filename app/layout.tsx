import Head from "next/head"
import React from "react"

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Alumni Map</title>
      </Head>
      <body>{children}</body>
    </html>
  )
}