import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import MobileHeader from './MobileHeader';
import { useTimeTracking } from '../../hooks/useTimeTracking';

export default function MainLayout() {
  // Initialize time tracking
  useTimeTracking();

  return (
    <div className="min-h-screen bg-huzz-dark text-white">
      <MobileHeader />
      <div className="flex min-h-screen pt-16 lg:pt-0">
        <Sidebar />
        <main className="flex-1 lg:pl-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
} 