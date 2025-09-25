'use client';

import React from 'react';
import { HomePage } from '@/app/components/home-page';

export function Dashboard() {
  return <HomePage onNavigate={() => {}} />;
}

// Default export for Next.js page component
export default function DashboardPage() {
  return <Dashboard />;
}
