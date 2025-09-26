import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { FolderOpen, Home, LogOut, Plus, Settings, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Page } from '@/lib/types';

const menuItems = [
  {
    id: 'dashboard' as Page,
    label: 'Dashboard',
    icon: Home,
    description: 'Overview & meetings',
  },
  {
    id: 'schedule-meeting' as Page,
    label: 'Schedule Meeting',
    icon: Plus,
    description: 'Create new session',
  },
  {
    id: 'projects' as Page,
    label: 'Projects',
    icon: FolderOpen,
    description: 'Manage projects',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-card border-border flex w-64 flex-col border-r">
      {/* Header */}
      <div className="border-border border-b p-6">
        <div className="flex items-center space-x-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <Video className="text-primary-foreground h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg">
              <span className="text-foreground">Stand</span>
              <span className="text-primary">In</span>
            </h2>
            <p className="text-muted-foreground text-xs">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.includes(item.id);

          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`h-auto w-full justify-start p-3 ${
                isActive
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80 dark:hover:text-primary-foreground'
                  : 'hover:bg-accent'
              }`}
              onClick={() => router.push(item.id)}
            >
              <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-sm">{item.label}</div>
                <div
                  className={`text-xs ${
                    isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                  }`}
                >
                  {item.description}
                </div>
              </div>
            </Button>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-border space-y-2 border-t p-4">
        <div className="flex items-center space-x-3 p-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-primary-foreground text-xs">HR</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">Sarah Wilson</p>
            <p className="text-muted-foreground text-xs">HR Manager</p>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>

        <Button variant="ghost" size="sm" className="text-muted-foreground w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
