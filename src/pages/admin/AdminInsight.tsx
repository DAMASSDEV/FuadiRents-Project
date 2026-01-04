import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Car, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const AdminInsight = () => {
  const revenueData = [
    { month: "Jan", revenue: 4000, bookings: 24 },
    { month: "Feb", revenue: 3000, bookings: 18 },
    { month: "Mar", revenue: 5000, bookings: 32 },
    { month: "Apr", revenue: 4500, bookings: 28 },
    { month: "May", revenue: 6000, bookings: 45 },
    { month: "Jun", revenue: 5500, bookings: 38 },
    { month: "Jul", revenue: 7000, bookings: 52 },
  ];

  const categoryData = [
    { name: "Sport", value: 35, color: "#4F7CFF" },
    { name: "SUV", value: 25, color: "#6B9EFF" },
    { name: "Sedan", value: 20, color: "#2C2C2C" },
    { name: "Hatchback", value: 12, color: "#9CA3AF" },
    { name: "MPV", value: 8, color: "#E5E7EB" },
  ];

  const stats = [
    { 
      label: "Total Revenue", 
      value: "$35,000", 
      change: "+12.5%", 
      trend: "up",
      icon: DollarSign 
    },
    { 
      label: "Total Bookings", 
      value: "237", 
      change: "+8.2%", 
      trend: "up",
      icon: Calendar 
    },
    { 
      label: "Active Users", 
      value: "1,429", 
      change: "+15.3%", 
      trend: "up",
      icon: Users 
    },
    { 
      label: "Cars Available", 
      value: "45", 
      change: "-2.4%", 
      trend: "down",
      icon: Car 
    },
  ];

  const topCars = [
    { name: "Nissan GT-R", bookings: 45, revenue: 3600 },
    { name: "Koenigsegg", bookings: 38, revenue: 3762 },
    { name: "Rolls-Royce", bookings: 32, revenue: 3072 },
    { name: "Honda CR-V", bookings: 28, revenue: 2240 },
    { name: "Toyota Camry", bookings: 25, revenue: 1875 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Insights & Analytics</h1>
            <p className="text-muted-foreground">Track your business performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Last 7 Days</Button>
            <Button variant="outline">Last 30 Days</Button>
            <Button>This Year</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${stat.trend === "up" ? "bg-success/10" : "bg-destructive/10"}`}>
                    <stat.icon className={`w-5 h-5 ${stat.trend === "up" ? "text-success" : "text-destructive"}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#4F7CFF" 
                      strokeWidth={3}
                      dot={{ fill: "#4F7CFF", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    <span className="text-sm font-medium">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Bookings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="#4F7CFF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Cars */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCars.map((car, index) => (
                  <div key={car.name} className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium">{car.name}</p>
                      <p className="text-sm text-muted-foreground">{car.bookings} bookings</p>
                    </div>
                    <p className="font-semibold text-primary">${car.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInsight;
