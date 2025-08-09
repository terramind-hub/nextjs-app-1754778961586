'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

export default function CartItems() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
        >
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="h-16 w-16 rounded-md object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            {item.variant && (
              <p className="text-xs text-gray-400">Variant: {item.variant}</p>
            )}
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              disabled={item.quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="text-sm font-medium w-8 text-center">
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= 10} // Max quantity limit
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Item Total */}
          <div className="text-sm font-medium text-gray-900 w-20 text-right">
            ${(item.price * item.quantity).toFixed(2)}
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {/* Cart Summary */}
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-900">
            Total ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
          </span>
          <span className="text-lg font-bold text-gray-900">
            ${getCartTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}