import "./globals.css";
import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";

export const metadata = {
  title: "Accident Detection System",
  description: "Quickly detect accidents and alert emergency services",
};

const font = DM_Sans({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <>
          <Toaster position="top-right" />
          {children}
        </>
      </body>
    </html>
  );
}
