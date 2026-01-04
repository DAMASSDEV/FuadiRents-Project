import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Car,
  Search,
  Filter
} from "lucide-react";
import { cars } from "@/data/cars";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminCars = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Cars", value: cars.length, icon: Car, color: "text-primary" },
    { label: "Available", value: cars.filter(c => c.category === "Sport").length, icon: Car, color: "text-success" },
    { label: "Rented Out", value: 3, icon: Car, color: "text-warning" },
    { label: "Maintenance", value: 1, icon: Car, color: "text-destructive" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Car Management</h1>
            <p className="text-muted-foreground">Manage your fleet of rental cars</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Car
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cars Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Cars</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search cars..." 
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Fuel</TableHead>
                  <TableHead>Transmission</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car, index) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                          <img 
                            src={car.image} 
                            alt={car.name}
                            className="w-14 h-8 object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{car.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {car.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{car.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${car.price}</TableCell>
                    <TableCell>{car.fuel}L</TableCell>
                    <TableCell>{car.transmission}</TableCell>
                    <TableCell>{car.capacity} people</TableCell>
                    <TableCell>
                      <Badge variant={index % 4 === 3 ? "destructive" : index % 3 === 0 ? "default" : "secondary"}>
                        {index % 4 === 3 ? "Maintenance" : index % 3 === 0 ? "Rented" : "Available"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCars;
