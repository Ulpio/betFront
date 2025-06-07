import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brasileirão Predictor | Previsão de Jogos",
  description: "Sistema inteligente de predição para jogos do Campeonato Brasileiro. Análise baseada em dados históricos e estatísticas avançadas.",
  keywords: "brasileirão, predição, futebol, campeonato brasileiro, análise, estatísticas",
  authors: [{ name: "Brasileirão Predictor Team" }],
  creator: "Brasileirão Predictor",
  publisher: "Brasileirão Predictor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Brasileirão Predictor | Previsão de Jogos",
    description: "Sistema inteligente de predição para jogos do Campeonato Brasileiro",
    url: "http://localhost:3000",
    siteName: "Brasileirão Predictor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brasileirão Predictor",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brasileirão Predictor | Previsão de Jogos",
    description: "Sistema inteligente de predição para jogos do Campeonato Brasileiro",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="msapplication-TileColor" content="#16a34a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-green-50 via-white to-blue-50 min-h-screen`}
      >
        <div className="relative">
          {/* Background Pattern */}
          <div className="fixed inset-0 -z-10 opacity-30">
            <svg
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 mt-16 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">
                  © 2024 Brasileirão Predictor. Todos os direitos reservados.
                </p>
                <p className="text-gray-500 text-xs">
                  Sistema desenvolvido com tecnologia de IA para análise preditiva
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}