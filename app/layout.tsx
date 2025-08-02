import Navbar from "./components/Navbar"
import localFont from "next/font/local"
import "./globals.css"


const workSans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/WorkSans-Bold.ttf",
      weight: "700",
    },
    {
      path: "./fonts/WorkSans-Medium.ttf",
      weight: "500",
    },
    {
      path: "./fonts/WorkSans-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/WorkSans-Light.ttf",
      weight: "300",
    },
    {
      path: "./fonts/WorkSans-ExtraLight.ttf",
      weight: "200",
    },
    {
      path: "./fonts/WorkSans-Thin.ttf",
      weight: "100",
    },
    ]
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="font-work-sans">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}