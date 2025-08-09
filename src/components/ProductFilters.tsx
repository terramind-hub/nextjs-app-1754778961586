'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { categories } from '@/lib/data';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    inStock: boolean;
  }) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [inStock, setInStock] = useState(false);

  // Apply filters whenever any filter changes
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      inStock,
    });
  }, [selectedCategories, priceRange, inStock, onFilterChange]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setInStock(false);
  };

  return (
    <div className="w-full lg:w-80 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-sm"
        >
          Reset
        </Button>
      </div>

      {/* Categories Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStock}
              onCheckedChange={(checked) => setInStock(checked as boolean)}
            />
            <Label
              htmlFor="in-stock"
              className="text-sm font-normal cursor-pointer"
            >
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Summary */}
      {(selectedCategories.length > 0 || inStock || priceRange[0] > 0 || priceRange[1] < 1000) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {selectedCategories.map((category) => (
              <div
                key={category}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs mr-1 mb-1"
              >
                {category}
                <button
                  onClick={() => handleCategoryChange(category, false)}
                  className="ml-1 hover:text-primary/70"
                >
                  ×
                </button>
              </div>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
              <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs mr-1 mb-1">
                ${priceRange[0]} - ${priceRange[1]}
                <button
                  onClick={() => setPriceRange([0, 1000])}
                  className="ml-1 hover:text-primary/70"
                >
                  ×
                </button>
              </div>
            )}
            {inStock && (
              <div className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-xs mr-1 mb-1">
                In Stock
                <button
                  onClick={() => setInStock(false)}
                  className="ml-1 hover:text-primary/70"
                >
                  ×
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}