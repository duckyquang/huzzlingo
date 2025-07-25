import { Link } from 'react-router-dom';
import logoImage from '../../H.png';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link to="/dashboard" className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="flex items-center justify-center w-full h-full">
        <img 
          src={logoImage} 
          alt="Huzzlingo Logo" 
          className="w-full h-full object-contain rounded-xl"
        />
      </div>
      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Huzzlingo
        </span>
      )}
    </Link>
  );
} 