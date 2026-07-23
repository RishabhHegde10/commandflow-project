'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/mock-data';
import { ChevronDown } from 'lucide-react';

interface ProductRowProps {
  product: Product;
}

export function ProductRow({ product }: ProductRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );

  if (!selectedVariant) return null;

  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return '';
    }
  };

  const getStockColor = (stock: number) => {
    if (stock > 5) return 'text-emerald-600 dark:text-emerald-400';
    if (stock > 0) return 'text-orange-600 dark:text-orange-400';
    return 'text-destructive';
  };

  return (
    <>
      {/* MAIN ROW */}
      <tr className="border-b border-border hover:bg-secondary/50 transition-colors">
        <td className="px-6 py-4 text-sm">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />

            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-secondary/50">
              <Image
                src={selectedVariant.image || '/fallback.png'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-left">
              <p className="font-medium text-foreground">{product.name}</p>
              <p className="text-xs text-muted-foreground">
                {product.variants.length} variants
              </p>
            </div>
          </button>
        </td>

        <td className="px-6 py-4 text-sm text-muted-foreground">
          {product.brand}
        </td>

        <td className="px-6 py-4 text-sm text-muted-foreground">
          {product.category}
        </td>

        <td className="px-6 py-4 text-sm font-medium text-accent">
          ₹{selectedVariant.price.toLocaleString()}
        </td>

        <td className={`px-6 py-4 text-sm ${getStockColor(selectedVariant.stock)}`}>
          {selectedVariant.stock > 0
            ? `${selectedVariant.stock} units`
            : 'Out of stock'}
        </td>

        <td className="px-6 py-4 text-sm">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
              product.status
            )}`}
          >
            {product.status}
          </span>
        </td>
      </tr>

      {/* VARIANTS */}
      {isExpanded &&
        product.variants.map((variant) => {
          const isSelected = selectedVariant.sku === variant.sku;

          return (
            <tr
              key={variant.sku}
              onClick={() => setSelectedVariant(variant)}
              className={`cursor-pointer border-b ${
                isSelected ? 'bg-accent/10' : 'bg-secondary/20'
              }`}
            >
              <td className="px-6 py-3"></td>

              <td className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded overflow-hidden bg-secondary/50">
                    <Image
                      src={variant.image || '/fallback.png'}
                      alt={variant.color}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {variant.color} / {variant.size}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {variant.sku}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-3">-</td>

              <td className="px-6 py-3 text-sm text-accent">
                ₹{variant.price.toLocaleString()}
              </td>

              <td className={`px-6 py-3 text-sm ${getStockColor(variant.stock)}`}>
                {variant.stock > 0
                  ? `${variant.stock} in stock`
                  : 'Out of stock'}
              </td>

              <td className="px-6 py-3 text-sm text-muted-foreground">
                Variant
              </td>
            </tr>
          );
        })}
    </>
  );
}