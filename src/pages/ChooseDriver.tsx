import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  Check,
  MapPin,
  Globe,
  Shield,
  ChevronRight,
  ArrowLeft,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";

const drivers = [
  {
    id: "1",
    name: "Ahmad Nur Fadil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 4.9,
    trips: 312,
    experience: 7,
    languages: ["English", "Indonesian", "Arabic"],
    license: "Professional A+",
    specializations: ["City Expert", "Professional", "Premium"],
    pricePerDay: 30,
    verified: true,
  },
  {
    id: "2",
    name: "Firmansyah Fuadi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    rating: 4.8,
    trips: 289,
    experience: 5,
    languages: ["English", "Indonesian", "Mandarin"],
    license: "Professional A",
    specializations: ["Long Distance", "Premium"],
    pricePerDay: 35,
    verified: true,
  },
  {
    id: "3",
    name: "Tito Bahtiar",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rating: 4.7,
    trips: 198,
    experience: 4,
    languages: ["English", "Indonesian"],
    license: "Professional B",
    specializations: ["City Expert", "Professional"],
    pricePerDay: 25,
    verified: true,
  },
  {
    id: "4",
    name: "Siti Rahma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 4.9,
    trips: 267,
    experience: 6,
    languages: ["English", "Indonesian", "Japanese"],
    license: "Professional A+",
    specializations: ["City Expert", "Long Distance", "Premium"],
    pricePerDay: 32,
    verified: true,
  },
];

export default function ChooseDriver() {
  const navigate = useNavigate();
  const [withDriver, setWithDriver] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success text-primary-foreground flex items-center justify-center text-sm font-medium">
                <Check className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Car Selection</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium">Driver Selection</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-muted-foreground">Payment</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Car Details
            </Link>
            <h1 className="text-3xl font-bold mb-2">Choose Your Driver</h1>
            <p className="text-muted-foreground">
              Select a professional driver or drive yourself
            </p>
          </div>

          {/* Toggle */}
          <div className="bg-card rounded-xl border border-border p-2 inline-flex gap-2 mb-8">
            <button
              onClick={() => setWithDriver(true)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                withDriver
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              With Driver
            </button>
            <button
              onClick={() => setWithDriver(false)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all",
                !withDriver
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Without Driver
            </button>
          </div>

          {withDriver ? (
            <>
              {/* Location Card */}
              <div className="bg-card rounded-xl border border-border p-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Current Location</p>
                    <p className="font-semibold">Bogor, West Java, Indonesia</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Change Location
                  </Button>
                </div>
              </div>

              {/* Driver Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {drivers.map((driver) => (
                  <div
                    key={driver.id}
                    className={cn(
                      "bg-card rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg cursor-pointer",
                      selectedDriver === driver.id
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/30"
                    )}
                    onClick={() => setSelectedDriver(driver.id)}
                  >
                    {/* Favorite & Selected */}
                    <div className="flex justify-between items-start mb-4">
                      {selectedDriver === driver.id && (
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(driver.id);
                        }}
                        className="ml-auto"
                      >
                        <Heart
                          className={cn(
                            "h-5 w-5 transition-colors",
                            favorites.includes(driver.id)
                              ? "fill-accent-red text-accent-red"
                              : "text-muted-foreground hover:text-accent-red"
                          )}
                        />
                      </button>
                    </div>

                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <img
                        src={driver.avatar}
                        alt={driver.name}
                        className="w-full h-full rounded-full object-cover border-4 border-background shadow-md"
                      />
                      {driver.verified && (
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-background">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Name & Experience */}
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-lg">{driver.name}</h3>
                      <Badge variant="secondary" className="mt-2">
                        {driver.experience} Years Experience
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Star className="h-5 w-5 fill-star text-star" />
                      <span className="font-semibold">{driver.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({driver.trips} trips)
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        {driver.languages.join(", ")}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        {driver.license}
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {driver.specializations.map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="text-center pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">
                        +${driver.pricePerDay}
                      </span>
                      <span className="text-muted-foreground">/day</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Self-Drive Requirements */
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Car className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Self-Drive Requirements</h2>
                  <p className="text-muted-foreground">
                    Please ensure you meet these requirements
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Valid driver's license",
                    "Minimum age: 23 years",
                    "Security deposit: $200",
                    "Insurance included",
                    "Max rental period: 30 days",
                  ].map((req, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <p className="text-muted-foreground mb-2">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">Front of license</p>
                  </div>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <p className="text-muted-foreground mb-2">
                      Drag & drop or click to upload
                    </p>
                    <p className="text-sm text-muted-foreground">Back of license</p>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Or{" "}
                  <button
                    onClick={() => setWithDriver(true)}
                    className="text-primary hover:underline"
                  >
                    choose a driver instead
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
            <div className="container flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {withDriver && selectedDriver
                    ? `Driver: ${drivers.find((d) => d.id === selectedDriver)?.name}`
                    : "No driver selected"}
                </p>
                {withDriver && selectedDriver && (
                  <p className="font-semibold">
                    +${drivers.find((d) => d.id === selectedDriver)?.pricePerDay}/day
                  </p>
                )}
              </div>
              <Button
                variant="hero"
                size="lg"
                onClick={() => navigate("/payment")}
                disabled={withDriver && !selectedDriver}
              >
                Continue to Payment
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="h-20" /> {/* Spacer for fixed bottom bar */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
