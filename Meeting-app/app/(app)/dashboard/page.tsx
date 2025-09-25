'use client';

import React, { useState } from 'react';
import { HomePage } from '@/app/components/home-page';
import { Sidebar } from '@/app/components/sidebar';

export function Dashboard() {
  return (
    <div className="bg-background flex h-screen">
      <Sidebar currentPage="dashboard" onNavigate={() => {}} />
      <main className="flex-1 overflow-auto">
        <HomePage onNavigate={() => {}} />
      </main>
    </div>
  );
}

// Default export for Next.js page component
export default function DashboardPage() {
  return <Dashboard />;
}
