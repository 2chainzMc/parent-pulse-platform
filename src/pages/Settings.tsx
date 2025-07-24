import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  School, 
  Palette, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronRight,
  Users,
  BookOpen,
  Settings as SettingsIcon
} from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';
import { mockChildren } from '@/data/mockData';

const Settings: React.FC = () => {
  const { user, school, selectedChild, setSelectedChild, logout } = useSchool();

  const handleLogout = () => {
    logout();
  };

  const settingSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', action: () => {} },
        { label: 'Change Password', action: () => {} },
        { label: 'Privacy Settings', action: () => {} },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push Notifications', toggle: true, enabled: true },
        { label: 'Email Notifications', toggle: true, enabled: false },
        { label: 'SMS Alerts', toggle: true, enabled: true },
      ]
    },
    {
      title: 'App Preferences',
      icon: SettingsIcon,
      items: [
        { label: 'Language', value: 'English', action: () => {} },
        { label: 'Theme', value: 'Auto', action: () => {} },
        { label: 'Data Usage', action: () => {} },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      <Header title="Settings" />
      
      <div className="px-4 py-6 space-y-6">
        {/* User Profile */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {user?.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <Badge variant="secondary" className="mt-1">
                  {user?.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* School Information */}
        {school && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School size={20} />
                <span>School Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <img 
                  src={school.logo} 
                  alt={school.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{school.name}</h3>
                  <p className="text-sm text-muted-foreground">{school.motto}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{school.contactEmail}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{school.contactPhone}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Address</p>
                <p className="font-medium text-sm">{school.address}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Child Selection */}
        {user?.children && user.children.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users size={20} />
                <span>Select Child</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.children.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChild(child)}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedChild?.id === child.id
                      ? 'border-primary bg-primary-soft'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{child.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {child.grade} - Class {child.class}
                      </p>
                    </div>
                    {selectedChild?.id === child.id && (
                      <Badge variant="default">Active</Badge>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <section.icon size={20} />
                <span>{section.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.value && (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                  
                  {item.toggle ? (
                    <Switch 
                      checked={item.enabled} 
                      onCheckedChange={() => {}}
                    />
                  ) : (
                    <ChevronRight size={20} className="text-muted-foreground" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        {/* School Features */}
        {school && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette size={20} />
                <span>Available Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(school.features).map(([feature, enabled]) => (
                  <div key={feature} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium capitalize">
                      {feature.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Badge variant={enabled ? 'default' : 'secondary'}>
                      {enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Logout */}
        <Card>
          <CardContent className="p-4">
            <Button 
              onClick={handleLogout} 
              variant="destructive" 
              className="w-full flex items-center space-x-2"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </Button>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground py-4">
          EduConnect v1.0.0
        </div>
      </div>
    </div>
  );
};

export default Settings;