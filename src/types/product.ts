// Product types for ecommerce application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categoryId: string;
  brand?: string;
  sku: string;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  isOnSale: boolean;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
  isActive: boolean;
  sortOrder: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  addedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  type: 'color' | 'size' | 'material' | 'style';
  priceModifier?: number;
  stockModifier?: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
  variant?: ProductVariant;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
  provider: string;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  preferences: UserPreferences;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
  currency: string;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  tags?: string[];
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: ProductFilters;
  suggestions?: string[];
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number;
  usageCount: number;
  isActive: boolean;
  startsAt: string;
  expiresAt: string;
  applicableCategories?: string[];
  applicableProducts?: string[];
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  addedAt: string;
}

export interface ProductAnalytics {
  productId: string;
  views: number;
  addToCart: number;
  purchases: number;
  conversionRate: number;
  averageRating: number;
  totalReviews: number;
  revenue: number;
  period: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form types
export interface CheckoutFormData {
  email: string;
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  paymentMethod: string;
  savePaymentMethod: boolean;
  notes?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  brand?: string;
  sku: string;
  stock: number;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  images: File[];
  isOnSale: boolean;
  isFeatured: boolean;
  isNew: boolean;
}