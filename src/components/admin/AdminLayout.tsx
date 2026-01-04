import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Heart
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { id: "cars", label: "Car Rent", icon: Car, path: "/admin/cars" },
    { id: "insight", label: "Insight", icon: LineChart, path: "/admin/insight" },
    { id: "reimburse", label: "Reimburse", icon: DollarSign, path: "/admin/reimburse" },
    { id: "inbox", label: "Inbox", icon: Mail, path: "/admin/inbox" },
    { id: "calendar", label: "Calendar", icon: Calendar, path: "/admin/calendar" },
  ];

  const preferenceItems = [
    { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
    { id: "help", label: "Help & Center", icon: HelpCircle, path: "/admin/help" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r p-6 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-primary">MOR</span>
            <br />
            <span className="text-primary">FNT</span>
          </h1>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-xs text-muted-foreground uppercase mb-4">Main Menu</p>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive(item.path)
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
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive(item.path)
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
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
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
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/notifications")}>
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/settings")}>
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

        {children}
      </main>
    </div>
  );
};
