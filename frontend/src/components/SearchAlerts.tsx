import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Badge } from 'src/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  Map,
  List,
  ExternalLink,
  Calendar
} from 'lucide-react';

export function SearchAlerts() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const alerts = [
    {
      id: 1,
      title: 'Heavy Rainfall Warning',
      type: 'Weather',
      severity: 'Critical',
      location: 'Mumbai City Center',
      city: 'Mumbai',
      description: 'Heavy monsoon rains expected. Avoid low-lying areas and waterlogged streets. Public transport may be delayed.',
      time: '2 hours ago',
      expires: '2024-12-20',
      coordinates: { lat: 18.9220, lng: 72.8347 },
      affectedTourists: 245
    },
    {
      id: 2,
      title: 'Road Construction Advisory',
      type: 'Traffic',
      severity: 'Moderate',
      location: 'Marine Drive to Nariman Point',
      city: 'Mumbai',
      description: 'Major road construction causing traffic delays. Use alternate routes via Churchgate.',
      time: '4 hours ago',
      expires: '2024-12-25',
      coordinates: { lat: 18.9067, lng: 72.8147 },
      affectedTourists: 89
    },
    {
      id: 3,
      title: 'Increased Security Measures',
      type: 'Security',
      severity: 'Critical',
      location: 'Dharavi Area',
      city: 'Mumbai',
      description: 'Enhanced security protocols in effect. Tourist movement restricted after 8 PM.',
      time: '6 hours ago',
      expires: '2024-12-18',
      coordinates: { lat: 19.0376, lng: 72.8562 },
      affectedTourists: 156
    },
    {
      id: 4,
      title: 'Festival Crowd Management',
      type: 'Event',
      severity: 'Moderate',
      location: 'Gateway of India',
      city: 'Mumbai',
      description: 'Large festival gathering expected. Increased crowd, plan accordingly.',
      time: '8 hours ago',
      expires: '2024-12-17',
      coordinates: { lat: 18.9220, lng: 72.8347 },
      affectedTourists: 312
    },
    {
      id: 5,
      title: 'Tourist Scam Alert',
      type: 'Safety',
      severity: 'Low',
      location: 'Colaba Market',
      city: 'Mumbai',
      description: 'Reports of overcharging tourists. Be cautious with street vendors and negotiate prices.',
      time: '12 hours ago',
      expires: '2024-12-22',
      coordinates: { lat: 18.9067, lng: 72.8147 },
      affectedTourists: 67
    },
    {
      id: 6,
      title: 'Pollution Alert',
      type: 'Health',
      severity: 'Moderate',
      location: 'Delhi City Center',
      city: 'Delhi',
      description: 'Air quality index reaching unhealthy levels. Sensitive individuals should limit outdoor activities.',
      time: '1 day ago',
      expires: '2024-12-19',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      affectedTourists: 445
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500';
      case 'Moderate':
        return 'bg-orange-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = cityFilter === 'all' || alert.city === cityFilter;
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    
    return matchesSearch && matchesCity && matchesSeverity && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Search & Alerts</h1>
          <p className="text-gray-600 mt-1">Monitor safety alerts and search locations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <Map className="h-4 w-4 mr-2" />
            Map
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg border-0 mb-6">
        <CardContent className="p-6">
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts, locations, or incidents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Mumbai">Mumbai</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bangalore">Bangalore</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Weather">Weather</SelectItem>
                <SelectItem value="Traffic">Traffic</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Alerts List */}
        <div className="lg:col-span-2">
          {viewMode === 'list' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Active Alerts ({filteredAlerts.length})
                </h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
              
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getSeverityIcon(alert.severity)}`}></div>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">{alert.type}</Badge>
                          <span className="text-sm text-gray-500">{alert.time}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{alert.title}</h3>
                        <p className="text-gray-600 mb-3">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {alert.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Expires: {alert.expires}
                            </span>
                            <span className="flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {alert.affectedTourists} tourists affected
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredAlerts.length === 0 && (
                <Card className="shadow-lg border-0">
                  <CardContent className="p-12 text-center">
                    <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            // Map View
            <Card className="shadow-lg border-0 h-96">
              <CardHeader>
                <CardTitle>Alert Locations Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-full bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <Map className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700">Interactive map with alert pins</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {filteredAlerts.length} alerts displayed
                    </p>
                  </div>
                  
                  {/* Simulated alert pins */}
                  {filteredAlerts.slice(0, 5).map((alert, index) => (
                    <div
                      key={alert.id}
                      className={`absolute w-4 h-4 rounded-full animate-pulse ${getSeverityIcon(alert.severity)}`}
                      style={{
                        top: `${20 + index * 15}%`,
                        left: `${25 + index * 12}%`
                      }}
                      title={alert.title}
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Alert Statistics */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Alert Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Critical Alerts</span>
                <Badge className="bg-red-100 text-red-800">
                  {alerts.filter(a => a.severity === 'Critical').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Moderate Alerts</span>
                <Badge className="bg-orange-100 text-orange-800">
                  {alerts.filter(a => a.severity === 'Moderate').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Low Priority</span>
                <Badge className="bg-green-100 text-green-800">
                  {alerts.filter(a => a.severity === 'Low').length}
                </Badge>
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">Total Affected Tourists</span>
                  <span className="text-lg font-bold text-blue-600">
                    {alerts.reduce((sum, alert) => sum + alert.affectedTourists, 0)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">New critical alert in Mumbai</span>
                  <span className="text-gray-400">2h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Traffic alert updated</span>
                  <span className="text-gray-400">4h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Safety alert resolved</span>
                  <span className="text-gray-400">6h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">New weather advisory</span>
                  <span className="text-gray-400">8h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Report Location Issue
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Subscribe to Alerts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}