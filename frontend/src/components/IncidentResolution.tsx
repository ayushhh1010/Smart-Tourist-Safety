import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ArrowUp, 
  Users, 
  MapPin,
  Phone,
  FileText,
  MessageSquare,
  Calendar,
  Shield
} from 'lucide-react';

export function IncidentResolution() {
  const [selectedIncident, setSelectedIncident] = useState<number | null>(1);

  const incidents = [
    {
      id: 1,
      efirId: 'EFR-2024-001',
      tourist: 'Sarah Johnson',
      nationality: 'United States',
      type: 'Theft',
      severity: 'High',
      status: 'Under Investigation',
      reportedAt: '2024-12-15 14:30',
      location: 'Gateway of India, Mumbai',
      description: 'Tourist reported theft of passport and wallet while visiting Gateway of India. CCTV footage being reviewed.',
      assignedOfficer: 'Inspector Sharma',
      progress: 60,
      timeline: [
        {
          stage: 'Detection',
          status: 'completed',
          timestamp: '2024-12-15 14:30',
          description: 'E-FIR filed by tourist through mobile app',
          officer: 'System'
        },
        {
          stage: 'Notification',
          status: 'completed',
          timestamp: '2024-12-15 14:35',
          description: 'Local police station notified, case assigned to Inspector Sharma',
          officer: 'Dispatch'
        },
        {
          stage: 'Initial Response',
          status: 'completed',
          timestamp: '2024-12-15 15:00',
          description: 'Officer arrived at scene, initial statement recorded',
          officer: 'Inspector Sharma'
        },
        {
          stage: 'Investigation',
          status: 'active',
          timestamp: '2024-12-15 15:30',
          description: 'CCTV footage being reviewed, witness statements collected',
          officer: 'Inspector Sharma'
        },
        {
          stage: 'Resolution',
          status: 'pending',
          timestamp: null,
          description: 'Pending completion of investigation',
          officer: 'Inspector Sharma'
        }
      ],
      evidence: [
        { type: 'Photo', name: 'scene_photo_1.jpg', uploadedBy: 'Tourist' },
        { type: 'CCTV', name: 'gateway_cctv_14:25.mp4', uploadedBy: 'Inspector Sharma' },
        { type: 'Statement', name: 'witness_statement_1.pdf', uploadedBy: 'Inspector Sharma' }
      ],
      updates: [
        {
          timestamp: '2024-12-15 16:45',
          officer: 'Inspector Sharma',
          message: 'CCTV footage shows suspect leaving area towards Marine Drive. Coordinating with Marine Drive patrol.',
          type: 'progress'
        },
        {
          timestamp: '2024-12-15 16:00',
          officer: 'Inspector Sharma',
          message: 'Witness identified possible suspect. Following up with detailed description.',
          type: 'progress'
        },
        {
          timestamp: '2024-12-15 15:30',
          officer: 'Inspector Sharma',
          message: 'Initial investigation complete. Moving to evidence collection phase.',
          type: 'status'
        }
      ]
    },
    {
      id: 2,
      efirId: 'EFR-2024-002',
      tourist: 'John Smith',
      nationality: 'United Kingdom',
      type: 'Lost Property',
      severity: 'Medium',
      status: 'Resolved',
      reportedAt: '2024-12-15 12:15',
      location: 'Marine Drive, Mumbai',
      description: 'Tourist lost mobile phone during evening walk at Marine Drive. Device found by local vendor.',
      assignedOfficer: 'Constable Patel',
      progress: 100,
      timeline: [
        {
          stage: 'Detection',
          status: 'completed',
          timestamp: '2024-12-15 12:15',
          description: 'E-FIR filed for lost mobile phone',
          officer: 'System'
        },
        {
          stage: 'Notification',
          status: 'completed',
          timestamp: '2024-12-15 12:20',
          description: 'Case assigned to local beat officer',
          officer: 'Dispatch'
        },
        {
          stage: 'Investigation',
          status: 'completed',
          timestamp: '2024-12-15 13:00',
          description: 'Area search conducted, local vendors contacted',
          officer: 'Constable Patel'
        },
        {
          stage: 'Resolution',
          status: 'completed',
          timestamp: '2024-12-15 14:30',
          description: 'Phone recovered from vendor, returned to tourist',
          officer: 'Constable Patel'
        }
      ],
      evidence: [
        { type: 'Photo', name: 'found_phone.jpg', uploadedBy: 'Constable Patel' },
        { type: 'Receipt', name: 'return_receipt.pdf', uploadedBy: 'Constable Patel' }
      ],
      updates: [
        {
          timestamp: '2024-12-15 14:30',
          officer: 'Constable Patel',
          message: 'Case resolved successfully. Phone returned to tourist with proof of return.',
          type: 'resolution'
        }
      ]
    },
    {
      id: 3,
      efirId: 'EFR-2024-003',
      tourist: 'Maria Garcia',
      nationality: 'Spain',
      type: 'Harassment',  
      severity: 'Critical',
      status: 'Escalated',
      reportedAt: '2024-12-15 09:45',
      location: 'Colaba Market, Mumbai',
      description: 'Tourist reported verbal harassment and following by unknown individuals at Colaba Market.',
      assignedOfficer: 'Inspector Kumar',
      progress: 40,
      timeline: [
        {
          stage: 'Detection',
          status: 'completed',
          timestamp: '2024-12-15 09:45',
          description: 'Emergency SOS activated, harassment reported',
          officer: 'System'
        },
        {
          stage: 'Notification',
          status: 'completed',
          timestamp: '2024-12-15 09:47',
          description: 'Emergency response team dispatched immediately',
          officer: 'Emergency Dispatch'
        },
        {
          stage: 'Escalation',
          status: 'active',
          timestamp: '2024-12-15 10:15',
          description: 'Case escalated to senior inspector due to severity',
          officer: 'Inspector Kumar'
        },
        {
          stage: 'Investigation',
          status: 'pending',
          timestamp: null,
          description: 'Detailed investigation in progress',
          officer: 'Inspector Kumar'
        },
        {
          stage: 'Resolution',
          status: 'pending',
          timestamp: null,
          description: 'Awaiting investigation completion',
          officer: 'Inspector Kumar'
        }
      ],
      evidence: [
        { type: 'Audio', name: 'sos_call_recording.mp3', uploadedBy: 'System' },
        { type: 'Photo', name: 'harassment_evidence.jpg', uploadedBy: 'Tourist' },
        { type: 'Statement', name: 'tourist_statement.pdf', uploadedBy: 'Inspector Kumar' }
      ],
      updates: [
        {
          timestamp: '2024-12-15 11:30',
          officer: 'Inspector Kumar',
          message: 'Case escalated to anti-harassment unit. Additional security measures deployed in area.',
          type: 'escalation'
        },
        {
          timestamp: '2024-12-15 10:15',
          officer: 'Inspector Kumar',
          message: 'Tourist in safe location. Beginning detailed investigation with witness interviews.',
          type: 'status'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Under Investigation':
        return 'bg-orange-100 text-orange-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Escalated':
        return 'bg-red-100 text-red-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const getStageStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-600 text-white';
      case 'active':
        return 'bg-blue-600 text-white';
      case 'pending':
        return 'bg-gray-300 text-gray-600';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  const selectedIncidentData = incidents.find(inc => inc.id === selectedIncident);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Incident Resolution Workflow</h1>
        <p className="text-gray-600 mt-1">Track and manage incident resolution from detection to closure</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Incident List */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Active Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-2">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedIncident === incident.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                    }`}
                    onClick={() => setSelectedIncident(incident.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm text-gray-900">{incident.efirId}</span>
                      <Badge className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{incident.tourist}</p>
                    <p className="text-xs text-gray-500">{incident.type}</p>
                    <div className="mt-2">
                      <Badge className={getStatusColor(incident.status)} size="sm">
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incident Details */}
        <div className="lg:col-span-3">
          {selectedIncidentData && (
            <div className="space-y-6">
              {/* Incident Overview */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      {selectedIncidentData.efirId} - {selectedIncidentData.type}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Add Update
                      </Button>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Resolved
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Tourist Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{selectedIncidentData.tourist} ({selectedIncidentData.nationality})</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{selectedIncidentData.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Reported: {selectedIncidentData.reportedAt}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <span>Assigned: {selectedIncidentData.assignedOfficer}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Case Status</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Badge className={getStatusColor(selectedIncidentData.status)}>
                              {selectedIncidentData.status}
                            </Badge>
                            <Badge className={getSeverityColor(selectedIncidentData.severity)}>
                              {selectedIncidentData.severity} Priority
                            </Badge>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-600">Progress</span>
                              <span className="text-sm font-medium text-gray-900">{selectedIncidentData.progress}%</span>
                            </div>
                            <Progress value={selectedIncidentData.progress} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Incident Description</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded p-3">
                        {selectedIncidentData.description}
                      </p>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Evidence ({selectedIncidentData.evidence.length})</h4>
                        <div className="space-y-2">
                          {selectedIncidentData.evidence.map((evidence, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 rounded p-2">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium">{evidence.name}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                by {evidence.uploadedBy}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resolution Workflow */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Resolution Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                    <div className="space-y-6">
                      {selectedIncidentData.timeline.map((stage, index) => (
                        <div key={index} className="relative flex items-start">
                          <div className={`absolute left-4 w-4 h-4 rounded-full border-2 border-white ${getStageStatus(stage.status)}`}></div>
                          <div className="ml-12 flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                              <div className="flex items-center space-x-2">
                                {stage.status === 'completed' && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                {stage.status === 'active' && (
                                  <Clock className="h-4 w-4 text-blue-600" />
                                )}
                                {stage.timestamp && (
                                  <span className="text-sm text-gray-500">{stage.timestamp}</span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stage.description}</p>
                            <p className="text-xs text-gray-500">Officer: {stage.officer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Updates */}
              <Card className="shadow-lg border-0">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Updates</CardTitle>
                  <Button variant="outline" size="sm">
                    <ArrowUp className="h-4 w-4 mr-2" />
                    Escalate Further
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedIncidentData.updates.map((update, index) => (
                      <div key={index} className="border-l-2 border-blue-400 pl-4 py-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm text-gray-900">{update.officer}</span>
                          <span className="text-xs text-gray-500">{update.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-600">{update.message}</p>
                        <Badge variant="outline" className="mt-1" size="sm">
                          {update.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <Textarea
                      placeholder="Add a new update..."
                      rows={3}
                      className="mb-3"
                    />
                    <div className="flex justify-end">
                      <Button size="sm">
                        Add Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}