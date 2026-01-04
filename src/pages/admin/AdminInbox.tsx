import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Mail, 
  Search, 
  Star,
  Trash2,
  Archive,
  Reply,
  MoreVertical,
  Paperclip
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(0);

  const messages = [
    { 
      id: 0, 
      sender: "John Doe", 
      email: "john@example.com",
      subject: "Question about booking #MF-123456",
      preview: "Hi, I wanted to ask about the pickup location...",
      content: "Hi,\n\nI wanted to ask about the pickup location for my booking #MF-123456. I'm not sure if I can find it easily. Could you please provide me with more detailed directions?\n\nAlso, I was wondering if it's possible to extend my rental for an additional day?\n\nThank you for your help!\n\nBest regards,\nJohn Doe",
      time: "10:30 AM",
      date: "Today",
      unread: true,
      starred: true
    },
    { 
      id: 1, 
      sender: "Jane Smith", 
      email: "jane@example.com",
      subject: "Feedback on recent rental",
      preview: "I had a great experience with the Nissan GT-R...",
      content: "Hello MORFNT Team,\n\nI just wanted to share my feedback on my recent rental experience. The Nissan GT-R was in excellent condition and the driver Ahmad was very professional.\n\nI will definitely recommend your service to my friends!\n\nBest,\nJane Smith",
      time: "9:15 AM",
      date: "Today",
      unread: true,
      starred: false
    },
    { 
      id: 2, 
      sender: "Mike Johnson", 
      email: "mike@example.com",
      subject: "Issue with payment",
      preview: "I'm having trouble with my payment method...",
      content: "Hi Support,\n\nI'm having trouble with my payment method. It keeps showing an error when I try to complete my booking. Could you please help me resolve this issue?\n\nMy card details seem correct, so I'm not sure what's causing the problem.\n\nThanks,\nMike Johnson",
      time: "Yesterday",
      date: "Jan 3",
      unread: false,
      starred: false
    },
    { 
      id: 3, 
      sender: "Sarah Wilson", 
      email: "sarah@example.com",
      subject: "Request for invoice",
      preview: "Could you please send me the invoice for...",
      content: "Dear MORFNT,\n\nCould you please send me the invoice for my recent booking #MF-123450? I need it for my expense report.\n\nThank you!\nSarah Wilson",
      time: "Jan 2",
      date: "Jan 2",
      unread: false,
      starred: true
    },
    { 
      id: 4, 
      sender: "David Brown", 
      email: "david@example.com",
      subject: "Driver cancellation",
      preview: "I need to cancel my driver for tomorrow...",
      content: "Hello,\n\nI need to cancel my driver for tomorrow's booking. I've decided to drive myself instead. Will there be any charges for this cancellation?\n\nPlease let me know.\n\nRegards,\nDavid Brown",
      time: "Jan 1",
      date: "Jan 1",
      unread: false,
      starred: false
    },
  ];

  const selected = messages.find(m => m.id === selectedMessage);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Inbox</h1>
            <p className="text-muted-foreground">Manage customer messages and inquiries</p>
          </div>
          <Badge variant="secondary" className="text-primary">
            {messages.filter(m => m.unread).length} unread
          </Badge>
        </div>

        {/* Mail Layout */}
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Message List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-9" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-340px)]">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                    className={`p-4 border-b cursor-pointer transition-colors ${
                      selectedMessage === message.id ? "bg-primary/5" : "hover:bg-muted/50"
                    } ${message.unread ? "bg-primary/5" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
                        {message.sender.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium truncate ${message.unread ? "text-foreground" : "text-muted-foreground"}`}>
                            {message.sender}
                          </p>
                          <div className="flex items-center gap-1">
                            {message.starred && <Star className="w-3 h-3 fill-warning text-warning" />}
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                          </div>
                        </div>
                        <p className={`text-sm truncate ${message.unread ? "font-medium" : "text-muted-foreground"}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-1">
                          {message.preview}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message Detail */}
          <Card className="lg:col-span-2">
            {selected ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{selected.subject}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium">{selected.sender}</span>
                        <span className="text-sm text-muted-foreground">&lt;{selected.email}&gt;</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Star className={`w-4 h-4 ${selected.starred ? "fill-warning text-warning" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{selected.date} at {selected.time}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <ScrollArea className="h-[calc(100vh-520px)]">
                    <div className="whitespace-pre-wrap text-sm">
                      {selected.content}
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Write a reply..." className="flex-1" />
                    <Button variant="ghost" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button>
                      <Reply className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-4" />
                  <p>Select a message to read</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInbox;
