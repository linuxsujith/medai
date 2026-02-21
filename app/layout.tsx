import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "MEDAI | Professional Medical Guidance",
  description: "Production-ready, India-first medical guidance app. Symptom analysis, medicine scanning, and hospital finder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <h3 className="footer-logo">MEDAI</h3>
                <p className="footer-text">India's most trusted AI medical assistant. Providing safe, high-quality health information to everyone.</p>
              </div>
              <div className="footer-links">
                <h4>Quick Links</h4>
                <a href="/symptoms">Symptom Checker</a>
                <a href="/scan">Scan Medicine</a>
                <a href="/hospitals">Find Hospitals</a>
              </div>
              <div className="footer-links">
                <h4>Safety</h4>
                <a href="/disclaimer">Medical Disclaimer</a>
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} MEDAI. All rights reserved. Disclaimer: Always consult a doctor for medical advice.</p>
            </div>
          </div>
        </footer>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
