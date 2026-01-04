import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  CheckCircle, 
  CreditCard, 
  MapPin, 
  Clock, 
  Gift, 
  Car,
  X,
  Trash2
} from "lucide-react";

interface Notification {
  id: string;
  type: "booking" | "payment" | "tracking" | "promo" | "reminder";
  title: string;
  message: string;
  time: string;
  read: boolean;
  bookingId?: string;
  image?: string;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "tracking",
      title: "Driver on the way",
      message: "Ahmad Nur Fadil is 5 km away. ETA: ~15 minutes",
      time: "5 minutes ago",
      read: false,
      bookingId: "MF-123456",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=100&h=60&fit=crop"
    },
    {
      id: "2",
      type: "booking",
      title: "Booking Confirmed",
      message: "Your booking #MF-123456 has been confirmed. Pick-up: Dec 15, 2024 at 10:00 AM",
      time: "2 hours ago",
      read: false,
      bookingId: "MF-123456"
    },
    {
      id: "3",
      type: "payment",
      title: "Payment Successful",
      message: "$333 paid for booking #MF-123456. Payment method: Visa •••• 1234",
      time: "3 hours ago",
      read: true,
      bookingId: "MF-123456"
    },
    {
      id: "4",
      type: "reminder",
      title: "Rental Starts Soon",
      message: "Your rental begins in 2 hours. Pick-up location: Bogor Car Center",
      time: "2 hours ago",
      read: false,
      bookingId: "MF-123456"
    },
    {
      id: "5",
      type: "promo",
      title: "Special Offer!",
      message: "Get 20% off your next booking. Use code: MORFNT20",
      time: "1 day ago",
      read: true
    },
    {
      id: "6",
      type: "booking",
      title: "Booking Completed",
      message: "Thank you for using MORFNT! Rate your experience with booking #MF-123450",
      time: "3 days ago",
      read: true,
      bookingId: "MF-123450"
    },
    {
      id: "7",
      type: "promo",
      title: "Weekend Special",
      message: "Book this weekend and get free driver upgrade! Limited time offer.",
      time: "5 days ago",
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return <CheckCircle className="w-5 h-5" />;
      case "payment":
        return <CreditCard className="w-5 h-5" />;
      case "tracking":
        return <MapPin className="w-5 h-5" />;
      case "reminder":
        return <Clock className="w-5 h-5" />;
      case "promo":
        return <Gift className="w-5 h-5" />;
    }
  };

  const getBorderColor = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return "border-l-success";
      case "payment":
        return "border-l-success";
      case "tracking":
        return "border-l-primary";
      case "reminder":
        return "border-l-warning";
      case "promo":
        return "border-l-purple-500";
    }
  };

  const getIconBg = (type: Notification["type"]) => {
    switch (type) {
      case "booking":
        return "bg-success/10 text-success";
      case "payment":
        return "bg-success/10 text-success";
      case "tracking":
        return "bg-primary/10 text-primary";
      case "reminder":
        return "bg-warning/10 text-warning";
      case "promo":
        return "bg-purple-100 text-purple-600";
    }
  };

  const filterNotifications = (filter: string) => {
    if (filter === "all") return notifications;
    if (filter === "unread") return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === filter);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card 
      className={`border-l-4 ${getBorderColor(notification.type)} ${
        !notification.read ? "bg-primary/5" : ""
      } hover:shadow-md transition-shadow cursor-pointer`}
      onClick={() => markAsRead(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {notification.image && (
            <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={notification.image} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  {notification.title}
                  {!notification.read && (
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.message}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(notification.id);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              {notification.type === "tracking" && notification.bookingId && (
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/track/${notification.bookingId}`);
                  }}
                >
                  <Car className="w-4 h-4 mr-2" />
                  Track Car
                </Button>
              )}
              {notification.type === "promo" && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/catalog");
                  }}
                >
                  Book Now
                </Button>
              )}
              {notification.bookingId && notification.type !== "tracking" && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/track/${notification.bookingId}`);
                  }}
                >
                  View Details
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setNotifications([])}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="promo">Promotions</TabsTrigger>
          </TabsList>

          {["all", "unread", "booking", "tracking", "promo"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {filterNotifications(tab).length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold mb-2">No notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up! ✨
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filterNotifications(tab).map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;
