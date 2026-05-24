import TopNav from "@/components/TopNav";
import BrandBar from "@/components/BrandBar";
import Footer from "@/components/Footer";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main>{children}</main>
      <Footer />
      <BrandBar />
    </div>
  );
};

export default AppShell;
