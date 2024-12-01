import type { Metadata } from "next"
import { Barlow } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Github } from 'lucide-react'
import Link from "next/link"

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: "LastFM Collage Generator",
  description: "Generate collages from your LastFM listening history",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${barlow.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="container mx-auto p-4 flex justify-end items-center">
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <Link href="https://github.com/marrrkkk/lastfm-collage-generator" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
                    <Github className="h-[1.2rem] w-[1.2rem]" />
                  </Link>
                </Button>
              </div>
            </header>
            <main className="flex-grow container mx-auto p-4">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

