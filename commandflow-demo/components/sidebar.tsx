'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Settings,
  Menu,
  X,
  LayoutDashboard,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Orders', href: '/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex flex-col fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300',
          open ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
          {open && <h1 className="text-xl font-bold">Admin</h1>}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            {open ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent text-sidebar-foreground'
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {open && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {open && (
          <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
            <p>Admin Dashboard v1.0</p>
          </div>
        )}
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button className="p-2 bg-sidebar text-sidebar-foreground rounded-lg border border-sidebar-border">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
