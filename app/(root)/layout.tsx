import Navbar from "@/components/Navbar"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "../globals.css"
import 'easymde/dist/easymde.min.css'
import { Toaster } from "@/components/ui/toaster"

const workSans = localFont({
  src: [
    {
      path: "../../assets/fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/WorkSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../assets/fonts/WorkSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "../../assets/fonts/WorkSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../assets/fonts/WorkSans-Light.ttf",
      weight: "300",
    },
    {
      path: "../../assets/fonts/WorkSans-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "../../assets/fonts/WorkSans-Thin.ttf",
      weight: "100",
    },
    ],
    variable: "--font-work-sans",
     
})
export const metadata: Metadata = {
  title: "Startup",
  description: "Startup",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-work-sans`}>
        <main  >
          <Navbar />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}