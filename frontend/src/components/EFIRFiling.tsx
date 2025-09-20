import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
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
    // Personal Info
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',
    passportNumber: 'US123456789',
    currentAddress: 'The Taj Mahal Palace, Mumbai',
    
    // Incident Details
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    suspectDescription: '',
    witnessDetails: '',
    policeStation: '',
    
    // Evidence
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

  const getStepIndex = (step: Step) => {
    return steps.findIndex(s => s.id === step);
  };

  const getProgressPercentage = () => {
    return ((getStepIndex(currentStep) + 1) / steps.length) * 100;
  };

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
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address in India *</Label>
              <Textarea
                id="currentAddress"
                value={formData.currentAddress}
                onChange={(e) => handleInputChange('currentAddress', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'incident':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="incidentType">Type of Incident *</Label>
                <Select value={formData.incidentType} onValueChange={(value) => handleInputChange('incidentType', value)}>
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
                <Select value={formData.policeStation} onValueChange={(value) => handleInputChange('policeStation', value)}>
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
                <Input
                  id="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incidentTime">Time of Incident *</Label>
                <Input
                  id="incidentTime"
                  type="time"
                  value={formData.incidentTime}
                  onChange={(e) => handleInputChange('incidentTime', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="incidentLocation">Location of Incident *</Label>
              <Input
                id="incidentLocation"
                placeholder="Provide detailed location (street, landmark, area)"
                value={formData.incidentLocation}
                onChange={(e) => handleInputChange('incidentLocation', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="incidentDescription">Detailed Description of Incident *</Label>
              <Textarea
                id="incidentDescription"
                placeholder="Describe what happened in detail..."
                value={formData.incidentDescription}
                onChange={(e) => handleInputChange('incidentDescription', e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="suspectDescription">Suspect Description (if applicable)</Label>
              <Textarea
                id="suspectDescription"
                placeholder="Physical description, clothing, any identifying features..."
                value={formData.suspectDescription}
                onChange={(e) => handleInputChange('suspectDescription', e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="witnessDetails">Witness Details (if any)</Label>
              <Textarea
                id="witnessDetails"
                placeholder="Names, contact information of witnesses..."
                value={formData.witnessDetails}
                onChange={(e) => handleInputChange('witnessDetails', e.target.value)}
                rows={3}
              />
            </div>
          </div>
        );

      case 'evidence':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Supporting Evidence</h3>
              <p className="text-gray-600">
                Upload photos, documents, or any other evidence related to the incident
              </p>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <div className="mb-4">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</p>
                <p className="text-sm text-gray-600">Supported formats: JPG, PNG, PDF, DOC (Max 10MB each)</p>
              </div>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => handleFileUpload('incident_photo_1.jpg')}>
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button variant="outline" onClick={() => handleFileUpload('evidence_document.pdf')}>
                  <Paperclip className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>

            {/* Uploaded Files */}
            {formData.uploadedFiles.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Uploaded Files ({formData.uploadedFiles.length})</h4>
                <div className="space-y-2">
                  {formData.uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="font-medium text-gray-900">{file}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Any additional information you'd like to provide..."
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Review Your E-FIR</h3>
              <p className="text-gray-600">
                Please review all information before submitting your E-FIR
              </p>
            </div>

            {/* Review Sections */}
            <div className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><strong>Name:</strong> {formData.fullName}</div>
                    <div><strong>Nationality:</strong> {formData.nationality}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Phone:</strong> {formData.phone}</div>
                    <div><strong>Passport:</strong> {formData.passportNumber}</div>
                  </div>
                  <div><strong>Address:</strong> {formData.currentAddress}</div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Incident Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><strong>Type:</strong> {formData.incidentType}</div>
                    <div><strong>Date:</strong> {formData.incidentDate}</div>
                    <div><strong>Time:</strong> {formData.incidentTime}</div>
                    <div><strong>Police Station:</strong> {formData.policeStation}</div>
                  </div>
                  <div><strong>Location:</strong> {formData.incidentLocation}</div>
                  <div><strong>Description:</strong> {formData.incidentDescription}</div>
                  {formData.suspectDescription && <div><strong>Suspect:</strong> {formData.suspectDescription}</div>}
                  {formData.witnessDetails && <div><strong>Witnesses:</strong> {formData.witnessDetails}</div>}
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Evidence & Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div><strong>Uploaded Files:</strong> {formData.uploadedFiles.length} files</div>
                  {formData.uploadedFiles.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {formData.uploadedFiles.map((file, index) => (
                        <li key={index}>{file}</li>
                      ))}
                    </ul>
                  )}
                  {formData.additionalNotes && (
                    <div><strong>Additional Notes:</strong> {formData.additionalNotes}</div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Important Information</p>
                  <p className="text-blue-800">
                    By submitting this E-FIR, you confirm that all information provided is true and accurate. 
                    You will receive a confirmation email with your E-FIR number for future reference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">File E-FIR</h1>
        <p className="text-gray-600 mt-1">Submit an electronic First Information Report online</p>
      </div>

      {/* Progress Tracker */}
      <Card className="shadow-lg border-0 mb-8">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {getStepIndex(currentStep) + 1} of {steps.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(getProgressPercentage())}% Complete
              </span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = getStepIndex(currentStep) > index;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-blue-600 bg-blue-600 text-white' 
                      : isCompleted 
                        ? 'border-green-600 bg-green-600 text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`ml-6 w-12 h-0.5 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="shadow-lg border-0 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            {React.createElement(steps.find(s => s.id === currentStep)?.icon || FileText, { 
              className: "h-5 w-5 mr-2" 
            })}
            {steps.find(s => s.id === currentStep)?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pb-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 'personal'}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentStep === 'review' ? (
          <Button className="bg-green-600 hover:bg-green-700">
            <Send className="h-4 w-4 mr-2" />
            Submit E-FIR
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}