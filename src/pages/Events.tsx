import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { mockEvents } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Events: React.FC = () => {
  const [rsvpStatus, setRsvpStatus] = useState<{ [key: string]: 'yes' | 'no' | null }>({});

  const handleRsvp = (eventId: string, status: 'yes' | 'no') => {
    setRsvpStatus(prev => ({ ...prev, [eventId]: status }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Parent Meeting': return 'bg-primary text-primary-foreground';
      case 'Academic': return 'bg-success text-success-foreground';
      case 'Sports': return 'bg-warning text-warning-foreground';
      case 'Grade Trip': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = mockEvents.filter(event => new Date(event.date) < new Date());

  const EventCard = ({ event }: { event: typeof mockEvents[0] }) => {
    const currentRsvp = rsvpStatus[event.id] || event.rsvpStatus;
    
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-semibold text-lg text-foreground">{event.title}</h3>
                <Badge className={cn("text-xs", getCategoryColor(event.category))}>
                  {event.category}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">{event.description}</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-3 text-sm">
              <CalendarIcon size={16} className="text-muted-foreground" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Clock size={16} className="text-muted-foreground" />
              <span>{event.time}</span>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <MapPin size={16} className="text-muted-foreground" />
              <span>{event.location}</span>
            </div>
          </div>

          {event.rsvpRequired && new Date(event.date) >= new Date() && (
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">RSVP Required</span>
                <div className="flex space-x-2">
                  <Button
                    variant={currentRsvp === 'yes' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleRsvp(event.id, 'yes')}
                    className="flex items-center space-x-1"
                  >
                    <CheckCircle size={14} />
                    <span>Yes</span>
                  </Button>
                  <Button
                    variant={currentRsvp === 'no' ? 'destructive' : 'outline'}
                    size="sm"
                    onClick={() => handleRsvp(event.id, 'no')}
                    className="flex items-center space-x-1"
                  >
                    <XCircle size={14} />
                    <span>No</span>
                  </Button>
                </div>
              </div>
              
              {currentRsvp && (
                <div className="mt-2 text-sm text-muted-foreground">
                  You responded: <span className={cn(
                    "font-medium",
                    currentRsvp === 'yes' ? 'text-success' : 'text-destructive'
                  )}>
                    {currentRsvp === 'yes' ? 'Attending' : 'Not Attending'}
                  </span>
                </div>
              )}
            </div>
          )}

          {event.rsvpStatus && new Date(event.date) < new Date() && (
            <div className="border-t border-border pt-4">
              <span className="text-sm text-muted-foreground">
                You attended: <span className={cn(
                  "font-medium",
                  event.rsvpStatus === 'yes' ? 'text-success' : 'text-destructive'
                )}>
                  {event.rsvpStatus === 'yes' ? 'Yes' : 'No'}
                </span>
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      <Header title="School Events" />
      
      <div className="px-4 py-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Past Events</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground">Check back later for new school events.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No past events</h3>
                  <p className="text-muted-foreground">Past events will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;