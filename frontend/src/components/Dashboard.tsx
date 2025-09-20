import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import {
  Shield,
  MapPin,
  Bell,
  Activity,
  Plane,
  AlertTriangle,
  Globe,
  Calendar,
  CalendarDays,
  MapPin as LocationIcon,
  Search,
  AlertCircle,
} from "lucide-react";
import type { AppUser } from "src/App";
import type { Trip } from "src/components/TripManagement";

interface DashboardProps {
  user: AppUser;
}

interface ActivityLog {
  id: number;
  action: string;
  time: string;
}

export function Dashboard({ user }: DashboardProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [daysTraveled, setDaysTraveled] = useState(0);
  const [activity, setActivity] = useState<ActivityLog[]>([]);

  // Helper: returns a readable destination string for a trip
  const getPrimaryDestination = (trip: Trip): string => {
    if (!trip) return "Unknown";
    if (Array.isArray(trip.destinations) && trip.destinations.length > 0) {
      // prefer the 'place' of the first destination
      const first = trip.destinations[0];
      if (first && typeof first.place === "string" && first.place.trim()) {
        return first.place;
      }
    }
    // fallback to startLocation if available
    if (trip.startLocation && trip.startLocation.trim()) return trip.startLocation;
    return "Unknown";
  };

  // ✅ Load trips from localStorage (uses unified key "trips")
  useEffect(() => {
    const saved = localStorage.getItem("trips");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Trip[];
        setTrips(parsed);

        // Calculate total days traveled
        let totalDays = 0;
        parsed.forEach((trip) => {
          const start = trip?.startDate ? new Date(trip.startDate) : null;
          const end = trip?.endDate ? new Date(trip.endDate) : null;
          if (start instanceof Date && !isNaN(start.getTime()) && end instanceof Date && !isNaN(end.getTime())) {
            const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            totalDays += diff > 0 ? diff : 0;
          }
        });
        setDaysTraveled(totalDays);
      } catch {
        localStorage.removeItem("trips");
        setTrips([]);
        setDaysTraveled(0);
      }
    }
  }, []);

  // ✅ Load recent activity
  useEffect(() => {
    const saved = localStorage.getItem("activity");
    if (saved) {
      try {
        setActivity(JSON.parse(saved) as ActivityLog[]);
      } catch {
        localStorage.removeItem("activity");
      }
    }
  }, []);

  // Dynamic Metrics
  const metrics = [
    { label: "Active Trips", value: trips.length.toString(), icon: Plane },
    {
      label: "Safety Alerts",
      value: trips.length > 0 ? "2" : "0", // placeholder
      icon: AlertTriangle,
    },
    {
      label: "Locations Visited",
      value: Array.from(
        new Set(
          trips
            .flatMap((t) =>
              Array.isArray(t.destinations) ? t.destinations.map((d) => d.place).filter(Boolean) : []
            )
            .map((s) => s?.trim())
            .filter(Boolean)
        )
      ).length.toString(),
      icon: Globe,
    },
    { label: "Days Traveled", value: daysTraveled.toString(), icon: Calendar },
  ];

  const quickStats = [
    { label: "Location", value: user.location || "Unknown", icon: MapPin },
    {
      label: "Role",
      value: user.role === "tourist" ? "Tourist" : "Authority",
      icon: Shield,
    },
    { label: "Alerts", value: "2 Active", icon: Bell },
    { label: "System Health", value: "Normal", icon: Activity },
  ];

  // Quick Action Handlers
  const handleEmergency = () => {
    alert("🚨 Emergency Alert Sent!");
  };
  const handleShareLocation = () => {
    alert("📍 Location shared with authorities!");
  };
  const handleNearbyHelp = () => {
    alert("🔍 Searching for nearby help...");
  };

  // Upcoming Trips (sorted by startDate)
  const upcomingTrips = trips
    .filter((t) => {
      const start = t?.startDate ? new Date(t.startDate) : null;
      return start instanceof Date && !isNaN(start.getTime()) && start >= new Date();
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Gradient */}
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl p-6 text-white shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
          <p className="mt-1 text-blue-100">
            Stay safe and enjoy your travels in {user.location || "Unknown"}.
          </p>
          <div className="mt-3 flex space-x-4 text-sm">
            <span>🌍 Current Location: {user.location || "Unknown"}</span>
            <span>🛡️ Safety Score: 98%</span>
          </div>
        </div>
        <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
          <p className="text-2xl font-bold">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-blue-100">Local Time</p>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={index}
              className="shadow-md border-0 bg-gradient-to-br from-blue-50 to-teal-50 hover:shadow-lg transition"
            >
              <CardContent className="p-6 flex flex-col items-center">
                <Icon className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{metric.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-md border-0 bg-white hover:shadow-lg transition">
              <CardContent className="p-6 flex flex-col items-center">
                <Icon className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>
                <p className="text-gray-600">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Trips + Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Trips */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="h-5 w-5 text-blue-600 mr-2" />
              Upcoming Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingTrips.length === 0 ? (
              <p className="text-gray-600">No upcoming trips.</p>
            ) : (
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="p-3 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{getPrimaryDestination(trip)}</h3>
                      <p className="text-sm text-gray-600">
                        {trip.startDate || "?"} → {trip.endDate || "?"}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                      {trip.startDate && new Date(trip.startDate) > new Date() ? "Planning" : "Ongoing"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={handleEmergency}
              className="w-full flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Emergency Alert
            </button>
            <button
              onClick={handleShareLocation}
              className="w-full flex items-center px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              <LocationIcon className="h-5 w-5 mr-2" />
              Share Location
            </button>
            <button
              onClick={handleNearbyHelp}
              className="w-full flex items-center px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              <Search className="h-5 w-5 mr-2" />
              Find Nearby Help
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-gray-600">No recent activity.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {activity.map((item) => (
                <li key={item.id} className="py-3 flex justify-between">
                  <span className="text-gray-700">{item.action}</span>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
