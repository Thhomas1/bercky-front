import { Bottombar } from "@/components/BottomBar";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Bottombar />
    </div>
  );
}