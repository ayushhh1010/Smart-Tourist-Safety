import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Users, 
  Activity,
  Navigation,
  PhoneOff,
  TrendingUp,
  ExternalLink,
  Filter,
  Bell
} from 'lucide-react';

export function AnomalyDetection() {
  const [selectedTab, setSelectedTab] = useState('route');

  const routeDeviations = [
    {
      id: 1,
      tourist: 'Sarah Johnson',
      nationality: 'US',
      expectedRoute: 'Hotel → Gateway of India',
      actualRoute: 'Hotel → Unknown Area (Dharavi)',
      deviation: '2.5 km',
      duration: '45 minutes',
      riskLevel: 'High',
      timestamp: '2024-12-15 14:30',
      lastKnownLocation: 'Dharavi Slum Area',
      coordinates: { lat: 19.0375, lng: 72.8562 }
    },
    {
      id: 2,
      tourist: 'John Smith',
      nationality: 'UK',
      expectedRoute: 'Marine Drive → Colaba Market',
      actualRoute: 'Marine Drive → Bandra West',
      deviation: '8.2 km',
      duration: '1 hour 20 minutes',
      riskLevel: 'Medium',
      timestamp: '2024-12-15 13:15',
      lastKnownLocation: 'Bandra West Station',
      coordinates: { lat: 19.0544, lng: 72.8406 }
    },
    {
      id: 3,
      tourist: 'Maria Garcia',
      nationality: 'Spain',
      expectedRoute: 'Airport → Hotel',
      actualRoute: 'Airport → Andheri East',
      deviation: '4.1 km',
      duration: '2 hours 10 minutes',
      riskLevel: 'High',
      timestamp: '2024-12-15 11:45',
      lastKnownLocation: 'Andheri East Market',
      coordinates: { lat: 19.1197, lng: 72.8526 }
    }
  ];

  const distressSignals = [
    {
      id: 1,
      tourist: 'David Wilson',
      nationality: 'Canada',
      alertType: 'Panic Button',
      location: 'Gateway of India',
      timestamp: '2024-12-15 15:45',
      duration: '5 minutes ago',
      riskLevel: 'Critical',
      responseStatus: 'Emergency Team Dispatched',
      coordinates: { lat: 18.9220, lng: 72.8347 }
    },
    {
      id: 2,
      tourist: 'Lisa Chen',
      nationality: 'Australia',
      alertType: 'Help SMS',
      location: 'Colaba Market',
      timestamp: '2024-12-15 14:20',
      duration: '1 hour 25 minutes ago',
      riskLevel: 'High',
      responseStatus: 'Officer En Route',
      coordinates: { lat: 18.9067, lng: 72.8147 }
    },
    {
      id: 3,
      tourist: 'Ahmed Hassan',
      nationality: 'UAE',
      alertType: 'Emergency Contact Alert',
      location: 'Juhu Beach',
      timestamp: '2024-12-15 12:30',
      duration: '3 hours 15 minutes ago',
      riskLevel: 'Medium',
      responseStatus: 'Contact Established',
      coordinates: { lat: 19.0896, lng: 72.8656 }
    }
  ];

  const inactivityAlerts = [
    {
      id: 1,
      tourist: 'Emma Thompson',
      nationality: 'UK',
      lastActivity: '6 hours ago',
      lastLocation: 'Marine Drive Hotel',
      inactiveDuration: '6 hours 23 minutes',
      riskLevel: 'Medium',
      expectedActivity: 'City Tour',
      timestamp: '2024-12-15 09:22',
      contactAttempts: 3,
      coordinates: { lat: 18.9067, lng: 72.8147 }
    },
    {
      id: 2,
      tourist: 'Robert Kim',
      nationality: 'South Korea',
      lastActivity: '8 hours ago',
      lastLocation: 'Taj Hotel',
      inactiveDuration: '8 hours 45 minutes',
      riskLevel: 'High',
      expectedActivity: 'Business Meeting',
      timestamp: '2024-12-15 07:00',
      contactAttempts: 5,
      coordinates: { lat: 18.9220, lng: 72.8347 }
    }
  ];

  const riskAlerts = [
    {
      id: 1,
      type: 'High Crime Area Entry',
      tourist: 'Multiple (12 tourists)',
      location: 'Dharavi Area',
      riskLevel: 'High',
      description: 'Tourists entered area with elevated crime statistics',
      recommendation: 'Increase patrol presence, send safety advisory',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'Crowding Alert',
      tourist: 'Group of 25',
      location: 'Gateway of India',
      riskLevel: 'Medium',
      description: 'Large tourist group in congested area during peak hours',
      recommendation: 'Deploy crowd management personnel',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      type: 'Weather Risk',
      tourist: 'All tourists in South Mumbai',
      location: 'South Mumbai',
      riskLevel: 'Low',
      description: 'Heavy rain warning issued for the area',
      recommendation: 'Send weather advisory notifications',
      timestamp: '30 minutes ago'
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Critical':
      case 'High':
        return 'bg-red-500';
      case 'Medium':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Anomaly Detection & Risk Alerts</h1>
        <p className="text-gray-600 mt-1">Monitor tourist behavior patterns and detect potential safety risks</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1">
          <TabsTrigger value="route" className="flex items-center">
            <Navigation className="h-4 w-4 mr-2" />
            Route Deviation
          </TabsTrigger>
          <TabsTrigger value="distress" className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Distress
          </TabsTrigger>
          <TabsTrigger value="inactivity" className="flex items-center">
            <PhoneOff className="h-4 w-4 mr-2" />
            Inactivity
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Risk Alerts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="route" className="mt-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Route Deviation Alerts</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Risk Level
                </Button>
              </div>

              {routeDeviations.map((deviation) => (
                <Card key={deviation.id} className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getRiskIcon(deviation.riskLevel)}`}></div>
                          <Badge className={getRiskColor(deviation.riskLevel)}>
                            {deviation.riskLevel} Risk
                          </Badge>
                          <Badge variant="outline">{deviation.nationality}</Badge>
                          <span className="text-sm text-gray-500">{deviation.timestamp}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {deviation.tourist}
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <span className="font-medium text-gray-700">Expected Route:</span>
                              <p className="text-gray-600">{deviation.expectedRoute}</p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Actual Route:</span>
                              <p className="text-gray-600">{deviation.actualRoute}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-gray-600">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              Deviation: {deviation.deviation}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Duration: {deviation.duration}
                            </span>
                          </div>
                          <div className="bg-gray-50 rounded p-3">
                            <span className="font-medium text-gray-700">Last Known Location:</span>
                            <p className="text-gray-600">{deviation.lastKnownLocation}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Bell className="h-4 w-4 mr-2" />
                          Contact Tourist
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map View */}
            <div>
              <Card className="shadow-lg border-0 sticky top-4">
                <CardHeader>
                  <CardTitle>Live Location Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <p className="text-gray-700">Route deviation map</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {routeDeviations.length} flagged tourists
                      </p>
                    </div>
                    
                    {/* Simulated pins for flagged tourists */}
                    {routeDeviations.map((deviation, index) => (
                      <div
                        key={deviation.id}
                        className={`absolute w-4 h-4 rounded-full animate-pulse ${getRiskIcon(deviation.riskLevel)}`}
                        style={{
                          top: `${20 + index * 25}%`,
                          left: `${30 + index * 15}%`
                        }}
                        title={deviation.tourist}
                      ></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="distress" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Active Distress Signals</h2>
              <div className="flex space-x-2">
                <Badge className="bg-red-100 text-red-800">
                  {distressSignals.filter(d => d.riskLevel === 'Critical').length} Critical
                </Badge>
                <Badge className="bg-orange-100 text-orange-800">
                  {distressSignals.filter(d => d.riskLevel === 'High').length} High Priority
                </Badge>
              </div>
            </div>

            {distressSignals.map((signal) => (
              <Card key={signal.id} className="shadow-lg border-0 border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getRiskIcon(signal.riskLevel)} animate-pulse`}></div>
                        <Badge className={getRiskColor(signal.riskLevel)}>
                          {signal.riskLevel}
                        </Badge>
                        <Badge variant="outline">{signal.alertType}</Badge>
                        <span className="text-sm text-gray-500">{signal.duration}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {signal.tourist} ({signal.nationality})
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-4 text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {signal.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {signal.timestamp}
                          </span>
                        </div>
                        <div className="bg-blue-50 rounded p-3 border-l-2 border-blue-400">
                          <span className="font-medium text-blue-900">Response Status:</span>
                          <p className="text-blue-800">{signal.responseStatus}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Escalate
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactivity" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Inactivity Monitoring</h2>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Set Thresholds
              </Button>
            </div>

            {inactivityAlerts.map((alert) => (
              <Card key={alert.id} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getRiskIcon(alert.riskLevel)}`}></div>
                        <Badge className={getRiskColor(alert.riskLevel)}>
                          {alert.riskLevel} Risk
                        </Badge>
                        <Badge variant="outline">{alert.nationality}</Badge>
                        <span className="text-sm text-gray-500">Inactive: {alert.inactiveDuration}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {alert.tourist}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium text-gray-700">Last Activity:</span>
                            <p className="text-gray-600">{alert.lastActivity} at {alert.timestamp}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Expected Activity:</span>
                            <p className="text-gray-600">{alert.expectedActivity}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            Last Location: {alert.lastLocation}
                          </span>
                          <span className="flex items-center">
                            <PhoneOff className="h-3 w-3 mr-1" />
                            Contact Attempts: {alert.contactAttempts}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <Users className="h-4 w-4 mr-2" />
                        Send Welfare Check
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact Emergency
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risk" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Risk Assessment Alerts</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Create Custom Alert
                </Button>
                <Button variant="outline" size="sm">
                  Risk Settings
                </Button>
              </div>
            </div>

            {riskAlerts.map((risk) => (
              <Card key={risk.id} className="shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getRiskIcon(risk.riskLevel)}`}></div>
                        <Badge className={getRiskColor(risk.riskLevel)}>
                          {risk.riskLevel}
                        </Badge>
                        <span className="text-sm text-gray-500">{risk.timestamp}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {risk.type}
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Affected Tourists:</span>
                          <p className="text-gray-600">{risk.tourist}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Location:</span>
                          <p className="text-gray-600">{risk.location}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Description:</span>
                          <p className="text-gray-600">{risk.description}</p>
                        </div>
                        <div className="bg-blue-50 rounded p-3 border-l-2 border-blue-400">
                          <span className="font-medium text-blue-900">Recommended Action:</span>
                          <p className="text-blue-800">{risk.recommendation}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Take Action
                      </Button>
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}