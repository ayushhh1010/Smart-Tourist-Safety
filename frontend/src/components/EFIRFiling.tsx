import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Textarea } from 'src/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { Progress } from 'src/components/ui/progress';
import { 
  FileText, 
  User, 
  AlertTriangle, 
  Upload, 
  CheckCircle, 
  Camera,
  Paperclip,
  ArrowLeft,
  ArrowRight,
  Send
} from 'lucide-react';

type Step = 'personal' | 'incident' | 'evidence' | 'review';

export function EFIRFiling() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [formData, setFormData] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',
    passportNumber: 'US123456789',
    currentAddress: 'The Taj Mahal Palace, Mumbai',
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    suspectDescription: '',
    witnessDetails: '',
    policeStation: '',
    uploadedFiles: [] as string[],
    additionalNotes: ''
  });

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'incident', title: 'Incident Details', icon: AlertTriangle },
    { id: 'evidence', title: 'Upload Evidence', icon: Upload },
    { id: 'review', title: 'Review & Submit', icon: CheckCircle }
  ];

  const incidentTypes = [
    'Theft/Robbery',
    'Assault',
    'Fraud/Scam',
    'Lost Property',
    'Harassment',
    'Medical Emergency',
    'Traffic Accident',
    'Other'
  ];

  const policeStations = [
    'Colaba Police Station',
    'Marine Drive Police Station',
    'Gateway Police Station',
    'Bandra Police Station',
    'Andheri Police Station'
  ];

  const getStepIndex = (step: Step) => steps.findIndex(s => s.id === step);
  const getProgressPercentage = () => ((getStepIndex(currentStep) + 1) / steps.length) * 100;

  const nextStep = () => {
    const currentIndex = getStepIndex(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id as Step);
    }
  };

  const prevStep = () => {
    const currentIndex = getStepIndex(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id as Step);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (fileName: string) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, fileName]
    }));
  };

  const removeFile = (fileName: string) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(f => f !== fileName)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-6">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input id="nationality" value={formData.nationality} onChange={(e) => handleInputChange('nationality', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input id="passportNumber" value={formData.passportNumber} onChange={(e) => handleInputChange('passportNumber', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address in India *</Label>
              <Textarea id="currentAddress" rows={3} value={formData.currentAddress} onChange={(e) => handleInputChange('currentAddress', e.target.value)} />
            </div>
          </div>
        );

      case 'incident':
        return (
          <div className="space-y-6">
            {/* Incident Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="incidentType">Type of Incident *</Label>
                <Select value={formData.incidentType} onValueChange={(value: string) => handleInputChange('incidentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    {incidentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="policeStation">Preferred Police Station</Label>
                <Select value={formData.policeStation} onValueChange={(value: string) => handleInputChange('policeStation', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select police station" />
                  </SelectTrigger>
                  <SelectContent>
                    {policeStations.map((station) => (
                      <SelectItem key={station} value={station}>{station}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="incidentDate">Date of Incident *</Label>
                <Input id="incidentDate" type="date" value={formData.incidentDate} onChange={(e) => handleInputChange('incidentDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incidentTime">Time of Incident *</Label>
                <Input id="incidentTime" type="time" value={formData.incidentTime} onChange={(e) => handleInputChange('incidentTime', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="incidentLocation">Location of Incident *</Label>
              <Input id="incidentLocation" placeholder="Provide detailed location (street, landmark, area)" value={formData.incidentLocation} onChange={(e) => handleInputChange('incidentLocation', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="incidentDescription">Detailed Description *</Label>
              <Textarea id="incidentDescription" rows={5} value={formData.incidentDescription} onChange={(e) => handleInputChange('incidentDescription', e.target.value)} />
            </div>
          </div>
        );

      case 'evidence':
        return (
          <div className="space-y-6">
            {/* Evidence Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="font-medium text-gray-900">Drop files here or click to upload</p>
              <div className="flex justify-center mt-4 space-x-4">
                <Button variant="outline" onClick={() => handleFileUpload('incident_photo.jpg')}>
                  <Camera className="h-4 w-4 mr-2" /> Take Photo
                </Button>
                <Button variant="outline" onClick={() => handleFileUpload('evidence_document.pdf')}>
                  <Paperclip className="h-4 w-4 mr-2" /> Choose Files
                </Button>
              </div>
            </div>

            {formData.uploadedFiles.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
                <ul className="space-y-2">
                  {formData.uploadedFiles.map((file, i) => (
                    <li key={i} className="flex justify-between bg-gray-50 p-2 rounded">
                      {file}
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file)} className="text-red-600">Remove</Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'review':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review & Submit</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Progress */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <Progress value={getProgressPercentage()} />
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>{steps.find(s => s.id === currentStep)?.title}</CardTitle>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button onClick={prevStep} disabled={currentStep === 'personal'}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        {currentStep === 'review' ? (
          <Button className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4 mr-2" /> Submit
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
