import Navbar from "@/components/Navbar";
import BottomBar from "@/components/Bottombar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <BottomBar />
    </div>
  );
}