import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Hotel, 
  Plane, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Plus,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';

export function TripManagement() {
  const [expandedTrip, setExpandedTrip] = useState<number | null>(null);

  const trips = [
    {
      id: 1,
      destination: 'Mumbai, India',
      country: 'India',
      startDate: '2024-12-15',
      endDate: '2024-12-22',
      status: 'Upcoming',
      type: 'Leisure',
      progress: 75,
      accommodation: {
        name: 'The Taj Mahal Palace',
        address: 'Apollo Bunder, Mumbai 400001',
        phone: '+91 22 6665 3366',
        checkIn: '2024-12-15',
        checkOut: '2024-12-22'
      },
      flights: [
        {
          type: 'Departure',
          airline: 'Air India',
          flight: 'AI 131',
          date: '2024-12-15',
          time: '02:30 AM',
          from: 'JFK, New York',
          to: 'BOM, Mumbai'
        },
        {
          type: 'Return',
          airline: 'Air India',
          flight: 'AI 130',
          date: '2024-12-22',
          time: '08:45 PM',
          from: 'BOM, Mumbai',
          to: 'JFK, New York'
        }
      ],
      itinerary: [
        { day: 1, activity: 'Arrival & Check-in', location: 'Mumbai Airport → Hotel' },
        { day: 2, activity: 'Gateway of India & Marine Drive', location: 'South Mumbai' },
        { day: 3, activity: 'Elephanta Caves Tour', location: 'Elephanta Island' },
        { day: 4, activity: 'Bollywood Studio Tour', location: 'Film City' },
        { day: 5, activity: 'Shopping at Colaba Market', location: 'Colaba' },
        { day: 6, activity: 'Dharavi Slum Tour', location: 'Dharavi' },
        { day: 7, activity: 'Local Food Tour', location: 'Various Locations' },
        { day: 8, activity: 'Departure', location: 'Hotel → Mumbai Airport' }
      ],
      emergencyNumbers: [
        { type: 'Tourist Helpline', number: '+91 1363' },
        { type: 'Police', number: '100' },
        { type: 'Medical Emergency', number: '108' },
        { type: 'US Consulate Mumbai', number: '+91 22 6672 4000' }
      ]
    },
    {
      id: 2,
      destination: 'Bangkok, Thailand',
      country: 'Thailand',
      startDate: '2024-10-10',
      endDate: '2024-10-18',
      status: 'Completed',
      type: 'Business',
      progress: 100,
      accommodation: {
        name: 'Shangri-La Hotel Bangkok',
        address: '89 Soi Wat Suan Plu, Bangkok 10120',
        phone: '+66 2 236 7777',
        checkIn: '2024-10-10',
        checkOut: '2024-10-18'
      },
      flights: [
        {
          type: 'Departure',
          airline: 'Thai Airways',
          flight: 'TG 316',
          date: '2024-10-10',
          time: '11:20 PM',
          from: 'JFK, New York',
          to: 'BKK, Bangkok'
        }
      ],
      itinerary: [
        { day: 1, activity: 'Business Conference', location: 'Queen Sirikit Convention Center' },
        { day: 2, activity: 'Client Meetings', location: 'Silom District' },
        { day: 3, activity: 'Temple Tours', location: 'Wat Pho, Wat Arun' },
      ],
      emergencyNumbers: [
        { type: 'Tourist Police', number: '1155' },
        { type: 'Emergency Services', number: '191' }
      ]
    },
    {
      id: 3,
      destination: 'Dubai, UAE',
      country: 'UAE',
      startDate: '2024-08-05',
      endDate: '2024-08-12',
      status: 'Completed',
      type: 'Leisure',
      progress: 100,
      accommodation: {
        name: 'Burj Al Arab',
        address: 'Jumeirah Beach Road, Dubai',
        phone: '+971 4 301 7777',
        checkIn: '2024-08-05',
        checkOut: '2024-08-12'
      },
      flights: [],
      itinerary: [
        { day: 1, activity: 'Dubai Mall & Burj Khalifa', location: 'Downtown Dubai' },
        { day: 2, activity: 'Desert Safari', location: 'Dubai Desert' },
      ],
      emergencyNumbers: [
        { type: 'Police', number: '999' },
        { type: 'Ambulance', number: '998' }
      ]
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trip Management</h1>
          <p className="text-gray-600 mt-1">Manage your travel itineraries and trip details</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Trip
        </Button>
      </div>

      {/* Trip Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Trip Timeline</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
          <div className="space-y-6">
            {trips.map((trip, index) => (
              <div key={trip.id} className="relative flex items-start">
                <div className={`absolute left-2 w-4 h-4 rounded-full border-2 border-white ${
                  trip.status === 'Upcoming' ? 'bg-blue-500' :
                  trip.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div className="ml-10 flex-1">
                  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-3">
                            <span>{trip.destination}</span>
                            <Badge className={getStatusColor(trip.status)}>
                              {trip.status}
                            </Badge>
                            <Badge variant="outline">{trip.type}</Badge>
                          </CardTitle>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {trip.country}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedTrip(expandedTrip === trip.id ? null : trip.id)}
                              >
                                {expandedTrip === trip.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </Collapsible>
                        </div>
                      </div>
                      {trip.status === 'Upcoming' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Trip Preparation</span>
                            <span className="text-sm font-medium text-gray-900">{trip.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${trip.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </CardHeader>

                    <Collapsible open={expandedTrip === trip.id}>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Accommodation */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Hotel className="h-4 w-4 mr-2" />
                                Accommodation
                              </h4>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h5 className="font-medium text-gray-900">{trip.accommodation.name}</h5>
                                <p className="text-sm text-gray-600 mt-1">{trip.accommodation.address}</p>
                                <div className="flex items-center mt-2 text-sm text-gray-600">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {trip.accommodation.phone}
                                </div>
                                <div className="flex items-center justify-between mt-3 text-sm">
                                  <span>Check-in: {formatDate(trip.accommodation.checkIn)}</span>
                                  <span>Check-out: {formatDate(trip.accommodation.checkOut)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Emergency Numbers */}
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Emergency Numbers
                              </h4>
                              <div className="space-y-2">
                                {trip.emergencyNumbers.map((contact, idx) => (
                                  <div key={idx} className="flex items-center justify-between bg-red-50 rounded-lg p-3">
                                    <span className="text-sm font-medium text-gray-900">{contact.type}</span>
                                    <span className="text-sm text-red-700 font-mono">{contact.number}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Flights */}
                          {trip.flights.length > 0 && (
                            <div className="mt-6">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Plane className="h-4 w-4 mr-2" />
                                Flight Information
                              </h4>
                              <div className="space-y-3">
                                {trip.flights.map((flight, idx) => (
                                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <Badge variant="outline">{flight.type}</Badge>
                                          <span className="font-medium">{flight.airline} {flight.flight}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                          {flight.from} → {flight.to}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium">{formatDate(flight.date)}</p>
                                        <p className="text-sm text-gray-600 flex items-center">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {flight.time}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Itinerary */}
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Calendar className="h-4 w-4 mr-2" />
                              Itinerary
                            </h4>
                            <div className="space-y-2">
                              {trip.itinerary.map((item, idx) => (
                                <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    {item.day}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{item.activity}</p>
                                    <p className="text-sm text-gray-600">{item.location}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}