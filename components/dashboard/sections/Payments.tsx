'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { StatCard } from '../shared/StatCard';
import { EmptyState } from '../shared/EmptyState';
import { dashboardService } from '@/lib/services/dashboardService';
import type { Payment } from '@/types/dashboard';

export const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    const data = await dashboardService.getPayments();
    setPayments(data);
    setIsLoading(false);
  };

  const filteredPayments = payments.filter(payment =>
    filter === 'all' ? true : payment.status === filter
  );

  const stats = {
    totalEarnings: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    pendingPayments: payments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + parseFloat(p.amount), 0),
    totalTransactions: payments.length,
    completedTransactions: payments.filter(p => p.status === 'completed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mpesa': return '📱';
      case 'cash': return '💵';
      case 'card': return '💳';
      case 'bank_transfer': return '🏦';
      default: return '💰';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-32 animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-24 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Payments</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90">
          Download Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Earnings"
          value={`KES ${stats.totalEarnings.toLocaleString()}`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="green"
        />

        <StatCard
          label="Pending Payments"
          value={`KES ${stats.pendingPayments.toLocaleString()}`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="orange"
        />

        <StatCard
          label="Total Transactions"
          value={stats.totalTransactions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
          color="blue"
        />

        <StatCard
          label="Completed"
          value={stats.completedTransactions}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="primary"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All ({payments.length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            filter === 'completed' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Completed ({payments.filter(p => p.status === 'completed').length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pending ({payments.filter(p => p.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('failed')}
          className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
            filter === 'failed' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Failed ({payments.filter(p => p.status === 'failed').length})
        </button>
      </div>

      {/* Payments List */}
      {filteredPayments.length === 0 ? (
        <EmptyState
          icon="💰"
          title="No payments found"
          description="Your payment transactions will appear here"
        />
      ) : (
        <div className="space-y-3">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} padding="lg" hoverable>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Payment Method Icon */}
                  <div className="text-3xl">
                    {getMethodIcon(payment.method)}
                  </div>

                  {/* Payment Details */}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">
                      {payment.booking.service}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Client: {payment.booking.client}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>📅 {new Date(payment.date).toLocaleDateString()}</span>
                      <span className="capitalize">{payment.method.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Amount & Status */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary mb-2">
                    KES {parseFloat(payment.amount).toLocaleString()}
                  </p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(payment.status)}`}>
                    {payment.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};