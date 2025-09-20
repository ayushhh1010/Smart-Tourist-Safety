import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { 
  Users, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Activity,
  Settings,
  Bell,
  Download,
  ExternalLink,
  FileText,
  Database,
  BarChart3
} from 'lucide-react';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const metrics = [
    {
      title: 'Active Tourists',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Alerts',
      value: '23',
      change: '-5.2%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'SOS in 24h',
      value: '7',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Avg Response Time',
      value: '4.2m',
      change: '-0.8m',
      trend: 'down',
      icon: Clock,
      color: 'green'
    }
  ];

  const evidenceLogs = [
    {
      id: 'EFR-2024-001',
      timestamp: '2024-12-15 14:30:25',
      tourist: 'Sarah Johnson',
      incidentType: 'Theft',
      status: 'Under Investigation',
      officer: 'Inspector Sharma',
      location: 'Gateway of India'
    },
    {
      id: 'EFR-2024-002',
      timestamp: '2024-12-15 12:15:10',
      tourist: 'John Smith',
      incidentType: 'Lost Property',
      status: 'Resolved',
      officer: 'Constable Patel',
      location: 'Marine Drive'
    },
    {
      id: 'EFR-2024-003',
      timestamp: '2024-12-15 09:45:33',
      tourist: 'Maria Garcia',
      incidentType: 'Harassment',
      status: 'Under Investigation',
      officer: 'Inspector Kumar',
      location: 'Colaba Market'
    },
    {
      id: 'EFR-2024-004',
      timestamp: '2024-12-14 18:20:15',
      tourist: 'David Wilson',
      incidentType: 'Fraud',
      status: 'Closed',
      officer: 'Inspector Singh',
      location: 'Bandra West'
    },
    {
      id: 'EFR-2024-005',
      timestamp: '2024-12-14 16:55:42',
      tourist: 'Lisa Chen',
      incidentType: 'Medical Emergency',
      status: 'Resolved',
      officer: 'Constable Gupta',
      location: 'Juhu Beach'
    }
  ];

  const apiMetrics = [
    { endpoint: '/api/tourists/location', calls: '12,450', success: '99.8%', avgResponse: '120ms' },
    { endpoint: '/api/alerts/create', calls: '856', success: '98.2%', avgResponse: '340ms' },
    { endpoint: '/api/incidents/report', calls: '234', success: '99.1%', avgResponse: '450ms' },
    { endpoint: '/api/emergency/sos', calls: '45', success: '100%', avgResponse: '89ms' }
  ];

  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'High Priority SOS Alert',
      message: 'Emergency signal received from Gateway of India area',
      time: '2 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance window tonight 2-4 AM',
      time: '1 hour ago',
      status: 'scheduled'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Tourist Registration',
      message: '45 new tourists registered today',
      time: '3 hours ago',
      status: 'info'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Investigation':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor and manage tourist safety operations</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1">
          <TabsTrigger value="dashboard" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center">
            <Database className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          {/* Metrics Cards */}
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
                            metric.trend === 'up' 
                              ? metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              : metric.change.startsWith('-') ? 'text-green-600' : 'text-red-600'
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
                    <p className="text-gray-500">Incident trends chart</p>
                    <p className="text-sm text-gray-400">Line chart showing incidents over the last 30 days</p>
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
                    <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-700">Real-time tourist locations</p>
                    <p className="text-sm text-gray-500">Heatmap of current tourist density</p>
                  </div>
                  {/* Sample location markers */}
                  <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute top-8 right-8 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-12 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 right-6 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>API Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Total Calls</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Avg Response Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiMetrics.map((api, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{api.endpoint}</TableCell>
                        <TableCell>{api.calls}</TableCell>
                        <TableCell>
                          <Badge className={parseFloat(api.success) > 99 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                            {api.success}
                          </Badge>
                        </TableCell>
                        <TableCell>{api.avgResponse}</TableCell>
                        <TableCell>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={`shadow-lg border-0 border-l-4 ${getNotificationColor(notification.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {notification.time}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {notification.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Evidence & Incident Logs</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-FIR ID</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Tourist</TableHead>
                      <TableHead>Incident Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Officer</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evidenceLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.id}</TableCell>
                        <TableCell className="text-sm">{log.timestamp}</TableCell>
                        <TableCell>{log.tourist}</TableCell>
                        <TableCell>{log.incidentType}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(log.status)}>
                            {log.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.officer}</TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}