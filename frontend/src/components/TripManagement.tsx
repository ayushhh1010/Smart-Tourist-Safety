import React, { useState, useEffect } from "react";
import { Card, CardContent } from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Calendar, MapPin, Clock, Phone } from "lucide-react";

export interface Destination {
  id: number;
  place: string;
  activity: string;
  time: string;
  duration: string;
}

export interface Stay {
  id: number;
  hotelName: string;
  address: string;
  checkIn: string;
  checkOut: string;
}

export interface Trip {
  id: number;
  startLocation: string;
  startDate: string;
  endDate: string;
  monitoringStart: string;
  monitoringEnd: string;
  destinations: Destination[];
  stays: Stay[];
  emergencyContact: string;
}

interface Activity {
  id: number;
  action: string;
  time: string;
}

export function TripManagement() {
  const [itineraries, setItineraries] = useState<Trip[]>([]);

  // form state
  const [startLocation, setStartLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [monitoringStart, setMonitoringStart] = useState("");
  const [monitoringEnd, setMonitoringEnd] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // dynamic lists
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [stays, setStays] = useState<Stay[]>([]);

  // ✅ load from localStorage safely
  useEffect(() => {
    const saved = localStorage.getItem("trips"); // unified key
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Trip[];
        // filter broken trips
        const valid = parsed.filter(
          (t) => t.startLocation && t.startDate && t.endDate
        );
        setItineraries(valid);
      } catch {
        localStorage.removeItem("trips");
      }
    }
  }, []);

  // ✅ persist itineraries
  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(itineraries)); // unified key
  }, [itineraries]);

  const logActivity = (action: string) => {
    const newActivity: Activity = {
      id: Date.now(),
      action,
      time: new Date().toLocaleString(),
    };
    const saved = localStorage.getItem("activity");
    let list: Activity[] = saved ? JSON.parse(saved) : [];
    list.unshift(newActivity);
    if (list.length > 10) list.pop();
    localStorage.setItem("activity", JSON.stringify(list));
  };

  const handleAddDestination = () => {
    setDestinations((prev) => [
      ...prev,
      { id: Date.now(), place: "", activity: "", time: "", duration: "" },
    ]);
  };

  const handleUpdateDestination = (
    id: number,
    field: keyof Destination,
    value: string
  ) => {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  };

  const handleAddStay = () => {
    setStays((prev) => [
      ...prev,
      { id: Date.now(), hotelName: "", address: "", checkIn: "", checkOut: "" },
    ]);
  };

  const handleUpdateStay = (id: number, field: keyof Stay, value: string) => {
    setStays((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddItinerary = () => {
    if (!startLocation.trim() || !startDate || !endDate) {
      alert("⚠️ Please fill Starting Location, Start Date, and End Date");
      return;
    }

    const newItinerary: Trip = {
      id: Date.now(),
      startLocation: startLocation.trim(),
      startDate,
      endDate,
      monitoringStart,
      monitoringEnd,
      destinations,
      stays,
      emergencyContact,
    };

    setItineraries((prev) => [...prev, newItinerary]);
    logActivity(`Added itinerary from ${startLocation}`);

    // reset form
    setStartLocation("");
    setStartDate("");
    setEndDate("");
    setMonitoringStart("");
    setMonitoringEnd("");
    setEmergencyContact("");
    setDestinations([]);
    setStays([]);
  };

  const handleRemoveItinerary = (id: number, location: string) => {
    setItineraries((prev) => prev.filter((i) => i.id !== id));
    logActivity(`Removed itinerary from ${location}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Trip Management</h1>
        <p className="text-gray-600">Plan your travel itinerary in detail.</p>
      </div>

      {/* Form */}
      <Card className="mb-6 shadow-md border-0">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <Input
              placeholder="Starting Location"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-1">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center flex-1">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Monitoring window */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center flex-1">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <Input
                type="time"
                value={monitoringStart}
                onChange={(e) => setMonitoringStart(e.target.value)}
                placeholder="Monitoring start"
              />
            </div>
            <div className="flex items-center flex-1">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <Input
                type="time"
                value={monitoringEnd}
                onChange={(e) => setMonitoringEnd(e.target.value)}
                placeholder="Monitoring end"
              />
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h2 className="font-semibold mb-2">Destinations</h2>
            {destinations.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2"
              >
                <Input
                  placeholder="Place"
                  value={d.place}
                  onChange={(e) =>
                    handleUpdateDestination(d.id, "place", e.target.value)
                  }
                />
                <Input
                  placeholder="Activity"
                  value={d.activity}
                  onChange={(e) =>
                    handleUpdateDestination(d.id, "activity", e.target.value)
                  }
                />
                <Input
                  type="time"
                  value={d.time}
                  onChange={(e) =>
                    handleUpdateDestination(d.id, "time", e.target.value)
                  }
                />
                <Input
                  placeholder="Duration"
                  value={d.duration}
                  onChange={(e) =>
                    handleUpdateDestination(d.id, "duration", e.target.value)
                  }
                />
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddDestination}>
              + Add Destination
            </Button>
          </div>

          {/* Stays */}
          <div>
            <h2 className="font-semibold mb-2">Stays</h2>
            {stays.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-2"
              >
                <Input
                  placeholder="Hotel Name"
                  value={s.hotelName}
                  onChange={(e) =>
                    handleUpdateStay(s.id, "hotelName", e.target.value)
                  }
                />
                <Input
                  placeholder="Address"
                  value={s.address}
                  onChange={(e) =>
                    handleUpdateStay(s.id, "address", e.target.value)
                  }
                />
                <Input
                  type="date"
                  value={s.checkIn}
                  onChange={(e) =>
                    handleUpdateStay(s.id, "checkIn", e.target.value)
                  }
                />
                <Input
                  type="date"
                  value={s.checkOut}
                  onChange={(e) =>
                    handleUpdateStay(s.id, "checkOut", e.target.value)
                  }
                />
              </div>
            ))}
            <Button variant="secondary" onClick={handleAddStay}>
              + Add Stay
            </Button>
          </div>

          {/* Emergency Contact */}
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-blue-600 mr-2" />
            <Input
              placeholder="Emergency Contact"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>

          <Button onClick={handleAddItinerary} className="w-full sm:w-auto">
            Save Itinerary
          </Button>
        </CardContent>
      </Card>

      {/* List of itineraries */}
      {itineraries.length === 0 ? (
        <p className="text-gray-600">No itineraries planned yet.</p>
      ) : (
        <div className="space-y-4">
          {itineraries.map((i) => (
            <Card key={i.id} className="shadow-md border-0">
              <CardContent className="p-6 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {i.startLocation} ({i.startDate} → {i.endDate})
                  </h2>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveItinerary(i.id, i.startLocation)}
                  >
                    Remove
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Monitoring: {i.monitoringStart || "N/A"} →{" "}
                  {i.monitoringEnd || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Emergency Contact: {i.emergencyContact || "Not provided"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
