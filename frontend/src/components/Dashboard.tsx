import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Users, 
  AlertTriangle, 
  MapPin, 
  Activity, 
  Shield, 
  Plane, 
  Clock,
  TrendingUp,
  Search,
  Bell,
  Calendar,
  ExternalLink
} from 'lucide-react';

interface DashboardProps {
  userType: 'tourist' | 'admin';
}

export function Dashboard({ userType }: DashboardProps) {
  if (userType === 'tourist') {
    return <TouristDashboard />;
  }
  return <AuthorityDashboard />;
}

function TouristDashboard() {
  const safetyAlerts = [
    {
      id: 1,
      type: 'Weather Alert',
      location: 'Mumbai City Center',
      severity: 'Moderate',
      time: '2 hours ago',
      description: 'Heavy rain expected, avoid waterlogged areas'
    },
    {
      id: 2,
      type: 'Traffic Update',
      location: 'Marine Drive',
      severity: 'Low',
      time: '4 hours ago',
      description: 'Road construction causing delays'
    },
    {
      id: 3,
      type: 'Safety Notice',
      location: 'Dharavi Area',
      severity: 'Critical',
      time: '6 hours ago',
      description: 'Increased security measures in effect'
    }
  ];

  const touristClusters = [
    { location: 'Gateway of India', count: 245, trend: 'up' },
    { location: 'Marine Drive', count: 189, trend: 'stable' },
    { location: 'Juhu Beach', count: 156, trend: 'down' },
    { location: 'Colaba Market', count: 134, trend: 'up' }
  ];

  const upcomingTrips = [
    {
      destination: 'Goa, India',
      date: '2024-12-28',
      status: 'Confirmed'
    },
    {
      destination: 'Kerala, India',
      date: '2025-01-15',
      status: 'Planning'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
              <p className="text-blue-100">Stay safe and enjoy your travels in Mumbai, India</p>
              <div className="flex items-center mt-3 space-x-4 text-sm">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Current Location: Mumbai
                </span>
                <span className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  Safety Score: 98%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-lg p-4">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <div className="text-xl font-bold">2:45 PM</div>
                <div className="text-sm text-blue-100">Local Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Trips</p>
                    <p className="text-2xl font-bold text-gray-900">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Safety Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Locations Visited</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Days Traveled</p>
                    <p className="text-2xl font-bold text-gray-900">45</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Safety Alerts */}
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Nearby Safety Alerts
              </CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {safetyAlerts.map((alert) => (
                  <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <span className="text-sm text-gray-600">{alert.time}</span>
                        </div>
                        <h4 className="font-medium text-gray-900">{alert.type}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {alert.location}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tourist Clusters */}
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Popular Tourist Spots
              </CardTitle>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Explore
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {touristClusters.map((cluster, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{cluster.location}</h4>
                        <p className="text-sm text-gray-600">{cluster.count} tourists currently</p>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className={`h-4 w-4 ${
                          cluster.trend === 'up' ? 'text-green-600' :
                          cluster.trend === 'down' ? 'text-red-600' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Trips */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Trips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTrips.map((trip, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900">{trip.destination}</h4>
                  <p className="text-sm text-gray-600">{trip.date}</p>
                  <Badge variant="outline" className="mt-2">
                    {trip.status}
                  </Badge>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                Plan New Trip
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Alert
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Find Nearby Help
              </Button>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-teal-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-2">☀️</div>
                <h3 className="font-semibold text-gray-900">Mumbai</h3>
                <p className="text-2xl font-bold text-blue-600">28°C</p>
                <p className="text-sm text-gray-600">Partly Cloudy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AuthorityDashboard() {
  const metrics = [
    {
      title: 'Active Tourists',
      value: '2,847',
      change: '+12.5%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Alerts',
      value: '23',
      change: '-5.2%',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'SOS in 24h',
      value: '7',
      change: '+2.1%',
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Response Time',
      value: '4.2m',
      change: '-0.8m',
      icon: Clock,
      color: 'green'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Authority Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor tourist safety and respond to incidents</p>
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 bg-${metric.color}-100 rounded-lg`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <span className={`ml-2 text-sm ${
                        metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Incident Chart */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Incidents Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Incident trends chart would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tourist Hotspots Map */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>Tourist Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700">Interactive map with tourist locations</p>
              </div>
              {/* Sample location markers */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-12 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}