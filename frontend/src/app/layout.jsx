import Script from 'next/script';
import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  display: 'swap',
  subsets: ['latin-ext'],
});

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'LLM Agents',
  description: 'LLM Agents Hackathon',
  other: {
    'theme-color': '#A45E9F',
  },
};

export const revalidate = 3600;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/*Open Graph Meta Tags */}
        <meta property="og:title" content="LLM Agents Hackathon" />
        <meta
          property="og:description"
          content="LLM Agents Hackathon. The event is held by the Sharif Artificial Intelligence Chapter
              (SAIC) of Sharif University of Technology."
        />
        <meta
          property="og:image"
          content="https://llm-agents.ir/preview.png?v=2"
        />
        <meta property="og:url" content="https://llm-agents.ir/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />

        {/*Twitter Meta Tags */}
        <meta name="twitter:site" content="WSS" />
        <meta name="twitter:card" content="https://llm-agents.ir/preview.png" />
        <meta name="twitter:title" content="LLM Agents Hackathon" />
        <meta name="twitter:description" content="LLM Agents Hackathon" />
        <meta
          name="twitter:image"
          content="https://llm-agents.ir/preview.png"
        />
        <meta name="twitter:url" content="https://llm-agents.ir/" />
        <Script
          async={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.GA_TRACKING_ID}');
        `}
        </Script>
      </head>

      <body className={manrope.className}>{children}</body>
    </html>
  );
}
