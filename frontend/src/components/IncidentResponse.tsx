import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertTriangle, Phone, MapPin, FileText, Share, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function IncidentResponse() {
  const [emergencyActive, setEmergencyActive] = useState(false);
  const [panicPressed, setPanicPressed] = useState(false);

  const quickActions = [
    {
      title: 'Notify Emergency Services',
      description: 'Alert local police and medical services',
      icon: Phone,
      color: 'bg-red-600 hover:bg-red-700',
      action: () => console.log('Emergency services notified')
    },
    {
      title: 'File E-FIR',
      description: 'Report incident to authorities online',
      icon: FileText,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => console.log('Filing E-FIR')
    },
    {
      title: 'Share Location',
      description: 'Send real-time location to emergency contacts',
      icon: Share,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => console.log('Location shared')
    }
  ];

  const emergencyContacts = [
    {
      type: 'Local Police',
      number: '100',
      description: 'Emergency police services',
      location: 'Mumbai, India'
    },
    {
      type: 'Medical Emergency',
      number: '108',
      description: 'Ambulance and medical services',
      location: 'Mumbai, India'
    },
    {
      type: 'Tourist Helpline',
      number: '+91 1363',
      description: '24/7 tourist assistance',
      location: 'India'
    },
    {
      type: 'US Consulate',
      number: '+91 22 6672 4000',
      description: 'US citizen emergency services',
      location: 'Mumbai'
    }
  ];

  const recentIncidents = [
    {
      id: 1,
      type: 'Medical Emergency',
      date: '2024-12-10',
      time: '14:30',
      status: 'Resolved',
      location: 'Gateway of India, Mumbai',
      description: 'Minor injury, received first aid'
    },
    {
      id: 2,
      type: 'Lost Documentation',
      date: '2024-11-15',
      time: '09:15',
      status: 'Resolved',
      location: 'Bangkok Airport',
      description: 'Passport recovered from lost & found'
    }
  ];

  const handlePanicButton = () => {
    setPanicPressed(true);
    setEmergencyActive(true);
    // Simulate emergency response
    setTimeout(() => {
      setPanicPressed(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Emergency Response</h1>
        <p className="text-gray-600 mt-1">Quick access to emergency services and incident reporting</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Panic Button and Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Panic Button */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
            <CardContent className="p-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Alert</h2>
                <div className="relative mb-6">
                  <Button
                    size="lg"
                    onClick={handlePanicButton}
                    disabled={panicPressed}
                    className={`w-32 h-32 rounded-full text-xl font-bold transition-all duration-300 ${
                      panicPressed 
                        ? 'bg-red-800 animate-pulse' 
                        : 'bg-red-600 hover:bg-red-700 hover:scale-105'
                    }`}
                  >
                    {panicPressed ? (
                      <div className="flex flex-col items-center">
                        <Clock className="h-8 w-8 mb-2" />
                        <span className="text-sm">SENT</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="h-8 w-8 mb-2" />
                        <span>PANIC</span>
                      </div>
                    )}
                  </Button>
                  {emergencyActive && (
                    <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">
                  Press the panic button to immediately notify emergency services and your emergency contacts
                </p>
                {emergencyActive && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-gray-900">Emergency Alert Sent</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your location has been shared with emergency services and your emergency contacts.
                      Response time: ~5-8 minutes
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      className={`${action.color} text-white h-auto p-6 flex flex-col items-center space-y-3 hover:scale-105 transition-all duration-200`}
                      onClick={action.action}
                    >
                      <Icon className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-semibold">{action.title}</div>
                        <div className="text-xs opacity-90 mt-1">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Location Map */}
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Current Location
              </CardTitle>
              <Badge className="bg-green-100 text-green-800">
                Location Active
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                {/* Simulated Map */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300"></div>
                <div className="relative z-10 text-center">
                  <div className="bg-white rounded-full p-4 shadow-lg mb-4 inline-block">
                    <MapPin className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg">
                    <h4 className="font-semibold text-gray-900">Gateway of India</h4>
                    <p className="text-sm text-gray-600">Mumbai, Maharashtra 400001</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Lat: 18.9220° N, Long: 72.8347° E
                    </p>
                    <div className="flex items-center justify-center mt-2 text-xs text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Last updated: Just now
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Button variant="outline" size="sm">
                  Share Location
                </Button>
                <Button variant="outline" size="sm">
                  Update Location
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIncidents.length > 0 ? (
                  recentIncidents.map((incident) => (
                    <div key={incident.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{incident.type}</Badge>
                            <Badge 
                              className={incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                            >
                              {incident.status}
                            </Badge>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{incident.description}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {incident.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {incident.date} at {incident.time}
                            </span>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p>No recent incidents reported</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts Sidebar */}
        <div className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{contact.type}</h4>
                      <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{contact.location}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-3">
                    <Phone className="h-4 w-4 mr-2" />
                    Call {contact.number}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-teal-50">
            <CardContent className="p-6">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
                <ul className="text-sm text-gray-600 text-left space-y-1">
                  <li>• Keep emergency contacts updated</li>
                  <li>• Share your location with trusted contacts</li>
                  <li>• Carry copies of important documents</li>
                  <li>• Know local emergency numbers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}