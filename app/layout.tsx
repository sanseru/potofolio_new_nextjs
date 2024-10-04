import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Haris Lukman Hakim',
  description: 'Personal Website Haris Lukman Hakim',
  openGraph: {
    title: 'Haris Lukman Hakim',
    description: 'A brief description of your personal website.',
    url: 'https://harislukman.my.id', // Replace with your URL
    siteName: 'Haris Lukman Hakim',
    images: [
      {
        url: 'https://harislukman.my.id/Header.webp', // Replace with your image URL
        width: 1200, // Optional: Specify the width of the image
        height: 630, // Optional: Specify the height of the image
        alt: 'Description of the image', // Replace with your image description
      },
    ],
    type: 'website', // or 'article', 'video.movie', etc. depending on your content
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haris Lukman Hakim',
    description: 'A brief description of your personal website.',
    images: [
      {
        url: 'https://harislukman.my.id/Header.webp', // Replace with your image URL
        alt: 'Description of the image',
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
