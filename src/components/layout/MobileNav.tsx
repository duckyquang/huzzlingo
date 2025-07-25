import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  TrophyIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Lessons', icon: BookOpenIcon, path: '/courses' },
  { name: 'Final Boss', icon: TrophyIcon, path: '/final-challenge' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-huzz-dark-purple border-t border-white/5 z-50">
      <div className="flex items-center justify-around h-full px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.name} to={item.path}>
              <motion.button
                className={`
                  w-12 h-12 rounded-xl relative
                  flex flex-col items-center justify-center gap-1
                  ${isActive ? 'text-white' : 'text-white/60'}
                `}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-huzz opacity-10 rounded-xl"
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 