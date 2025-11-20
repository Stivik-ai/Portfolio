import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Szymon - Web Developer from Poland | Custom Websites, SEO & Optimization",
  description: "16-year-old professional web developer from Poland specializing in high-performance websites, SEO optimization, and responsive design. Expert in C#, JavaScript, HTML & CSS. Available for freelance projects.",
  keywords: [
    "web developer Poland",
    "freelance web developer",
    "SEO optimization",
    "responsive web design",
    "website optimization",
    "JavaScript developer",
    "HTML CSS developer",
    "C# developer",
    "custom websites",
    "e-commerce development",
    "landing pages",
    "web performance",
    "Szymon web developer",
    "Polish web developer",
    "website development services",
    "Szymon Piekarz",
  ],
  authors: [{ name: "Szymon", url: "https://github.com/Stivik-ai" }],
  creator: "Szymon",
  publisher: "Szymon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://szymon-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Szymon - Web Developer from Poland | Custom Websites, SEO & Optimization',
    description: '16-year-old professional web developer from Poland specializing in high-performance websites, SEO optimization, and responsive design. Expert in C#, JavaScript, HTML & CSS.',
    siteName: 'Szymon Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Szymon - Web Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Szymon - Web Developer from Poland',
    description: 'Professional web developer specializing in high-performance websites, SEO optimization, and responsive design.',
    images: ['/og-image.png'],
    creator: '@szymon_dev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Szymon",
              jobTitle: "Web Developer",
              url: "https://szymon-portfolio.vercel.app",
              email: "szymonpiekarz09@gmail.com",
              telephone: "+48535048108",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Poland"
              },
              sameAs: [
                "https://github.com/Stivik-ai"
              ],
              knowsAbout: [
                "Web Development",
                "SEO Optimization",
                "Responsive Design",
                "JavaScript",
                "HTML",
                "CSS",
                "C#",
                "Website Optimization",
                "E-commerce Development"
              ],
              description: "16-year-old professional web developer from Poland specializing in high-performance websites, SEO optimization, and responsive design.",
            })
          }}
        />
        
        {/* Additional Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Szymon Portfolio",
              url: "https://szymon-portfolio.vercel.app",
              description: "Professional web developer portfolio showcasing expertise in web development, SEO optimization, and responsive design.",
              author: {
                "@type": "Person",
                name: "Szymon"
              }
            })
          }}
        />
        
        {/* Additional Structured Data - Professional Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Szymon Web Development Services",
              description: "Professional web development services specializing in custom websites, SEO optimization, and responsive design.",
              provider: {
                "@type": "Person",
                name: "Szymon"
              },
              areaServed: "Worldwide",
              serviceType: [
                "Web Development",
                "SEO Optimization",
                "Responsive Web Design",
                "Website Optimization",
                "E-commerce Development",
                "Landing Page Development"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}