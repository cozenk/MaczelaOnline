import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Providers from "@providers/Providers";
import { Toaster } from "@shared/toaster";

export const metadata = {
  title: "Maczela's Pizza",
  description: "The best pizza shop in town",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body>
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
