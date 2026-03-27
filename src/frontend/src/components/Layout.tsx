import {
  BookOpen,
  LayoutDashboard,
  Menu,
  PlusCircle,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import type { Page } from "../App";

interface LayoutProps {
  children: ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Patients", icon: Users },
  { id: "newSession", label: "New Session", icon: PlusCircle },
  { id: "referenceLibrary", label: "Reference Library", icon: BookOpen },
  { id: "profile", label: "Profile", icon: User },
];

export default function Layout({
  children,
  currentPage,
  setPage,
}: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(page: Page) {
    setPage(page);
    setMobileOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-[280px] xl:w-[320px] fixed top-0 left-0 bottom-0 border-r border-border z-30"
        style={{ backgroundColor: "#111111" }}
      >
        <SidebarContent currentPage={currentPage} onNav={handleNav} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close menu overlay"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 z-50 flex flex-col border-r border-border lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#111111" }}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        <SidebarContent currentPage={currentPage} onNav={handleNav} />
      </aside>

      {/* Mobile header */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center px-4 z-30 border-b border-border"
        style={{ backgroundColor: "#111111" }}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="text-gray-400 hover:text-white mr-3"
          aria-label="Open menu"
          data-ocid="nav.toggle"
        >
          <Menu size={20} />
        </button>
        <Zap size={18} className="text-yellow-500 mr-2" />
        <span className="text-white font-semibold text-sm">
          Quantum Wellness
        </span>
      </header>

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px] xl:ml-[320px] min-h-screen pt-14 lg:pt-0">
        <div className="p-4 md:p-6 xl:p-8 max-w-6xl">{children}</div>
        <footer className="px-6 py-4 border-t border-border mt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

function SidebarContent({
  currentPage,
  onNav,
}: {
  currentPage: Page;
  onNav: (page: Page) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "#2A1A00" }}
          >
            <Zap size={20} style={{ color: "#C8862A" }} />
          </div>
          <div>
            <div className="font-bold text-white text-base leading-tight">
              Quantum Wellness
            </div>
            <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
              Bio-Photonic Platform
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.id}
              onClick={() => onNav(item.id)}
              data-ocid={`nav.${item.id}.link`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
              style={
                isActive ? { backgroundColor: "#2A1A00", color: "#C8862A" } : {}
              }
            >
              <Icon size={18} style={isActive ? { color: "#C8862A" } : {}} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Active Modalities card */}
      <div
        className="mx-3 mb-4 p-4 rounded-lg border border-border"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="text-xs font-semibold text-gray-300 mb-2">
          Active Modalities
        </div>
        <div className="text-xs" style={{ color: "#6B7280" }}>
          PMA · Laser · Thermal · Acupuncture · TCM
        </div>
      </div>
    </div>
  );
}
