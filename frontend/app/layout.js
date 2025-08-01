import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Plot Hole Plotter - Useless Subtitle & Audio Analyzer",
  description: "The most sophisticated tool for analyzing things that don't need analyzing. Guaranteed to waste your time in the most professional way possible!",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 