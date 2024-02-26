import Navbar from "@/components/common/Navbar";
import Footer from "@/components/layouts/Footer";
import dynamic from "next/dynamic";
// const Navbar = dynamic(() => import("@/components/common/Navbar"), {
//   ssr: false,
// });

export const metadata = {
  title: "Accident Detection System",
  description: "Quickly detect accidents and alert emergency services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col justify-between">
        <Navbar />
        <div className="w-full grow">{children}</div>
        <Footer />
      </main>
    </>
  );
}
