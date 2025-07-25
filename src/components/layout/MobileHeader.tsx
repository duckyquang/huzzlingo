import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-huzz-dark-purple border-b border-white/5 z-50 lg:hidden">
      <div className="flex items-center justify-between h-full px-4">
        <Logo showText={false} className="w-8 h-8" />
      </div>
    </header>
  );
} 