import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Haris Lukman Hakim',
  description: 'Haris Lukman Portofolio Site',
  openGraph: {
    title: 'Haris Lukman Hakim',
    description: 'Haris Lukman Portofolio Site',
    url: 'https://harislukman.my.id', // Replace with your URL
    siteName: 'Haris Lukman Hakim',
    images: [
      {
        url: 'https://harislukman.my.id/Header.webp', // Replace with your image URL
        width: 1200, // Optional: Specify the width of the image
        height: 630, // Optional: Specify the height of the image
        alt: 'header Image', // Replace with your image description
      },
    ],
    type: 'website', // or 'article', 'video.movie', etc. depending on your content
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haris Lukman Hakim',
    description: 'Haris Lukman Portofolio Site',
    images: [
      {
        url: 'https://harislukman.my.id/Header.webp', // Replace with your image URL
        alt: 'header Image',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
