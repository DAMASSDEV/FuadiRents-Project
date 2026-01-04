import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Car, Calendar, MapPin, User } from "lucide-react";

const Confirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-success/10 rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for choosing MORFNT!</p>
          <p className="text-lg font-medium text-primary mb-8">
            Booking Reference: #{bookingId}
          </p>

          {/* Booking Details Card */}
          <Card className="text-left mb-8">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Nissan GT-R</h3>
                  <p className="text-sm text-muted-foreground">Sport Car • Manual</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pick-up</p>
                    <p className="font-medium">Dec 15, 2024 at 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Drop-off</p>
                    <p className="font-medium">Dec 18, 2024 at 10:00 AM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Bogor Car Center, West Java</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Driver</p>
                  <p className="font-medium">Ahmad Nur Fadil • ★ 4.9</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Paid</span>
                  <span className="text-xl font-bold text-primary">$333.00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next Timeline */}
          <Card className="text-left mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-success-foreground text-xs">
                    ✓
                  </div>
                  <div>
                    <p className="font-medium">Confirmation email sent</p>
                    <p className="text-sm text-muted-foreground">Check your inbox</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Prepare your documents</p>
                    <p className="text-sm text-muted-foreground">Valid ID and driver's license</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Pick up your car</p>
                    <p className="text-sm text-muted-foreground">Dec 15, 2024 at 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Enjoy your ride!</p>
                    <p className="text-sm text-muted-foreground">Have a safe journey</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Download Receipt
            </Button>
            <Button onClick={() => navigate(`/track/${bookingId}`)}>
              Track Your Car
            </Button>
            <Button variant="outline" onClick={() => navigate("/catalog")}>
              Book Another Car
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Confirmation;
