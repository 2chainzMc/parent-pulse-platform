import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, Paperclip, ArrowLeft } from 'lucide-react';
import { mockMessages } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedChatData = selectedChat 
    ? mockMessages.find(msg => msg.id === selectedChat)
    : null;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Here you would implement the actual message sending logic
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  if (selectedChat && selectedChatData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
        <Header 
          title={`${selectedChatData.teacherName} - ${selectedChatData.subject}`}
          showNotifications={false}
        />
        
        <div className="flex items-center px-4 py-2 bg-card border-b border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedChat(null)}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback>
              {selectedChatData.teacherName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{selectedChatData.teacherName}</p>
            <p className="text-xs text-muted-foreground">{selectedChatData.subject}</p>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {selectedChatData.messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'parent' ? 'justify-end' : 'justify-start'
              )}
            >
              <div 
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.sender === 'parent' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border border-border'
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className={cn(
                  "text-xs mt-1",
                  message.sender === 'parent' 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                )}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-16 left-0 right-0 p-4 bg-card border-t border-border">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Paperclip size={20} />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted pb-20">
      <Header title="Messages" />
      
      <div className="px-4 py-6 space-y-4">
        {mockMessages.map((message) => (
          <Card 
            key={message.id} 
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => setSelectedChat(message.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>
                    {message.teacherName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {message.teacherName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {message.unread && (
                        <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-1">{message.subject}</p>
                  
                  <p className={cn(
                    "text-sm truncate",
                    message.unread ? "font-medium text-foreground" : "text-muted-foreground"
                  )}>
                    {message.lastMessage}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {mockMessages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No messages</h3>
              <p className="text-muted-foreground">Your conversations with teachers will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Messages;