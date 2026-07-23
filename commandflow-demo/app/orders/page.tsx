'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockOrders } from '@/lib/mock-data';
import { Search, Eye, Download } from 'lucide-react';

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
      case 'processing':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and track all orders
          </p>
        </div>
        <Button className="gap-2 bg-accent hover:bg-accent/90">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 border-border bg-card">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border-0 bg-transparent placeholder-muted-foreground focus:ring-0"
          />
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-secondary/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-accent font-mono font-semibold">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-medium">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-semibold">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {order.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-border bg-card">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            {filteredOrders.length}
          </p>
        </Card>
        <Card className="p-4 border-border bg-card">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-emerald-500 mt-1">
            {filteredOrders.filter((o) => o.status === 'completed').length}
          </p>
        </Card>
        <Card className="p-4 border-border bg-card">
          <p className="text-sm text-muted-foreground">Processing</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">
            {filteredOrders.filter((o) => o.status === 'processing').length}
          </p>
        </Card>
        <Card className="p-4 border-border bg-card">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <p className="text-2xl font-bold text-foreground mt-1">
            ${filteredOrders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}
          </p>
        </Card>
      </div>
    </div>
  );
}
