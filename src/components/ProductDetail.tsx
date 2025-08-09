'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product';
import { Star, Heart, ShoppingCart, Plus, Minus } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Handle missing images
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || '/placeholder-product.jpg'];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          'h-4 w-4',
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        )}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-6">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square overflow-hidden rounded-lg border">
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
        </div>

        {/* Thumbnail Images */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  'flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden',
                  selectedImage === index 
                    ? 'border-primary' 
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-product.jpg';
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleWishlist}
              className="text-gray-400 hover:text-red-500"
            >
              <Heart 
                className={cn(
                  'h-6 w-6',
                  isWishlisted && 'fill-red-500 text-red-500'
                )}
              />
            </Button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating?.toFixed(1)} ({product.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xl text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <Badge variant="destructive">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>

          {/* Category */}
          <Badge variant="secondary" className="mb-4">
            {product.category}
          </Badge>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-3 h-3 rounded-full',
            product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
          )} />
          <span className={cn(
            'text-sm font-medium',
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          )}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium min-w-[3rem] text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full h-12 text-lg"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <div className="space-y-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}