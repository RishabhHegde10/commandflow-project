export interface Variant {
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
  name: string;
  brand: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  created: Date;
  variants: Variant[];
}

export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: number;
  date: Date;
}

export interface ChartData {
  name: string;
  revenue: number;
  orders: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'login';
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Air Max 90',
    brand: 'Nike',
    category: 'Shoes',
    status: 'active',
    created: new Date('2024-01-15'),
    variants: [
      {
        id: '1-1',
        sku: 'NIKE-AM90-BLK-9',
        color: 'Black',
        size: '9',
        price: 4999,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      },
      {
        id: '1-2',
        sku: 'NIKE-AM90-BLK-10',
        color: 'Black',
        size: '10',
        price: 4999,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      },
      {
        id: '1-3',
        sku: 'NIKE-AM90-WHT-9',
        color: 'White',
        size: '9',
        price: 5199,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop',
      },
      {
        id: '1-4',
        sku: 'NIKE-AM90-WHT-10',
        color: 'White',
        size: '10',
        price: 5199,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '2',
    name: 'Ultraboost 22',
    brand: 'Adidas',
    category: 'Shoes',
    status: 'active',
    created: new Date('2024-01-10'),
    variants: [
      {
        id: '2-1',
        sku: 'ADIDAS-UB22-GRY-8',
        color: 'Gray',
        size: '8',
        price: 5499,
        stock: 11,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80',
      },
      {
        id: '2-2',
        sku: 'ADIDAS-UB22-GRY-9',
        color: 'Gray',
        size: '9',
        price: 5499,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80',
      },
      {
        id: '2-3',
        sku: 'ADIDAS-UB22-BLU-8',
        color: 'Blue',
        size: '8',
        price: 5599,
        stock: 11,
        image: 'https://images.unsplash.com/photo-1579033127887-f13cff5e1b0f?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '3',
    name: 'Classic Straight',
    brand: 'Levi\'s',
    category: 'Jeans',
    status: 'active',
    created: new Date('2024-01-20'),
    variants: [
      {
        id: '3-1',
        sku: 'LEVIS-CS-BLK-30',
        color: 'Black',
        size: '30',
        price: 3999,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1505618346881-b72b27e84530?w=500&h=500&fit=crop',
      },
      {
        id: '3-2',
        sku: 'LEVIS-CS-BLK-32',
        color: 'Black',
        size: '32',
        price: 3999,
        stock: 3,
        image: 'https://images.unsplash.com/photo-1505618346881-b72b27e84530?w=500&h=500&fit=crop',
      },
      {
        id: '3-3',
        sku: 'LEVIS-CS-BLU-30',
        color: 'Blue',
        size: '30',
        price: 3999,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
      },
      {
        id: '3-4',
        sku: 'LEVIS-CS-BLU-32',
        color: 'Blue',
        size: '32',
        price: 3999,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '4',
    name: 'Suede Slip-On',
    brand: 'Puma',
    category: 'Shoes',
    status: 'draft',
    created: new Date('2024-02-01'),
    variants: [
      {
        id: '4-1',
        sku: 'PUMA-SSO-BRN-7',
        color: 'Brown',
        size: '7',
        price: 2999,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1556821552-5ae0d378e842?w=500&h=500&fit=crop',
      },
      {
        id: '4-2',
        sku: 'PUMA-SSO-BRN-8',
        color: 'Brown',
        size: '8',
        price: 2999,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1556821552-5ae0d378e842?w=500&h=500&fit=crop',
      },
      {
        id: '4-3',
        sku: 'PUMA-SSO-TAN-7',
        color: 'Tan',
        size: '7',
        price: 2999,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1543163521-9145f931a744?w=500&h=500&fit=crop',
      },
      {
        id: '4-4',
        sku: 'PUMA-SSO-TAN-8',
        color: 'Tan',
        size: '8',
        price: 2999,
        stock: 5,
        image: 'https://images.unsplash.com/photo-1543163521-9145f931a744?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '5',
    name: 'Winter Parka',
    brand: 'The North Face',
    category: 'Jackets',
    status: 'active',
    created: new Date('2023-12-28'),
    variants: [
      {
        id: '5-1',
        sku: 'TNF-WP-BLK-S',
        color: 'Black',
        size: 'S',
        price: 8999,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1539533057440-7bf6b3b5a59f?w=500&h=500&fit=crop',
      },
      {
        id: '5-2',
        sku: 'TNF-WP-BLK-M',
        color: 'Black',
        size: 'M',
        price: 8999,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1539533057440-7bf6b3b5a59f?w=500&h=500&fit=crop',
      },
      {
        id: '5-3',
        sku: 'TNF-WP-RED-S',
        color: 'Red',
        size: 'S',
        price: 9299,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1544131519-9286cdb9e1d8?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '6',
    name: 'Running Short',
    brand: 'Nike',
    category: 'Clothing',
    status: 'active',
    created: new Date('2024-01-25'),
    variants: [
      {
        id: '6-1',
        sku: 'NIKE-RS-BLK-S',
        color: 'Black',
        size: 'S',
        price: 1999,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1506629082632-401ba2c2d8dd?w=500&h=500&fit=crop',
      },
      {
        id: '6-2',
        sku: 'NIKE-RS-BLK-M',
        color: 'Black',
        size: 'M',
        price: 1999,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1506629082632-401ba2c2d8dd?w=500&h=500&fit=crop',
      },
      {
        id: '6-3',
        sku: 'NIKE-RS-BLK-L',
        color: 'Black',
        size: 'L',
        price: 1999,
        stock: 21,
        image: 'https://images.unsplash.com/photo-1506629082632-401ba2c2d8dd?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '7',
    name: 'Cotton T-Shirt',
    brand: 'Adidas',
    category: 'Clothing',
    status: 'active',
    created: new Date('2024-02-05'),
    variants: [
      {
        id: '7-1',
        sku: 'ADIDAS-CTS-BLK-S',
        color: 'Black',
        size: 'S',
        price: 1499,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      },
      {
        id: '7-2',
        sku: 'ADIDAS-CTS-BLK-M',
        color: 'Black',
        size: 'M',
        price: 1499,
        stock: 25,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      },
      {
        id: '7-3',
        sku: 'ADIDAS-CTS-WHT-S',
        color: 'White',
        size: 'S',
        price: 1499,
        stock: 21,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      },
      {
        id: '7-4',
        sku: 'ADIDAS-CTS-WHT-M',
        color: 'White',
        size: 'M',
        price: 1499,
        stock: 21,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
      },
    ],
  },
  {
    id: '8',
    name: 'Flex Hat',
    brand: 'Puma',
    category: 'Accessories',
    status: 'active',
    created: new Date('2024-02-10'),
    variants: [
      {
        id: '8-1',
        sku: 'PUMA-FH-BLK-OS',
        color: 'Black',
        size: 'One Size',
        price: 999,
        stock: 1,
        image: 'https://images.unsplash.com/photo-1552062407-c551eeda4bbb?w=500&h=500&fit=crop',
      },
      {
        id: '8-2',
        sku: 'PUMA-FH-RED-OS',
        color: 'Red',
        size: 'One Size',
        price: 999,
        stock: 2,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
      },
    ],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    amount: 329.97,
    status: 'completed',
    items: 3,
    date: new Date('2024-02-15'),
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    amount: 129.99,
    status: 'processing',
    items: 1,
    date: new Date('2024-02-16'),
  },
  {
    id: 'ORD-003',
    customer: 'Mike Davis',
    amount: 249.98,
    status: 'completed',
    items: 2,
    date: new Date('2024-02-16'),
  },
  {
    id: 'ORD-004',
    customer: 'Emily Chen',
    amount: 69.99,
    status: 'pending',
    items: 1,
    date: new Date('2024-02-17'),
  },
  {
    id: 'ORD-005',
    customer: 'James Wilson',
    amount: 459.96,
    status: 'completed',
    items: 4,
    date: new Date('2024-02-17'),
  },
];

export const chartData: ChartData[] = [
  { name: 'Mon', revenue: 4200, orders: 24 },
  { name: 'Tue', revenue: 3800, orders: 21 },
  { name: 'Wed', revenue: 5200, orders: 29 },
  { name: 'Thu', revenue: 4800, orders: 25 },
  { name: 'Fri', revenue: 6200, orders: 31 },
  { name: 'Sat', revenue: 5800, orders: 28 },
  { name: 'Sun', revenue: 4600, orders: 22 },
];

export const activityLogs: ActivityLog[] = [
  {
    id: '1',
    action: 'Created new product',
    user: 'Admin',
    timestamp: new Date('2024-02-17T14:30:00'),
    type: 'create',
  },
  {
    id: '2',
    action: 'Updated order status',
    user: 'Admin',
    timestamp: new Date('2024-02-17T13:15:00'),
    type: 'update',
  },
  {
    id: '3',
    action: 'Deleted product',
    user: 'Admin',
    timestamp: new Date('2024-02-17T12:45:00'),
    type: 'delete',
  },
  {
    id: '4',
    action: 'Logged in',
    user: 'Admin',
    timestamp: new Date('2024-02-17T09:00:00'),
    type: 'login',
  },
];

export const dashboardStats = {
  totalRevenue: 34502,
  totalOrders: 245,
  activeProducts: 34,
  pendingOrders: 8,
};
