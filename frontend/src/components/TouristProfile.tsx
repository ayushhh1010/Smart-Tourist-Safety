import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  User, 
  Edit, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  FileText, 
  Shield, 
  Camera,
  Plus,
  ExternalLink
} from 'lucide-react';

export function TouristProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const profileData = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',
    passportNumber: 'US123456789',
    emergencyContact: 'John Johnson (+1 555 987-6543)',
    verified: true,
    memberSince: 'March 2023',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=400&h=400&fit=crop&crop=face'
  };

  const trips = [
    {
      id: 1,
      destination: 'Mumbai, India',
      dates: 'Dec 15-22, 2024',
      status: 'Upcoming',
      type: 'Leisure'
    },
    {
      id: 2,
      destination: 'Bangkok, Thailand',
      dates: 'Oct 10-18, 2024',
      status: 'Completed',
      type: 'Business'
    },
    {
      id: 3,
      destination: 'Dubai, UAE',
      dates: 'Aug 5-12, 2024',
      status: 'Completed',
      type: 'Leisure'
    }
  ];

  const documents = [
    {
      type: 'Passport',
      number: 'US123456789',
      expiry: 'June 2028',
      status: 'Verified'
    },
    {
      type: 'Visa',
      number: 'IN987654321',
      expiry: 'December 2024',
      status: 'Active'
    },
    {
      type: 'Travel Insurance',
      number: 'TI456789123',
      expiry: 'March 2025',
      status: 'Active'
    }
  ];

  const emergencyContacts = [
    {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543',
      email: 'john.johnson@email.com'
    },
    {
      name: 'US Embassy Delhi',
      relationship: 'Embassy',
      phone: '+91 11 2419-8000',
      email: 'newdelhi@state.gov'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Profile Header */}
        <div className="lg:col-span-3">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      <AvatarFallback className="text-lg">SJ</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">{profileData.name}</h1>
                      {profileData.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600 space-x-4 text-sm">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profileData.nationality}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Member since {profileData.memberSince}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant={isEditing ? 'default' : 'outline'}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Tabs Content */}
          <div className="mt-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 rounded-lg p-1">
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="trips">Trips</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input
                          id="nationality"
                          value={profileData.nationality}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passport">Passport Number</Label>
                        <Input
                          id="passport"
                          value={profileData.passportNumber}
                          disabled={!isEditing}
                          className={isEditing ? '' : 'bg-gray-50'}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trips" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Trip History</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Trip
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trips.map((trip) => (
                        <div key={trip.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                              <p className="text-sm text-gray-600">{trip.dates}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant={trip.status === 'Upcoming' ? 'default' : 'secondary'}>
                                  {trip.status}
                                </Badge>
                                <Badge variant="outline">{trip.type}</Badge>
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
              </TabsContent>

              <TabsContent value="emergency" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Emergency Contacts</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contact
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {emergencyContacts.map((contact, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{contact.relationship}</p>
                              <div className="space-y-1">
                                <p className="text-sm flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                  {contact.phone}
                                </p>
                                <p className="text-sm flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                  {contact.email}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <Card className="shadow-lg border-0">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Travel Documents</CardTitle>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.map((doc, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                                <FileText className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{doc.type}</h4>
                                <p className="text-sm text-gray-600">{doc.number}</p>
                                <p className="text-sm text-gray-500">Expires: {doc.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={doc.status === 'Verified' ? 'default' : 'secondary'}
                                className={doc.status === 'Verified' ? 'bg-green-100 text-green-800' : ''}
                              >
                                {doc.status}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <User className="h-4 w-4 mr-2" />
                Update Info
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                View Trips
              </Button>
              <Button className="w-full justify-start bg-red-50 text-red-700 border-red-200 hover:bg-red-100">
                <Shield className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-teal-50">
            <CardContent className="p-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Safety Score</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <p className="text-sm text-gray-600">Excellent safety record</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}