'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from '@/app/components/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Map pathname to current page for sidebar
  const getCurrentPage = (): 'dashboard' | 'create-meeting' | 'projects' | 'projects-list' => {
    if (pathname.includes('/dashboard')) return 'dashboard';
    if (pathname.includes('/schedule-meeting')) return 'create-meeting';
    if (pathname.includes('/add-project')) return 'projects';
    if (pathname.includes('/projects')) return 'projects-list';
    return 'dashboard';
  };

  const handleNavigate = (page: 'dashboard' | 'create-meeting' | 'projects' | 'projects-list') => {
    switch (page) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'create-meeting':
        router.push('/schedule-meeting');
        break;
      case 'projects':
        router.push('/add-project');
        break;
      case 'projects-list':
        router.push('/projects');
        break;
    }
  };

  return (
    <div className="bg-background flex h-screen">
      <Sidebar currentPage={getCurrentPage()} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
