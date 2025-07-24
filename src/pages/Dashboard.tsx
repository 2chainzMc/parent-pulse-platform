import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar, BookOpen, Users, TrendingUp, Clock } from 'lucide-react';
import { useSchool } from '@/contexts/SchoolContext';
import { mockMarks, mockEvents, mockMessages, mockAttendance, mockAnnouncements } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { user, selectedChild, school } = useSchool();

  const latestMark = mockMarks[0];
  const nextEvent = mockEvents.find(event => new Date(event.date) > new Date());
  const unreadMessages = mockMessages.filter(msg => msg.unread).length;

  const quickStats = [
    {
      title: 'Latest Grade',
      value: latestMark?.grade || 'N/A',
      subtitle: latestMark?.subject || '',
      icon: BookOpen,
      color: 'text-grade-a bg-grade-a/10',
    },
    {
      title: 'Attendance',
      value: `${mockAttendance.thisWeek.present}/${mockAttendance.thisWeek.total}`,
      subtitle: 'This week',
      icon: Users,
      color: 'text-success bg-success/10',
    },
    {
      title: 'Messages',
      value: unreadMessages.toString(),
      subtitle: 'Unread',
      icon: MessageCircle,
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Next Event',
      value: nextEvent ? new Date(nextEvent.date).getDate().toString() : '--',
      subtitle: nextEvent ? new Date(nextEvent.date).toLocaleDateString('en-US', { month: 'short' }) : 'None',
      icon: Calendar,
      color: 'text-warning bg-warning/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      <Header title="Dashboard" />
      
      <div className="px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-school-secondary rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h2>
          {selectedChild && (
            <p className="text-white/90 text-lg">
              Tracking {selectedChild.name}'s progress
            </p>
          )}
          {selectedChild && (
            <div className="mt-3 flex items-center space-x-4 text-white/80">
              <span className="flex items-center space-x-1">
                <Users size={16} />
                <span>{selectedChild.grade}</span>
              </span>
              <span className="flex items-center space-x-1">
                <BookOpen size={16} />
                <span>Class {selectedChild.class}</span>
              </span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn("p-2 rounded-lg", stat.color)}>
                    <stat.icon size={20} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <MessageCircle size={24} />
              <span className="text-sm">Message Teacher</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
              <BookOpen size={24} />
              <span className="text-sm">View Marks</span>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock size={20} />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockMarks.slice(0, 3).map((mark) => (
              <div key={mark.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{mark.subject}</p>
                  <p className="text-sm text-muted-foreground">{mark.testName}</p>
                </div>
                <div className="text-right">
                  <Badge className={cn(
                    mark.grade === 'A' ? 'bg-grade-a' :
                    mark.grade === 'B' || mark.grade === 'B+' ? 'bg-grade-b' :
                    'bg-grade-c'
                  )}>
                    {mark.grade}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">{mark.score}/{mark.total}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* School Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>School Announcements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAnnouncements.slice(0, 2).map((announcement) => (
              <div key={announcement.id} className="p-3 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{announcement.title}</h4>
                  <Badge variant={
                    announcement.priority === 'high' ? 'destructive' :
                    announcement.priority === 'medium' ? 'default' : 'secondary'
                  }>
                    {announcement.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{announcement.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;