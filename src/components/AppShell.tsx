import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main>{children}</main>
      <BottomNav />
    </div>
  );
};

export default AppShell;
