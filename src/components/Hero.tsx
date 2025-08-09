'use client';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Shop the latest trends and find everything you need with fast shipping and unbeatable prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              onClick={() => window.location.href = '/products'}
            >
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
              onClick={() => window.location.href = '/products'}
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
      
      {/* Hero Image/Background Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-xl"></div>
    </section>
  );
}