import { Product, Category, Order, User } from '@/types/product';

// Sample categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/images/categories/electronics.jpg'
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for all occasions',
    image: '/images/categories/clothing.jpg'
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: '/images/categories/home-garden.jpg'
  },
  {
    id: '4',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Gear for active lifestyles',
    image: '/images/categories/sports.jpg'
  },
  {
    id: '5',
    name: 'Books',
    slug: 'books',
    description: 'Books for every reader',
    image: '/images/categories/books.jpg'
  }
];

// Sample products
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    originalPrice: 249.99,
    images: [
      '/images/products/headphones-1.jpg',
      '/images/products/headphones-2.jpg',
      '/images/products/headphones-3.jpg'
    ],
    category: 'Electronics',
    categoryId: '1',
    inStock: true,
    stockQuantity: 50,
    rating: 4.5,
    reviewCount: 128,
    tags: ['wireless', 'bluetooth', 'noise-cancelling', 'premium'],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Quick charge (5 min = 3 hours)',
      'Premium comfort design',
      'High-quality audio drivers'
    ],
    specifications: {
      'Battery Life': '30 hours',
      'Charging Time': '2 hours',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.0',
      'Driver Size': '40mm'
    }
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    slug: 'smart-fitness-watch',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smartphone integration.',
    price: 299.99,
    originalPrice: 399.99,
    images: [
      '/images/products/watch-1.jpg',
      '/images/products/watch-2.jpg',
      '/images/products/watch-3.jpg'
    ],
    category: 'Electronics',
    categoryId: '1',
    inStock: true,
    stockQuantity: 25,
    rating: 4.7,
    reviewCount: 89,
    tags: ['fitness', 'smartwatch', 'gps', 'health'],
    features: [
      'Heart rate monitoring',
      'Built-in GPS',
      'Water resistant (50m)',
      '7-day battery life',
      'Sleep tracking'
    ],
    specifications: {
      'Display': '1.4" AMOLED',
      'Battery Life': '7 days',
      'Water Resistance': '5ATM',
      'Sensors': 'Heart rate, GPS, Accelerometer',
      'Compatibility': 'iOS & Android'
    }
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-t-shirt',
    description: 'Soft, comfortable, and durable cotton t-shirt perfect for everyday wear.',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      '/images/products/tshirt-1.jpg',
      '/images/products/tshirt-2.jpg',
      '/images/products/tshirt-3.jpg'
    ],
    category: 'Clothing',
    categoryId: '2',
    inStock: true,
    stockQuantity: 100,
    rating: 4.3,
    reviewCount: 245,
    tags: ['cotton', 'casual', 'comfortable', 'basic'],
    features: [
      '100% organic cotton',
      'Pre-shrunk fabric',
      'Reinforced seams',
      'Available in multiple colors',
      'Machine washable'
    ],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Care': 'Machine wash cold',
      'Origin': 'Made in USA',
      'Sizes': 'XS-XXL'
    }
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Professional ergonomic chair with lumbar support and adjustable features for all-day comfort.',
    price: 449.99,
    originalPrice: 599.99,
    images: [
      '/images/products/chair-1.jpg',
      '/images/products/chair-2.jpg',
      '/images/products/chair-3.jpg'
    ],
    category: 'Home & Garden',
    categoryId: '3',
    inStock: true,
    stockQuantity: 15,
    rating: 4.6,
    reviewCount: 67,
    tags: ['office', 'ergonomic', 'adjustable', 'comfort'],
    features: [
      'Adjustable lumbar support',
      'Height adjustable',
      'Breathable mesh back',
      '360-degree swivel',
      'Weight capacity: 300lbs'
    ],
    specifications: {
      'Dimensions': '26" W x 26" D x 40-44" H',
      'Weight Capacity': '300 lbs',
      'Material': 'Mesh and fabric',
      'Warranty': '5 years',
      'Assembly': 'Required'
    }
  },
  {
    id: '5',
    name: 'Professional Running Shoes',
    slug: 'professional-running-shoes',
    description: 'High-performance running shoes with advanced cushioning and breathable design.',
    price: 129.99,
    originalPrice: 159.99,
    images: [
      '/images/products/shoes-1.jpg',
      '/images/products/shoes-2.jpg',
      '/images/products/shoes-3.jpg'
    ],
    category: 'Sports & Outdoors',
    categoryId: '4',
    inStock: true,
    stockQuantity: 75,
    rating: 4.4,
    reviewCount: 156,
    tags: ['running', 'athletic', 'breathable', 'cushioned'],
    features: [
      'Advanced cushioning system',
      'Breathable mesh upper',
      'Durable rubber outsole',
      'Lightweight design',
      'Arch support'
    ],
    specifications: {
      'Weight': '10.5 oz',
      'Drop': '10mm',
      'Upper': 'Engineered mesh',
      'Midsole': 'EVA foam',
      'Outsole': 'Rubber'
    }
  },
  {
    id: '6',
    name: 'The Complete Guide to Web Development',
    slug: 'complete-guide-web-development',
    description: 'Comprehensive guide covering modern web development technologies and best practices.',
    price: 49.99,
    originalPrice: 69.99,
    images: [
      '/images/products/book-1.jpg',
      '/images/products/book-2.jpg',
      '/images/products/book-3.jpg'
    ],
    category: 'Books',
    categoryId: '5',
    inStock: true,
    stockQuantity: 200,
    rating: 4.8,
    reviewCount: 312,
    tags: ['programming', 'web development', 'technology', 'education'],
    features: [
      '800+ pages of content',
      'Covers HTML, CSS, JavaScript',
      'React and Node.js chapters',
      'Practical projects included',
      'Updated for 2024'
    ],
    specifications: {
      'Pages': '856',
      'Publisher': 'Tech Books Publishing',
      'Language': 'English',
      'Format': 'Paperback',
      'ISBN': '978-1234567890'
    }
  },
  {
    id: '7',
    name: 'Wireless Gaming Mouse',
    slug: 'wireless-gaming-mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and programmable buttons.',
    price: 79.99,
    originalPrice: 99.99,
    images: [
      '/images/products/mouse-1.jpg',
      '/images/products/mouse-2.jpg',
      '/images/products/mouse-3.jpg'
    ],
    category: 'Electronics',
    categoryId: '1',
    inStock: true,
    stockQuantity: 40,
    rating: 4.5,
    reviewCount: 94,
    tags: ['gaming', 'wireless', 'rgb', 'precision'],
    features: [
      'High-precision sensor',
      'Customizable RGB lighting',
      '6 programmable buttons',
      '70-hour battery life',
      'Ergonomic design'
    ],
    specifications: {
      'DPI': 'Up to 16,000',
      'Battery Life': '70 hours',
      'Connectivity': '2.4GHz wireless',
      'Buttons': '6 programmable',
      'Weight': '85g'
    }
  },
  {
    id: '8',
    name: 'Casual Denim Jeans',
    slug: 'casual-denim-jeans',
    description: 'Classic fit denim jeans made from premium denim with comfortable stretch.',
    price: 89.99,
    originalPrice: 119.99,
    images: [
      '/images/products/jeans-1.jpg',
      '/images/products/jeans-2.jpg',
      '/images/products/jeans-3.jpg'
    ],
    category: 'Clothing',
    categoryId: '2',
    inStock: true,
    stockQuantity: 60,
    rating: 4.2,
    reviewCount: 178,
    tags: ['denim', 'casual', 'stretch', 'classic'],
    features: [
      'Premium denim fabric',
      'Comfortable stretch',
      'Classic 5-pocket design',
      'Reinforced stress points',
      'Available in multiple washes'
    ],
    specifications: {
      'Material': '98% Cotton, 2% Elastane',
      'Fit': 'Regular',
      'Rise': 'Mid-rise',
      'Leg Opening': '16"',
      'Inseam': '32"'
    }
  }
];

// Sample users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/images/avatars/john.jpg',
    role: 'customer',
    createdAt: '2024-01-15T10:30:00Z',
    addresses: [
      {
        id: '1',
        type: 'shipping',
        firstName: 'John',
        lastName: 'Doe',
        company: '',
        address1: '123 Main St',
        address2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US',
        phone: '+1-555-0123',
        isDefault: true
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: '/images/avatars/jane.jpg',
    role: 'customer',
    createdAt: '2024-02-20T14:15:00Z',
    addresses: [
      {
        id: '2',
        type: 'shipping',
        firstName: 'Jane',
        lastName: 'Smith',
        company: 'Tech Corp',
        address1: '456 Oak Ave',
        address2: '',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'US',
        phone: '+1-555-0456',
        isDefault: true
      }
    ]
  }
];

// Sample orders
export const orders: Order[] = [
  {
    id: '1',
    userId: '1',
    orderNumber: 'ORD-2024-001',
    status: 'delivered',
    items: [
      {
        id: '1',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        productImage: '/images/products/headphones-1.jpg',
        quantity: 1,
        price: 199.99,
        total: 199.99
      },
      {
        id: '2',
        productId: '3',
        productName: 'Premium Cotton T-Shirt',
        productImage: '/images/products/tshirt-1.jpg',
        quantity: 2,
        price: 29.99,
        total: 59.98
      }
    ],
    subtotal: 259.97,
    tax: 20.80,
    shipping: 9.99,
    total: 290.76,
    shippingAddress: {
      id: '1',
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1-555-0123',
      isDefault: true
    },
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '2024-03-01T09:15:00Z',
    updatedAt: '2024-03-05T16:30:00Z',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    userId: '2',
    orderNumber: 'ORD-2024-002',
    status: 'processing',
    items: [
      {
        id: '3',
        productId: '2',
        productName: 'Smart Fitness Watch',
        productImage: '/images/products/watch-1.jpg',
        quantity: 1,
        price: 299.99,
        total: 299.99
      }
    ],
    subtotal: 299.99,
    tax: 24.00,
    shipping: 0.00,
    total: 323.99,
    shippingAddress: {
      id: '2',
      type: 'shipping',
      firstName: 'Jane',
      lastName: 'Smith',
      company: 'Tech Corp',
      address1: '456 Oak Ave',
      address2: '',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'US',
      phone: '+1-555-0456',
      isDefault: true
    },
    paymentMethod: 'card',
    paymentStatus: 'paid',
    createdAt: '2024-03-10T11:45:00Z',
    updatedAt: '2024-03-10T11:45:00Z'
  },
  {
    id: '3',
    userId: '1',
    orderNumber: 'ORD-2024-003',
    status: 'pending',
    items: [
      {
        id: '4',
        productId: '4',
        productName: 'Ergonomic Office Chair',
        productImage: '/images/products/chair-1.jpg',
        quantity: 1,
        price: 449.99,
        total: 449.99
      }
    ],
    subtotal: 449.99,
    tax: 36.00,
    shipping: 29.99,
    total: 515.98,
    shippingAddress: {
      id: '1',
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      company: '',
      address1: '123 Main St',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phone: '+1-555-0123',
      isDefault: true
    },
    paymentMethod: 'card',
    paymentStatus: 'pending',
    createdAt: '2024-03-15T14:20:00Z',
    updatedAt: '2024-03-15T14:20:00Z'
  }
];

// Export with alternative names for flexibility
export { categories as seedCategories };
export { products as seedProducts };
export { users as seedUsers };
export { orders as seedOrders };