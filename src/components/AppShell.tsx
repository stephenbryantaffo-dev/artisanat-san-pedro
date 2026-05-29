import TopNav from "@/components/TopNav";
import BrandBar from "@/components/BrandBar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

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
      <ScrollToTopButton />
    </div>
  );
};

export default AppShell;
