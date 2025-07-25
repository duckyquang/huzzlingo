import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  TrophyIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import Logo from '../Logo';

const mainNavItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Lessons', icon: BookOpenIcon, path: '/courses' },
  { name: 'Final Boss', icon: TrophyIcon, path: '/final-challenge' },
];

export default function Sidebar() {
  const location = useLocation();

  const NavButton = ({ item }: { item: typeof mainNavItems[0] }) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link to={item.path}>
        <motion.button
          className={`
            w-12 h-12 rounded-xl relative group
            flex items-center justify-center
            transition-all duration-200
            ${isActive ? 'bg-gradient-huzz shadow-glow-pink' : 'hover:bg-white/5'}
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={item.name}
        >
          {/* Icon */}
          <item.icon className={`
            w-5 h-5 relative z-10
            ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}
          `} />

          {/* Tooltip */}
          <div className="absolute left-full ml-4 px-2 py-1 bg-huzz-dark-accent rounded-md text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {item.name}
          </div>
        </motion.button>
      </Link>
    );
  };

  return (
    <div className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-20 bg-huzz-dark-purple border-r border-white/5">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 px-2">
        <div className="w-12 h-12 flex items-center justify-center">
          <Logo showText={false} className="w-10 h-10" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-4 pt-8">
        {mainNavItems.map((item) => (
          <NavButton key={item.name} item={item} />
        ))}
      </nav>
    </div>
  );
} 