// ============================================
// SKILLS BOOST PAGE
// ============================================

import React from 'react';
import { Navbar } from '@/components/layout/Navbar/Navbar';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const skillCategories = [
  {
    category: 'Technical Skills',
    icon: '💻',
    color: '#3B3B6B',
    courses: [
      {
        title: 'Basic Plumbing Certification',
        duration: '4 weeks',
        level: 'Beginner',
        price: 'KES 15,000',
        description: 'Learn fundamental plumbing skills including pipe fitting, repairs, and installations.',
      },
      {
        title: 'Electrical Wiring Basics',
        duration: '6 weeks',
        level: 'Beginner',
        price: 'KES 20,000',
        description: 'Master basic electrical concepts, wiring techniques, and safety procedures.',
      },
      {
        title: 'Carpentry Fundamentals',
        duration: '8 weeks',
        level: 'Beginner',
        price: 'KES 18,000',
        description: 'Develop woodworking skills for furniture making, repairs, and installations.',
      },
    ],
  },
  {
    category: 'Business Skills',
    icon: '📊',
    color: '#FBD430',
    courses: [
      {
        title: 'Freelance Business Management',
        duration: '3 weeks',
        level: 'All Levels',
        price: 'KES 8,000',
        description: 'Learn how to manage clients, pricing, invoicing, and grow your freelance business.',
      },
      {
        title: 'Customer Service Excellence',
        duration: '2 weeks',
        level: 'All Levels',
        price: 'KES 5,000',
        description: 'Master communication skills and customer satisfaction techniques.',
      },
      {
        title: 'Digital Marketing for Professionals',
        duration: '4 weeks',
        level: 'Intermediate',
        price: 'KES 12,000',
        description: 'Promote your services online using social media and digital tools.',
      },
    ],
  },
  {
    category: 'Safety & Compliance',
    icon: '🦺',
    color: '#4F4F7C',
    courses: [
      {
        title: 'Workplace Safety Certification',
        duration: '1 week',
        level: 'All Levels',
        price: 'KES 3,000',
        description: 'Essential safety protocols for construction and service professionals.',
      },
      {
        title: 'First Aid & Emergency Response',
        duration: '2 weeks',
        level: 'All Levels',
        price: 'KES 6,000',
        description: 'Learn life-saving first aid techniques for workplace emergencies.',
      },
    ],
  },
  {
    category: 'Creative Skills',
    icon: '🎨',
    color: '#E8B4B8',
    courses: [
      {
        title: 'Interior Design Basics',
        duration: '5 weeks',
        level: 'Beginner',
        price: 'KES 15,000',
        description: 'Understanding color theory, space planning, and design principles.',
      },
      {
        title: 'Professional Painting Techniques',
        duration: '3 weeks',
        level: 'Intermediate',
        price: 'KES 10,000',
        description: 'Advanced painting methods including textures and finishes.',
      },
    ],
  },
];

export default function SkillsBoostPage() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Content Container */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full mb-4">
              <span className="text-2xl mr-2">🚀</span>
              <span className="text-sm font-semibold text-primary">Level Up Your Skills</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Skills Boost Training
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Invest in yourself with professional training courses. Gain certifications, 
              learn new skills, and increase your earning potential.
            </p>
          </div>

          {/* Benefits Banner */}
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            <Card variant="gray" className="text-center">
              <div className="text-3xl mb-2">🎓</div>
              <div className="font-bold text-primary mb-1">Certified Courses</div>
              <div className="text-sm text-gray-600">Industry-recognized certificates</div>
            </Card>
            <Card variant="gray" className="text-center">
              <div className="text-3xl mb-2">👨‍🏫</div>
              <div className="font-bold text-primary mb-1">Expert Instructors</div>
              <div className="text-sm text-gray-600">Learn from experienced professionals</div>
            </Card>
            <Card variant="gray" className="text-center">
              <div className="text-3xl mb-2">💼</div>
              <div className="font-bold text-primary mb-1">Job Ready</div>
              <div className="text-sm text-gray-600">Practical, hands-on training</div>
            </Card>
          </div>

          {/* Course Categories */}
          <div className="space-y-10">
            {skillCategories.map((category) => (
              <div key={category.category}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-primary">{category.category}</h2>
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.courses.map((course, idx) => (
                    <Card key={idx} variant="elevated" hoverable className="flex flex-col h-full">
                      <div className="flex-1">
                        <CardTitle className="mb-3">{course.title}</CardTitle>
                        <CardDescription className="mb-4">{course.description}</CardDescription>
                        
                        {/* Course Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>⏱️</span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>📊</span>
                            <span>{course.level}</span>
                          </div>
                          <div className="flex items-center gap-2 font-semibold text-primary">
                            <span>💰</span>
                            <span>{course.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Enroll Button */}
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <Button variant="primary" size="sm" className="w-full">
                          Enroll Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Card variant="purple-border" className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <CardTitle variant="light" className="text-2xl mb-3">
                Ready to Boost Your Skills?
              </CardTitle>
              <CardDescription variant="light" className="mb-6 text-base">
                Join thousands of professionals who have advanced their careers through our training programs.
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.SIGNUP}>
                  <Button variant="primary" size="lg">
                    Create Account
                  </Button>
                </Link>
                <Button variant="tertiary" size="lg">
                  View Course Catalog
                </Button>
              </div>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <Card variant="default">
                <CardTitle className="text-lg mb-2">Do I get a certificate?</CardTitle>
                <CardDescription>
                  Yes! All courses include a certificate of completion that you can add to your KindaGigz profile.
                </CardDescription>
              </Card>
              <Card variant="default">
                <CardTitle className="text-lg mb-2">Are courses online or in-person?</CardTitle>
                <CardDescription>
                  We offer both! Most technical courses include hands-on in-person sessions, while business courses are available online.
                </CardDescription>
              </Card>
              <Card variant="default">
                <CardTitle className="text-lg mb-2">Can I get financial assistance?</CardTitle>
                <CardDescription>
                  Yes, we offer payment plans and occasional scholarships for qualifying professionals. Contact support for details.
                </CardDescription>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ROUTES = { SIGNUP: '/signup' }; // Import from your routes file