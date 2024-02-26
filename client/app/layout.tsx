import { ReactQueryProvider } from "@/components/global/ReactQueryProvider";
import { DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <ReactQueryProvider>
          <Toaster />

          {children}
          {/* <main className="flex min-h-screen w-full flex-col justify-between">
              <div className="w-full grow">{children}</div>
              <Footer />
            </main> */}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
