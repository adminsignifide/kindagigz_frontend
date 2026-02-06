import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const ProfessionalContactForm = () => {
  return (
    <Card padding="lg">
      <h3 className="font-bold text-gray-900 mb-6">Send a Message</h3>
      <form className="space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-secondary outline-none" 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-secondary outline-none" 
        />
        <textarea 
          placeholder="How can we help?" 
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-secondary outline-none" 
        />
        <Button className="w-full">Send Inquiry</Button>
      </form>
    </Card>
  );
};