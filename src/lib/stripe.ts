import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Client-side Stripe instance
let stripePromise: Promise<any> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Create payment intent for checkout
export async function createPaymentIntent(amount: number, currency: string = 'usd') {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe secret key is not configured');
    }

    if (amount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to create payment intent');
  }
}

// Confirm payment on server side
export async function confirmPayment(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw new Error('Failed to confirm payment');
  }
}

// Create customer
export async function createCustomer(email: string, name?: string) {
  try {
    const customer = await stripe.customers.create({
      email,
      name,
    });
    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

// Format amount for display
export function formatAmount(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount);
}

// Validate Stripe configuration
export function validateStripeConfig(): boolean {
  const hasSecretKey = !!process.env.STRIPE_SECRET_KEY;
  const hasPublishableKey = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!hasSecretKey) {
    console.error('STRIPE_SECRET_KEY environment variable is not set');
  }
  
  if (!hasPublishableKey) {
    console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable is not set');
  }
  
  return hasSecretKey && hasPublishableKey;
}