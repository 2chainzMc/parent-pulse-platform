import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, MessageCircle, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/marks', icon: BookOpen, label: 'Marks' },
  { path: '/messages', icon: MessageCircle, label: 'Messages' },
  { path: '/events', icon: Calendar, label: 'Events' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
            (path !== '/' && location.pathname.startsWith(path));
          
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 min-w-0 flex-1 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary-soft" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "mb-1 transition-transform duration-200",
                  isActive && "scale-110"
                )}
              />
              <span className={cn(
                "text-xs font-medium truncate transition-colors duration-200",
                isActive && "font-semibold"
              )}>
                {label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};