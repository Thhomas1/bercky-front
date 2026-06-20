import BottomBar from "../components/BottomBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto max-w-7xl p-5">{children}</div>
      <BottomBar />
    </div>
  );
}