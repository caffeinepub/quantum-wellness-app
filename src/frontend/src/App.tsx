import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AmbientMusicPlayer from "./components/AmbientMusicPlayer";
import Layout from "./components/Layout";
import PasswordGate from "./components/PasswordGate";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NewSession from "./pages/NewSession";
import Patients from "./pages/Patients";
import Profile from "./pages/Profile";
import ReferenceLibrary from "./pages/ReferenceLibrary";

export type Page =
  | "dashboard"
  | "patients"
  | "newSession"
  | "referenceLibrary"
  | "profile"
  | "contact";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  function renderPage() {
    switch (page) {
      case "dashboard":
        return <Dashboard setPage={setPage} />;
      case "patients":
        return <Patients />;
      case "newSession":
        return <NewSession setPage={setPage} />;
      case "referenceLibrary":
        return <ReferenceLibrary />;
      case "profile":
        return <Profile />;
      case "contact":
        return <Contact />;
      default:
        return <Dashboard setPage={setPage} />;
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster theme="dark" />
      <AmbientMusicPlayer />
      <Layout currentPage={page} setPage={setPage}>
        {renderPage()}
      </Layout>
    </div>
  );
}
