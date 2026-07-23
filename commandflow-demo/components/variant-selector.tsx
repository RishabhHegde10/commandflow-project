'use client';

import { Variant } from '@/lib/mock-data';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  onVariantChange: (variant: Variant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  // Get unique colors and sizes from variants
  const colors = Array.from(new Set(variants.map(v => v.color))).sort();
  const sizes = Array.from(new Set(variants.map(v => v.size))).sort();

  // Filter available sizes for selected color
  const availableSizes = selectedVariant
    ? variants
        .filter(v => v.color === selectedVariant.color)
        .map(v => v.size)
    : [];

  // Filter available colors for selected size (if any size selected)
  const selectedSize = selectedVariant?.size;
  const availableColors = selectedSize
    ? variants
        .filter(v => v.size === selectedSize)
        .map(v => v.color)
    : colors;

  const handleColorChange = (color: string) => {
    // Find variant with this color, prefer same size if available
    let variant = variants.find(
      v =>
        v.color === color &&
        (selectedVariant?.size ? v.size === selectedVariant.size : true)
    );
    if (!variant) {
      variant = variants.find(v => v.color === color);
    }
    if (variant) onVariantChange(variant);
  };

  const handleSizeChange = (size: string) => {
    // Find variant with this size and current color
    const variant = variants.find(
      v => v.size === size && v.color === selectedVariant?.color
    );
    if (variant) onVariantChange(variant);
  };

  const colorDisplay: { [key: string]: string } = {
    Black: '#000000',
    White: '#ffffff',
    Gray: '#9ca3af',
    Blue: '#3b82f6',
    Red: '#ef4444',
    Brown: '#92400e',
    Tan: '#d2691e',
  };

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      {colors.length > 1 && (
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {colors.map(color => {
              const isAvailable = availableColors.includes(color);
              const isSelected = selectedVariant?.color === color;

              return (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  disabled={!isAvailable}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'ring-2 ring-accent bg-accent/10 text-accent'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full border border-foreground/30"
                      style={{
                        backgroundColor: colorDisplay[color] || '#e5e7eb',
                      }}
                    />
                    {color}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {sizes.length > 1 && (
        <div>
          <label className="text-sm font-semibold text-foreground block mb-2">
            Size
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map(size => {
              const isAvailable =
                availableSizes.includes(size) ||
                variants.some(
                  v => v.size === size && availableColors.includes(v.color)
                );
              const isSelected = selectedVariant?.size === size;

              return (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  disabled={!isAvailable}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isSelected
                      ? 'ring-2 ring-accent bg-accent/10 text-accent'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Stock Status */}
      {selectedVariant && (
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">SKU:</span>
            <span className="font-mono text-foreground">{selectedVariant.sku}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Stock:</span>
            <span
              className={
                selectedVariant.stock > 0
                  ? selectedVariant.stock > 5
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-orange-600 dark:text-orange-400 font-semibold'
                  : 'text-destructive font-semibold'
              }
            >
              {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
