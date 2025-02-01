import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";

export const metadata = {
  title: "Holy Trinity",
  description: "Created by Holy Trinity @ DotSlash 8.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />{children}<Footer />
      </body>
    </html>
  );
}
