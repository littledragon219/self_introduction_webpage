import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Nunito_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/navigation/Header"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-header",
  display: "swap",
})

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cognitive Synapse | A Blueprint of a Mind",
  description: "身心合一的智造者 - 曾德荣的个人作品集",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${nunitoSans.variable}`}>
      <body className="bg-brand-background text-brand-text font-body">
        <Header />
        {children}
      </body>
    </html>
  )
}
