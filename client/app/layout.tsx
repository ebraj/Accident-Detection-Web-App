import "./globals.css";
import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryProvider } from "@/components/global/ReactQueryProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layouts/Footer";

export const metadata = {
  title: "Accident Detection System",
  description: "Quickly detect accidents and alert emergency services",
};

const queryClient = new QueryClient();
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
          <ReactQueryProvider>
            <Toaster />

            {children}
            {/* <main className="flex min-h-screen w-full flex-col justify-between">
              <div className="w-full grow">{children}</div>
              <Footer />
            </main> */}
          </ReactQueryProvider>
        </>
      </body>
    </html>
  );
}
