'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';

interface ProductGridProps {
  searchQuery?: string;
  category?: string;
  className?: string;
}

export default function ProductGrid({ 
  searchQuery = '', 
  category = '', 
  className 
}: ProductGridProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, category]);

  // Filter products based on search query and category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, category]);

  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border animate-pulse"
          >
            <div className="aspect-square bg-gray-200 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-6 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-16", className)}>
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="text-gray-500 max-w-md">
            {searchQuery || category
              ? `No products match your current filters. Try adjusting your search or category selection.`
              : 'No products are currently available.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {searchQuery && (
            <span className="ml-1">
              for "<span className="font-medium">{searchQuery}</span>"
            </span>
          )}
          {category && category !== 'all' && (
            <span className="ml-1">
              in <span className="font-medium capitalize">{category}</span>
            </span>
          )}
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}