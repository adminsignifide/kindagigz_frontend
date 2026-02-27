'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '../shared/EmptyState';
import { dashboardService } from '@/lib/services/dashboardService';
import type { Client } from '@/types/dashboard';

export const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'bookings' | 'spent'>('name');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    const data = await dashboardService.getClients();
    setClients(data);
    setIsLoading(false);
  };

  const filteredClients = clients
    .filter(client => 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'bookings':
          return b.totalBookings - a.totalBookings;
        case 'spent':
          return parseFloat(b.totalSpent) - parseFloat(a.totalSpent);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Clients</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {clients.length} Total Clients
          </span>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search clients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none bg-white"
        >
          <option value="name">Sort by Name</option>
          <option value="bookings">Sort by Bookings</option>
          <option value="spent">Sort by Total Spent</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card padding="lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {clients.length}
            </div>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>
        </Card>
        <Card padding="lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {clients.filter(c => {
                const lastBooking = new Date(c.lastBooking);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return lastBooking > thirtyDaysAgo;
              }).length}
            </div>
            <p className="text-sm text-gray-600">Active This Month</p>
          </div>
        </Card>
        <Card padding="lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {clients.filter(c => c.totalBookings > 1).length}
            </div>
            <p className="text-sm text-gray-600">Repeat Clients</p>
          </div>
        </Card>
      </div>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <EmptyState
          icon="👥"
          title="No clients found"
          description={searchQuery ? "No clients match your search" : "Your clients will appear here"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} padding="lg" hoverable>
              <div className="flex items-start gap-3 mb-4">
                {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{client.email}</p>
                  <p className="text-sm text-gray-600">{client.phone}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Bookings:</span>
                  <span className="font-semibold text-gray-900">{client.totalBookings}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-semibold text-primary">KES {client.totalSpent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last Booking:</span>
                  <span className="font-semibold text-gray-900">
                    {new Date(client.lastBooking).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Client Since:</span>
                  <span className="text-gray-900">
                    {new Date(client.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary/90">
                  Message
                </button>
                <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50">
                  View History
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};