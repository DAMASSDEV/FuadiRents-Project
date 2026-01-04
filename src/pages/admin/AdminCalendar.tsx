import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Car,
  User,
  Clock
} from "lucide-react";

const AdminCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const bookings = [
    { date: 5, car: "Nissan GT-R", customer: "John Doe", type: "pickup" },
    { date: 5, car: "Honda CR-V", customer: "Jane Smith", type: "return" },
    { date: 8, car: "Rolls-Royce", customer: "Mike Johnson", type: "pickup" },
    { date: 12, car: "Toyota Camry", customer: "Sarah Wilson", type: "pickup" },
    { date: 12, car: "Nissan GT-R", customer: "John Doe", type: "return" },
    { date: 15, car: "Koenigsegg", customer: "David Brown", type: "pickup" },
    { date: 18, car: "Honda CR-V", customer: "Emily Davis", type: "pickup" },
    { date: 22, car: "Koenigsegg", customer: "David Brown", type: "return" },
    { date: 25, car: "Mercedes S-Class", customer: "Alex Turner", type: "pickup" },
  ];

  const getBookingsForDay = (day: number) => {
    return bookings.filter(b => b.date === day);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const upcomingBookings = [
    { id: 1, car: "Nissan GT-R", customer: "John Doe", date: "Jan 5, 2024", time: "10:00 AM", type: "pickup" },
    { id: 2, car: "Honda CR-V", customer: "Jane Smith", date: "Jan 5, 2024", time: "2:00 PM", type: "return" },
    { id: 3, car: "Rolls-Royce", customer: "Mike Johnson", date: "Jan 8, 2024", time: "9:00 AM", type: "pickup" },
    { id: 4, car: "Toyota Camry", customer: "Sarah Wilson", date: "Jan 12, 2024", time: "11:00 AM", type: "pickup" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">Manage bookings and schedules</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-24 bg-muted/30 rounded-lg" />
                ))}

                {/* Days of month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayBookings = getBookingsForDay(day);
                  const isToday = day === 5; // Simulating today as Jan 5

                  return (
                    <div 
                      key={day} 
                      className={`h-24 border rounded-lg p-2 hover:bg-muted/50 transition-colors cursor-pointer ${
                        isToday ? "border-primary bg-primary/5" : ""
                      }`}
                    >
                      <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>
                        {day}
                      </span>
                      <div className="mt-1 space-y-1">
                        {dayBookings.slice(0, 2).map((booking, idx) => (
                          <div 
                            key={idx}
                            className={`text-xs px-1 py-0.5 rounded truncate ${
                              booking.type === "pickup" 
                                ? "bg-success/10 text-success" 
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            {booking.car}
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{dayBookings.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-success/20" />
                  <span className="text-sm text-muted-foreground">Pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-warning/20" />
                  <span className="text-sm text-muted-foreground">Return</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant={booking.type === "pickup" ? "default" : "secondary"}>
                      {booking.type === "pickup" ? "Pickup" : "Return"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    <span className="font-medium text-sm">{booking.car}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{booking.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{booking.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCalendar;
