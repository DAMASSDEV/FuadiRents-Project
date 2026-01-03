import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Phone,
  MessageSquare,
  Share2,
  RefreshCw,
  MapPin,
  Clock,
  Check,
  Star,
  Car,
  Navigation,
  ChevronRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock booking data
const mockBooking = {
  id: "MF-123456",
  car: {
    name: "Nissan GT-R",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
  },
  driver: {
    name: "Ahmad Nur Fadil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 4.9,
    phone: "+62 812-3456-7890",
    vehicle: {
      model: "Gray Honda CR-V",
      plate: "B 1234 XYZ",
    },
  },
  pickup: {
    location: "Bogor Car Center",
    coordinates: [-6.5971, 106.8060], // Bogor
  },
  status: "on_the_way",
  eta: 8,
  distance: 2.5,
};

// Simulated driver path (for demo animation)
const driverPath = [
  [106.7960, -6.6071],
  [106.7990, -6.6041],
  [106.8010, -6.6011],
  [106.8030, -6.5991],
  [106.8050, -6.5981],
  [106.8060, -6.5971],
];

interface TimelineStep {
  label: string;
  time: string;
  status: "completed" | "current" | "pending";
}

const timelineSteps: TimelineStep[] = [
  { label: "Booking confirmed", time: "Today, 10:00 AM", status: "completed" },
  { label: "Payment received", time: "Today, 10:01 AM", status: "completed" },
  { label: "Driver assigned", time: "Today, 10:05 AM", status: "completed" },
  { label: "Driver on the way", time: "Today, 10:30 AM", status: "current" },
  { label: "Car delivered", time: "Pending", status: "pending" },
];

export default function TrackCar() {
  const { bookingId } = useParams();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const driverMarker = useRef<mapboxgl.Marker | null>(null);
  
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [driverPosition, setDriverPosition] = useState(0);
  const [eta, setEta] = useState(mockBooking.eta);
  const [distance, setDistance] = useState(mockBooking.distance);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const booking = mockBooking;

  // Initialize map
  const initializeMap = useCallback(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [106.8000, -6.6020],
        zoom: 14,
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        "top-right"
      );

      map.current.on("load", () => {
        setIsMapLoaded(true);

        // Add pickup location marker
        new mapboxgl.Marker({ color: "#22c55e" })
          .setLngLat([booking.pickup.coordinates[1], booking.pickup.coordinates[0]])
          .setPopup(new mapboxgl.Popup().setHTML("<strong>Pickup Location</strong><br/>Bogor Car Center"))
          .addTo(map.current!);

        // Add user location marker (pulsing)
        const userEl = document.createElement("div");
        userEl.className = "user-location-marker";
        userEl.innerHTML = `
          <div class="pulse-ring"></div>
          <div class="pulse-dot"></div>
        `;
        new mapboxgl.Marker(userEl)
          .setLngLat([106.8060, -6.5971])
          .addTo(map.current!);

        // Add driver marker
        const driverEl = document.createElement("div");
        driverEl.className = "driver-marker";
        driverEl.innerHTML = `
          <div class="driver-icon">🚗</div>
        `;
        driverMarker.current = new mapboxgl.Marker(driverEl)
          .setLngLat(driverPath[0] as [number, number])
          .addTo(map.current!);

        // Add route line
        map.current!.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: driverPath,
            },
          },
        });

        map.current!.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#4F7CFF",
            "line-width": 4,
            "line-dasharray": [2, 1],
          },
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [mapboxToken, booking]);

  // Simulate driver movement
  useEffect(() => {
    if (!isMapLoaded || !autoRefresh) return;

    const interval = setInterval(() => {
      setDriverPosition((prev) => {
        const next = Math.min(prev + 1, driverPath.length - 1);
        
        if (driverMarker.current && map.current) {
          driverMarker.current.setLngLat(driverPath[next] as [number, number]);
          
          // Update ETA and distance
          const remaining = driverPath.length - 1 - next;
          setEta(Math.max(1, Math.round(remaining * 1.5)));
          setDistance(Math.max(0.1, (remaining * 0.5).toFixed(1) as unknown as number));
          setLastUpdated(new Date());
        }
        
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isMapLoaded, autoRefresh]);

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, initializeMap]);

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Track Your Car</h1>
              <p className="text-muted-foreground">
                Booking #{booking.id}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={cn(autoRefresh && "border-primary text-primary")}
              >
                <RefreshCw className={cn("h-4 w-4 mr-2", autoRefresh && "animate-spin")} />
                Auto-refresh: {autoRefresh ? "ON" : "OFF"}
              </Button>
            </div>
          </div>

          {/* Mapbox Token Input (if not set) */}
          {!mapboxToken && (
            <div className="bg-card rounded-2xl border border-border p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-6 w-6 text-warning" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Mapbox Token Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    To display the interactive map, please enter your Mapbox public token. 
                    Get one free at{" "}
                    <a
                      href="https://mapbox.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      mapbox.com
                    </a>
                  </p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter your Mapbox public token..."
                      className="max-w-md"
                      onChange={(e) => setMapboxToken(e.target.value)}
                    />
                    <Button onClick={initializeMap}>Load Map</Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Booking Summary Card */}
              <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                <div className="w-20 h-14 rounded-lg overflow-hidden bg-muted shrink-0">
                  <img
                    src={booking.car.image}
                    alt={booking.car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{booking.car.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Booking #{booking.id}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "capitalize",
                    booking.status === "on_the_way" && "bg-primary"
                  )}
                >
                  🔵 Driver on the way
                </Badge>
              </div>

              {/* Map Container */}
              <div className="relative bg-card rounded-2xl border border-border overflow-hidden">
                <div
                  ref={mapContainer}
                  className="w-full h-[400px] lg:h-[500px]"
                  style={{
                    background: mapboxToken ? undefined : "linear-gradient(135deg, #e0e7ff 0%, #f0f4ff 100%)",
                  }}
                >
                  {!mapboxToken && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Enter Mapbox token to load map
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ETA Overlay */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-xl border border-border p-4 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="text-2xl font-bold">{distance} km</p>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div>
                      <p className="text-sm text-muted-foreground">ETA</p>
                      <p className="text-2xl font-bold">~{eta} min</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </p>
                </div>

                {/* Center Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 left-4 bg-card/95 backdrop-blur"
                  onClick={() => {
                    map.current?.flyTo({
                      center: [106.8000, -6.6020],
                      zoom: 14,
                    });
                  }}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Center Map
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Driver Info Card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Driver Information</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={booking.driver.avatar}
                    alt={booking.driver.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-background shadow-md"
                  />
                  <div>
                    <p className="font-semibold">{booking.driver.name}</p>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-star text-star" />
                      <span>{booking.driver.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.driver.vehicle.model}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="h-4 w-4 flex items-center justify-center text-muted-foreground text-xs font-bold">
                      #
                    </div>
                    <span>{booking.driver.vehicle.plate}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.driver.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Booking Status</h3>
                <div className="space-y-4">
                  {timelineSteps.map((step, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                            step.status === "completed" && "bg-success text-white",
                            step.status === "current" && "bg-primary text-white",
                            step.status === "pending" && "bg-muted text-muted-foreground"
                          )}
                        >
                          {step.status === "completed" ? (
                            <Check className="h-3 w-3" />
                          ) : step.status === "current" ? (
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                          )}
                        </div>
                        {index < timelineSteps.length - 1 && (
                          <div
                            className={cn(
                              "w-0.5 h-8 mt-1",
                              step.status === "completed" ? "bg-success" : "bg-muted"
                            )}
                          />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p
                          className={cn(
                            "font-medium",
                            step.status === "pending" && "text-muted-foreground"
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share My Location
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleRefresh}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Status
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                  >
                    Cancel Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Custom marker styles */}
      <style>{`
        .user-location-marker {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .pulse-ring {
          position: absolute;
          width: 40px;
          height: 40px;
          left: -10px;
          top: -10px;
          border-radius: 50%;
          background: rgba(79, 124, 255, 0.3);
          animation: pulse-ring 1.5s infinite;
        }
        .pulse-dot {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4F7CFF;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .driver-marker {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .driver-icon {
          font-size: 28px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          animation: bounce 1s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .mapboxgl-ctrl-group {
          border-radius: 12px !important;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
