import MainSection from "@/components/dashboard/MainSection";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import MaxWidthContainer from "@/components/layouts/MaxWidthContainer";
import { SidebarContextProvider } from "@/contexts/useSidebar";

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
    <SidebarContextProvider>
      <main className="flex min-h-screen w-full flex-col justify-between bg-slate-100">
        <MaxWidthContainer className="max-w-none px-0 md:px-0">
          <section className="flex min-h-screen">
            {/* Sidebar */}

            <MobileSidebar />

            {/* Main */}
            <MainSection>{children}</MainSection>
          </section>
        </MaxWidthContainer>
      </main>
    </SidebarContextProvider>
  );
}
