import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, School, Mail, Lock } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';
import { mockSchools, mockUser, mockChildren } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { setSchool, setUser, setSelectedChild } = useSchool();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !selectedSchoolId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and select a school.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const selectedSchool = mockSchools.find(school => school.id === selectedSchoolId);
      
      if (selectedSchool) {
        setSchool(selectedSchool);
        setUser(mockUser);
        if (mockUser.children && mockUser.children.length > 0) {
          setSelectedChild(mockUser.children[0]);
        }
        
        toast({
          title: "Welcome back!",
          description: `Successfully logged into ${selectedSchool.name}`,
        });
        
        navigate('/');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-school-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* App Logo/Title */}
        <div className="text-center text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <GraduationCap size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">EduConnect</h1>
          <p className="text-white/90">Your school portal companion</p>
        </div>

        {/* School Selection */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-2">
              <School size={20} />
              <span>Select Your School</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {mockSchools.map((school) => (
                <button
                  key={school.id}
                  onClick={() => setSelectedSchoolId(school.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedSchoolId === school.id
                      ? 'border-primary bg-primary-soft'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={school.logo}
                      alt={school.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{school.name}</h3>
                      <p className="text-sm text-muted-foreground">{school.motto}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {school.features.messaging && (
                          <Badge variant="secondary" className="text-xs">Messaging</Badge>
                        )}
                        {school.features.events && (
                          <Badge variant="secondary" className="text-xs">Events</Badge>
                        )}
                        {school.features.payments && (
                          <Badge variant="secondary" className="text-xs">Payments</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Login Form */}
        {selectedSchoolId && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium text-sm mb-2">Demo Credentials:</h4>
                <p className="text-xs text-muted-foreground">Email: sarah.johnson@email.com</p>
                <p className="text-xs text-muted-foreground">Password: demo123</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LoginPage;