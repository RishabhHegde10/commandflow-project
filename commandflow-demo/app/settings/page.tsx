'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Moon, Lock, Users, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    email: 'admin@example.com',
    companyName: 'My Business',
    currency: 'USD',
    timezone: 'EST',
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    orderNotifications: true,
    weeklyReport: false,
  });

  const handleSave = () => {
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Account Settings */}
      <Card className="p-6 border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Account Settings
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
              className="bg-card border-border text-foreground placeholder-muted-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your login email address
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Name
            </label>
            <Input
              type="text"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({ ...settings, companyName: e.target.value })
              }
              className="bg-card border-border text-foreground placeholder-muted-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  setSettings({ ...settings, currency: e.target.value })
                }
                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) =>
                  setSettings({ ...settings, timezone: e.target.value })
                }
                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option>EST</option>
                <option>CST</option>
                <option>MST</option>
                <option>PST</option>
                <option>GMT</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="gap-2 bg-accent hover:bg-accent/90"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            {
              id: 'emailNotifications',
              label: 'Email Notifications',
              description: 'Receive email updates about your account',
            },
            {
              id: 'orderNotifications',
              label: 'Order Notifications',
              description: 'Get notified when new orders arrive',
            },
            {
              id: 'weeklyReport',
              label: 'Weekly Report',
              description: 'Receive a weekly summary of your business metrics',
            },
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="font-medium text-foreground">{setting.label}</p>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences[setting.id as keyof typeof preferences]}
                onChange={(e) =>
                  setPreferences({
                    ...preferences,
                    [setting.id]: e.target.checked,
                  })
                }
                className="w-5 h-5 rounded border-border text-accent cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Appearance */}
      <Card className="p-6 border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Moon className="w-5 h-5" />
          Appearance
        </h2>
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium text-foreground">Dark Mode</p>
            <p className="text-sm text-muted-foreground">
              Use dark theme for the dashboard
            </p>
          </div>
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={(e) =>
              setPreferences({ ...preferences, darkMode: e.target.checked })
            }
            className="w-5 h-5 rounded border-border text-accent cursor-pointer"
          />
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 border-border bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-secondary">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-secondary">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-secondary">
            View Active Sessions
          </Button>
        </div>
      </Card>
    </div>
  );
}
