import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
} 