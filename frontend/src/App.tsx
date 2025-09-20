import React, { useState, useEffect } from "react";
import { Button } from "src/components/ui/button";
import { Badge } from "src/components/ui/badge";
import { LandingPage } from "src/components/LandingPage";
import { TouristProfile } from "src/components/TouristProfile";
import { TripManagement } from "src/components/TripManagement";
import { IncidentResponse } from "src/components/IncidentResponse";
import { Dashboard } from "src/components/Dashboard";
import { SearchAlerts } from "src/components/SearchAlerts";
import { EFIRFiling } from "src/components/EFIRFiling";
import { AdminDashboard } from "src/components/AdminDashboard";
import { AnomalyDetection } from "src/components/AnomalyDetection";
import { IncidentResolution } from "src/components/IncidentResolution";
import { Login } from "src/components/Login";
import {
  Menu,
  Shield,
  Home,
  User as UserIcon,
  Users,
  AlertTriangle,
  Search,
  FileText,
  Settings,
  Activity,
} from "lucide-react";

type Page =
  | "landing"
  | "login"
  | "profile"
  | "trips"
  | "incident"
  | "dashboard"
  | "search"
  | "efir"
  | "admin"
  | "anomaly"
  | "resolution";

// ✅ Central user type used everywhere
export interface AppUser {
  name: string;
  email: string;
  phone: string;
  role: "tourist" | "admin";
  location?: string;
  idProof?: {
    type: string;
    number: string;
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [user, setUser] = useState<AppUser | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AppUser;
        setUser(parsed);
        setCurrentPage("dashboard");
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Tourist navigation
  const touristPages = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "trips", label: "My Trips", icon: Users },
    { id: "incident", label: "Emergency", icon: AlertTriangle },
    { id: "search", label: "Search & Alerts", icon: Search },
    { id: "efir", label: "File E-FIR", icon: FileText },
  ];

  // Admin navigation
  const adminPages = [
    { id: "admin", label: "Admin Dashboard", icon: Settings },
    { id: "anomaly", label: "Anomaly Detection", icon: Activity },
    { id: "resolution", label: "Incident Resolution", icon: Shield },
    { id: "search", label: "Search & Alerts", icon: Search },
  ];

  const getCurrentPages = () =>
    user?.role === "admin" ? adminPages : touristPages;

  // Render page based on current state
  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onGetStarted={() => setCurrentPage("login")} />;

      case "login":
        return (
          <Login
            onLoginSuccess={(loggedUser: AppUser) => {
              setUser(loggedUser);
              localStorage.setItem("user", JSON.stringify(loggedUser));
              setCurrentPage("dashboard");
            }}
          />
        );

      case "profile":
        return user ? (
          <TouristProfile user={user} />
        ) : (
          <LandingPage onGetStarted={() => setCurrentPage("login")} />
        );

      case "trips":
        return <TripManagement />;

      case "incident":
        return <IncidentResponse />;

      case "dashboard":
        return user ? (
          <Dashboard user={user} />
        ) : (
          <LandingPage onGetStarted={() => setCurrentPage("login")} />
        );

      case "search":
        return <SearchAlerts />;

      case "efir":
        return <EFIRFiling />;

      case "admin":
        return <AdminDashboard />;

      case "anomaly":
        return <AnomalyDetection />;

      case "resolution":
        return <IncidentResolution />;

      default:
        return <LandingPage onGetStarted={() => setCurrentPage("login")} />;
    }
  };

  // ✅ Hide shell for landing/login
  if (currentPage === "landing" || currentPage === "login") {
    return renderPage();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center ml-4 lg:ml-0">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  SafeTour
                </span>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Badge>{user?.role === "tourist" ? "Tourist" : "Authority"}</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem("user");
                  setCurrentPage("landing");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 px-4 py-6">
              <nav className="space-y-2">
                {getCurrentPages().map((page) => {
                  const Icon = page.icon;
                  return (
                    <Button
                      key={page.id}
                      variant={currentPage === page.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => {
                        setCurrentPage(page.id as Page);
                        setSidebarOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {page.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="py-6">{renderPage()}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
