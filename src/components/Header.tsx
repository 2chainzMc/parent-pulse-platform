import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSchool } from '@/contexts/SchoolContext';

interface HeaderProps {
  title: string;
  showNotifications?: boolean;
  showProfile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title, 
  showNotifications = true, 
  showProfile = true 
}) => {
  const { school, user } = useSchool();

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {school?.logo && (
            <img 
              src={school.logo} 
              alt={school.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {school && (
              <p className="text-xs text-muted-foreground">{school.name}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {showNotifications && (
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell size={20} />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
              >
                3
              </Badge>
            </Button>
          )}
          
          {showProfile && user && (
            <Button variant="ghost" size="sm" className="p-2">
              <User size={20} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};