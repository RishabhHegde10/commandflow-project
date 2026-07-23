export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  id: string;
  productId: string;

  name: string;
  brand: string;
  category: string;
  description?: string;

  status: string;

  variants: ProductVariant[];
}