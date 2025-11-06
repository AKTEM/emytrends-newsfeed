import { ReactNode } from "react";
import { Header } from "../../components/shared/Header";
import { Footer } from "../../components/shared/Footer";
import { DashboardSidebar } from "../../components/dashboard/DashboardSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <DashboardSidebar />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
