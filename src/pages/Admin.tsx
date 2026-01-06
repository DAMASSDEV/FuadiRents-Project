import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard, 
  Car, 
  LineChart, 
  DollarSign, 
  Mail, 
  Calendar, 
  Settings, 
  HelpCircle, 
  Moon, 
  LogOut,
  Search,
  Bell,
  MapPin,
  MoreHorizontal
} from "lucide-react";
import { cars } from "@/data/cars";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "cars", label: "Car Rent", icon: Car },
    { id: "insight", label: "Insight", icon: LineChart },
    { id: "reimburse", label: "Reimburse", icon: DollarSign },
    { id: "inbox", label: "Inbox", icon: Mail },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  const preferenceItems = [
    { id: "settings", label: "Settings", icon: Settings },
    { id: "help", label: "Help & Center", icon: HelpCircle },
  ];

  const recentTransactions = [
    { name: "Nissan GT-R", type: "Sport Car", date: "20 July", price: "$80.00", image: cars[1].image },
    { name: "Koenigsegg", type: "Sport Car", date: "19 July", price: "$99.00", image: cars[0].image },
    { name: "Rolls-Royce", type: "Sport Car", date: "18 July", price: "$96.00", image: cars[2].image },
    { name: "CR-V", type: "SUV", date: "17 July", price: "$80.00", image: cars[4].image },
  ];

  const topCarRentals = [
    { type: "Sport Car", count: 17439, color: "#4F7CFF" },
    { type: "SUV", count: 9478, color: "#6B9EFF" },
    { type: "Coupe", count: 18197, color: "#2C2C2C" },
    { type: "Hatchback", count: 12510, color: "#4F7CFF" },
    { type: "MPV", count: 14406, color: "#6B9EFF" },
  ];

  const totalRentals = topCarRentals.reduce((acc, car) => acc + car.count, 0);

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-6 flex flex-col">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-primary">FuaDI</span>
            <br />
            <span className="text-primary">Rents</span>
          </h1>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground uppercase mb-4">Main Menu</p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Preferences */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground uppercase mb-4">Preferences</p>
          <nav className="space-y-1">
            {preferenceItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5" />
                <span className="font-medium">Dark Mode</span>
              </div>
              <div className={`w-10 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-muted'} relative`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? 'left-5' : 'left-1'}`} />
              </div>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search something here" 
              className="pl-10 bg-card border-0"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              <span className="text-xl">♡</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Details Rental */}
          <Card>
            <CardHeader>
              <CardTitle>Details Rental</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Map */}
              <div className="h-40 bg-primary/10 rounded-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 400 160" className="w-full h-full">
                    <path d="M0,80 Q100,40 200,80 T400,80" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <path d="M50,60 Q150,100 250,60 T350,60" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
                  </svg>
                </div>
              </div>

              {/* Car Info */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img 
                    src={cars[1].image} 
                    alt="Nissan GT-R" 
                    className="w-20 h-12 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Nissan GT - R</h3>
                  <p className="text-sm text-muted-foreground">Sport Car</p>
                </div>
                <span className="text-sm text-muted-foreground">#9761</span>
              </div>

              {/* Pick Up */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Pick - Up</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Locations</p>
                    <p className="text-sm font-medium">Kota Semarang</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">20 July 2022</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">07:00</p>
                  </div>
                </div>
              </div>

              {/* Drop Off */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary border-2 border-primary" />
                  <span className="text-sm font-medium">Drop - Off</span>
                </div>
                <div className="grid grid-cols-3 gap-4 pl-5">
                  <div>
                    <p className="text-xs text-muted-foreground">Locations</p>
                    <p className="text-sm font-medium">Kota Semarang</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">21 July 2022</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">01:00</p>
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="font-semibold">Total Rental Price</p>
                  <p className="text-xs text-muted-foreground">Overall price and includes rental discount</p>
                </div>
                <span className="text-2xl font-bold">$80.00</span>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top 5 Car Rental */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Top 5 Car Rental</CardTitle>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex gap-8">
                  {/* Donut Chart */}
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {topCarRentals.map((car, index) => {
                        const percentage = (car.count / totalRentals) * 100;
                        const offset = topCarRentals.slice(0, index).reduce((acc, c) => acc + (c.count / totalRentals) * 100, 0);
                        return (
                          <circle
                            key={car.type}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={car.color}
                            strokeWidth="20"
                            strokeDasharray={`${percentage * 2.51} 251`}
                            strokeDashoffset={`${-offset * 2.51}`}
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">{totalRentals.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">Rental Car</span>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex-1 space-y-2">
                    {topCarRentals.map((car) => (
                      <div key={car.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: car.color }}
                          />
                          <span className="text-sm">{car.type}</span>
                        </div>
                        <span className="text-sm font-medium">{car.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transaction */}
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Recent Transaction</CardTitle>
                <Button variant="link" className="text-primary p-0 h-auto">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                      <img 
                        src={transaction.image} 
                        alt={transaction.name} 
                        className="w-16 h-10 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{transaction.name}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      <p className="font-semibold">{transaction.price}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
