'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

export default function CartSummary() {
  const { items, getCartTotal, getCartItemCount } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax rate
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const itemCount = getCartItemCount();

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className={cn(shipping === 0 && "text-green-600")}>
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <hr className="my-2" />
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {shipping > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add ${(50 - subtotal).toFixed(2)} more for free shipping
        </p>
      )}

      <Button 
        className="w-full" 
        size="lg"
        onClick={() => window.location.href = '/checkout'}
      >
        Proceed to Checkout
      </Button>
      
      <p className="text-xs text-gray-500 text-center">
        Secure checkout with SSL encryption
      </p>
    </div>
  );
}