'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { VariantSelector } from '@/components/variant-selector';
import { Edit2, Trash2, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!selectedVariant) return null;

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  const getStockColor = (stock: number) => {
    if (stock > 5) return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
    if (stock > 0) return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
    return 'bg-destructive/10 text-destructive';
  };

  const getStockLabel = (stock: number) => {
    if (stock > 5) return 'In Stock';
    if (stock > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  return (
    <Card className="overflow-hidden border-border bg-card hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-56 bg-secondary/50 overflow-hidden group">
        <Image
          src={selectedVariant.image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {selectedVariant.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Out of Stock</span>
          </div>
        )}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? 'fill-destructive text-destructive' : 'text-foreground'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {/* Brand Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent">
              {product.brand}
            </span>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStockColor(totalStock)}`}>
            {getStockLabel(totalStock)}
          </span>
        </div>

        {/* Product Name */}
        <div>
          <h3 className="font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{product.category}</p>
        </div>

        {/* Price */}
        <div className="pt-2 border-t border-border">
          <p className="text-2xl font-bold text-accent">
            ₹{selectedVariant.price.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Variant Selector */}
        <div className="py-3 border-t border-border flex-1">
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onVariantChange={setSelectedVariant}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-2"
            disabled={selectedVariant.stock === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
          <Button size="sm" variant="ghost" className="px-3">
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="px-3 text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
