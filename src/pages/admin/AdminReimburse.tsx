import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Eye
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminReimburse = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const reimbursements = [
    { id: "RMB-001", customer: "John Doe", type: "Refund", amount: 150, date: "2024-01-15", status: "approved", booking: "MF-123456" },
    { id: "RMB-002", customer: "Jane Smith", type: "Damage Claim", amount: 500, date: "2024-01-14", status: "pending", booking: "MF-123457" },
    { id: "RMB-003", customer: "Mike Johnson", type: "Refund", amount: 80, date: "2024-01-13", status: "approved", booking: "MF-123458" },
    { id: "RMB-004", customer: "Sarah Wilson", type: "Cancellation", amount: 200, date: "2024-01-12", status: "rejected", booking: "MF-123459" },
    { id: "RMB-005", customer: "David Brown", type: "Refund", amount: 120, date: "2024-01-11", status: "pending", booking: "MF-123460" },
    { id: "RMB-006", customer: "Emily Davis", type: "Damage Claim", amount: 350, date: "2024-01-10", status: "approved", booking: "MF-123461" },
  ];

  const stats = [
    { label: "Total Requests", value: "156", icon: DollarSign, color: "text-primary" },
    { label: "Pending", value: "23", icon: Clock, color: "text-warning" },
    { label: "Approved", value: "118", icon: CheckCircle, color: "text-success" },
    { label: "Rejected", value: "15", icon: XCircle, color: "text-destructive" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Approved</Badge>;
      case "pending":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reimbursements</h1>
            <p className="text-muted-foreground">Manage refunds and reimbursement requests</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
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

        {/* Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Reimbursement Requests</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search requests..." 
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
                  <TableHead>Request ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reimbursements.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.customer}</TableCell>
                    <TableCell className="text-primary">#{item.booking}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${item.amount}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button variant="ghost" size="icon" className="text-success">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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

export default AdminReimburse;
