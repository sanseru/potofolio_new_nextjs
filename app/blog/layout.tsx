import type { Metadata } from "next"
import { Cormorant_Garamond, Poppins } from "next/font/google"
import "../globals.css"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600"],
})

export const metadata: Metadata = {
  title: "Haris Blog",
  description: "Blog Haris",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${poppins.variable}`}>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Blog Haris" />
      <meta name="keywords" content="Blog, Haris, SAP, Technology, PHP, OPC, Laravel Dotnet" />
      <body>
        {children}
      </body>
    </html>
  )
}
