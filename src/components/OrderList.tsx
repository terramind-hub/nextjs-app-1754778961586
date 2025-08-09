'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
}

interface OrderListProps {
  orders: Order[];
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  shipped: 'bg-purple-100 text-purple-800 border-purple-200',
  delivered: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrderList({ orders }: OrderListProps) {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">
          When you place your first order, it will appear here.
        </p>
        <a
          href="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const isExpanded = expandedOrders.has(order.id);
        
        return (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
                      statusColors[order.status]
                    )}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-900">
                      {formatCurrency(order.total)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleOrderExpansion(order.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
                  >
                    <svg
                      className={cn(
                        'w-5 h-5 transform transition-transform',
                        isExpanded ? 'rotate-180' : ''
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details (Expandable) */}
            {isExpanded && (
              <div className="p-6 space-y-6">
                {/* Order Items */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h5>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Tracking Information */}
                {order.trackingNumber && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Tracking</h4>
                    <p className="text-sm text-gray-600">
                      Tracking Number: <span className="font-mono">{order.trackingNumber}</span>
                    </p>
                  </div>
                )}

                {/* Order Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  {order.status === 'delivered' && (
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Reorder
                    </button>
                  )}
                  {(order.status === 'shipped' || order.status === 'delivered') && order.trackingNumber && (
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      Track Package
                    </button>
                  )}
                  {order.status === 'pending' && (
                    <button className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Cancel Order
                    </button>
                  )}
                  <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    View Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}