import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

export const metadata: Metadata = {
  title: 'Home - Modern Ecommerce',
  description: 'Discover our featured products and latest collections. Shop the best deals on quality products with fast shipping.',
  keywords: 'ecommerce, shopping, products, deals, online store',
  openGraph: {
    title: 'Modern Ecommerce - Shop Quality Products',
    description: 'Discover our featured products and latest collections',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover our handpicked selection of premium products
            </p>
          </div>
          
          {/* Product Grid */}
          <ProductGrid featured={true} limit={8} />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Browse our wide range of product categories
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', image: '/images/categories/electronics.jpg', count: '120+ items' },
              { name: 'Clothing', image: '/images/categories/clothing.jpg', count: '200+ items' },
              { name: 'Home & Garden', image: '/images/categories/home.jpg', count: '150+ items' },
              { name: 'Sports', image: '/images/categories/sports.jpg', count: '80+ items' },
            ].map((category) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-3 aspect-h-2 bg-gray-200 dark:bg-gray-700">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{category.name[0]}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {category.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new products, exclusive deals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}