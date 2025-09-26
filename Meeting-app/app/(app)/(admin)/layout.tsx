'use client';

import React from 'react';
import { Sidebar } from '@/app/components/sidebar';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-background flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
      <Toaster />
    </div>
  );
}
