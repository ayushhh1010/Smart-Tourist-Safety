import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { LandingPage } from './components/LandingPage';
import { TouristProfile } from './components/TouristProfile';
import { TripManagement } from './components/TripManagement';
import { IncidentResponse } from './components/IncidentResponse';
import { Dashboard } from './components/Dashboard';
import { SearchAlerts } from './components/SearchAlerts';
import { EFIRFiling } from './components/EFIRFiling';
import { AdminDashboard } from './components/AdminDashboard';
import { AnomalyDetection } from './components/AnomalyDetection';
import { IncidentResolution } from './components/IncidentResolution';
import { Menu, User, Shield, Home, Search, AlertTriangle, FileText, Settings, Users, Activity } from 'lucide-react';

type Page = 'landing' | 'profile' | 'trips' | 'incident' | 'dashboard' | 'search' | 'efir' | 'admin' | 'anomaly' | 'resolution';
type UserType = 'tourist' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userType, setUserType] = useState<UserType>('tourist');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const touristPages = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'trips', label: 'My Trips', icon: Users },
    { id: 'incident', label: 'Emergency', icon: AlertTriangle },
    { id: 'search', label: 'Search & Alerts', icon: Search },
    { id: 'efir', label: 'File E-FIR', icon: FileText },
  ];

  const adminPages = [
    { id: 'admin', label: 'Admin Dashboard', icon: Settings },
    { id: 'anomaly', label: 'Anomaly Detection', icon: Activity },
    { id: 'resolution', label: 'Incident Resolution', icon: Shield },
    { id: 'search', label: 'Search & Alerts', icon: Search },
  ];

  const getCurrentPages = () => userType === 'admin' ? adminPages : touristPages;

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
      case 'profile':
        return <TouristProfile />;
      case 'trips':
        return <TripManagement />;
      case 'incident':
        return <IncidentResponse />;
      case 'dashboard':
        return <Dashboard userType={userType} />;
      case 'search':
        return <SearchAlerts />;
      case 'efir':
        return <EFIRFiling />;
      case 'admin':
        return <AdminDashboard />;
      case 'anomaly':
        return <AnomalyDetection />;
      case 'resolution':
        return <IncidentResolution />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
    }
  };

  if (currentPage === 'landing') {
    return renderPage();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
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
                <span className="ml-2 text-xl font-semibold text-gray-900">SafeTour</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={userType === 'tourist' ? 'default' : 'secondary'}>
                {userType === 'tourist' ? 'Tourist' : 'Authority'}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserType(userType === 'tourist' ? 'admin' : 'tourist');
                  setCurrentPage('dashboard');
                }}
              >
                Switch to {userType === 'tourist' ? 'Admin' : 'Tourist'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage('landing')}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <div className="flex-1 px-4 py-6">
              <nav className="space-y-2">
                {getCurrentPages().map((page) => {
                  const Icon = page.icon;
                  return (
                    <Button
                      key={page.id}
                      variant={currentPage === page.id ? 'default' : 'ghost'}
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
          <div className="py-6">
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}