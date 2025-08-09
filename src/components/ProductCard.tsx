'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock === 0) return;
    
    setIsLoading(true);
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercentage > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discountPercentage}%
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge variant="secondary" className="text-xs">
              Out of Stock
            </Badge>
          )}
          {product.featured && (
            <Badge variant="default" className="text-xs">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 transition-colors"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted 
                ? "fill-red-500 text-red-500" 
                : "text-gray-600 dark:text-gray-400"
            )}
          />
        </button>

        {/* Quick Add to Cart - appears on hover */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating!)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.stock === 0 ? (
            <p className="text-sm text-red-600 dark:text-red-400">Out of stock</p>
          ) : product.stock < 10 ? (
            <p className="text-sm text-orange-600 dark:text-orange-400">
              Only {product.stock} left in stock
            </p>
          ) : (
            <p className="text-sm text-green-600 dark:text-green-400">In stock</p>
          )}
        </div>

        {/* Add to Cart Button (mobile) */}
        <div className="mt-4 sm:hidden">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isLoading}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
}