import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Smartphone, AlertTriangle, BarChart3, Star, ArrowRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: Smartphone,
      title: 'Digital Tourist ID',
      description: 'Secure digital identification for seamless travel experiences and quick verification.'
    },
    {
      icon: AlertTriangle,
      title: 'Incident Response',
      description: 'Instant emergency response system with real-time location sharing and alert notifications.'
    },
    {
      icon: BarChart3,
      title: 'Smart Dashboard',
      description: 'Comprehensive analytics and insights for authorities to monitor tourist safety effectively.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Tourist from USA',
      text: 'SafeTour gave me peace of mind during my solo trip to India. The emergency features are incredibly reassuring.',
      rating: 5
    },
    {
      name: 'Mumbai Tourism Authority',
      location: 'Government Official',
      text: 'The analytics dashboard has revolutionized how we monitor and ensure tourist safety in our city.',
      rating: 5
    },
    {
      name: 'Carlos Rodriguez',
      location: 'Tourist from Spain',
      text: 'Easy to use interface and quick response times. Highly recommend for any international traveler.',
      rating: 5
    }
  ];

  const quickLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact Support', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Developer API', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="max-w-md mx-auto lg:max-w-none lg:mx-0">
              <div className="flex items-center mb-6">
                <Shield className="h-12 w-12 text-blue-600 mr-4" />
                <span className="text-3xl font-bold text-gray-900">SafeTour</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Safety, Our Priority
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience worry-free travel with our comprehensive tourist safety platform. 
                Real-time monitoring, instant emergency response, and smart analytics for a safer journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1714594359720-104a2b110a3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZlJTIwY2l0eSUyMHRvdXJpc3RzJTIwdHJhdmVsfGVufDF8fHx8MTc1ODIwODE0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Safe city with tourists"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Safety Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to ensure your safety every step of the way.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of satisfied users who trust SafeTour for their travel safety needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-2xl font-bold">SafeTour</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering safe and secure travel experiences through innovative technology and comprehensive safety solutions.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {quickLinks.slice(3).map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 SafeTour. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Built with ❤️ for safer travels
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}