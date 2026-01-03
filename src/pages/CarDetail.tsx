import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CarCard } from "@/components/cars/CarCard";
import { getCarById, cars } from "@/data/cars";
import {
  Star,
  Heart,
  Share2,
  Fuel,
  Settings,
  Users,
  Calendar,
  ChevronRight,
  Check,
  Car,
  Palette,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = getCarById(id || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDays, setSelectedDays] = useState(3);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Car not found</h1>
            <Link to="/catalog">
              <Button>Back to Catalog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const similarCars = cars
    .filter((c) => c.category === car.category && c.id !== car.id)
    .slice(0, 4);

  const totalPrice = car.price * selectedDays;
  const tax = Math.round(totalPrice * 0.1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/catalog" className="hover:text-primary">
              Catalog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{car.name}</span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main Image */}
              <div className="bg-card rounded-2xl border border-border p-4 overflow-hidden">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {[car.image, car.image, car.image, car.image].map((img, i) => (
                    <button
                      key={i}
                      className={cn(
                        "aspect-video rounded-lg overflow-hidden border-2 transition-all",
                        i === 0 ? "border-primary" : "border-transparent hover:border-primary/50"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${car.name} view ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Car Info */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold">{car.name}</h1>
                      <Badge variant="secondary">{car.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-star text-star" />
                        <span className="font-semibold">{car.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        | {car.reviews}+ Reviews
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart
                        className={cn(
                          "h-5 w-5",
                          isFavorite && "fill-accent-red text-accent-red"
                        )}
                      />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  Experience the thrill of driving the {car.name}. This stunning{" "}
                  {car.category.toLowerCase()} offers exceptional performance, comfort, and style.
                  Perfect for both city driving and long road trips. Features include premium
                  interior, advanced safety systems, and impressive fuel efficiency.
                </p>

                {/* Specifications */}
                <h3 className="font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Car className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Type</p>
                      <p className="font-medium">{car.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Transmission</p>
                      <p className="font-medium">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="font-medium">{car.capacity} Person</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Fuel className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Fuel</p>
                      <p className="font-medium">{car.fuel}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-semibold mb-4">Customer Reviews</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">{car.rating}</div>
                    <div className="flex items-center justify-center gap-1 my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(car.rating)
                              ? "fill-star text-star"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{car.reviews}+ reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-3">{rating}</span>
                        <Star className="h-3 w-3 fill-star text-star" />
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-star rounded-full"
                            style={{ width: `${rating * 20 - 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[
                    {
                      name: "Alex Stanton",
                      role: "CEO at Amazon",
                      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
                      rating: 5,
                      date: "2 days ago",
                      text: "Amazing car! The experience was incredible. Highly recommend!",
                    },
                    {
                      name: "Sarah Johnson",
                      role: "Marketing Director",
                      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
                      rating: 5,
                      date: "1 week ago",
                      text: "Perfect condition, smooth ride, and great service!",
                    },
                  ].map((review, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/30">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.role}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-star text-star" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-star text-star" />
                      <span className="text-sm">{car.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">${car.price}</span>
                    <span className="text-muted-foreground">/day</span>
                    {car.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${car.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="mb-6">
                  <label className="text-sm font-medium mb-2 block">Rental Duration</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 7, 14].map((days) => (
                      <button
                        key={days}
                        onClick={() => setSelectedDays(days)}
                        className={cn(
                          "py-2 rounded-lg border text-sm font-medium transition-all",
                          selectedDays === days
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {days} {days === 1 ? "day" : "days"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      ${car.price} × {selectedDays} days
                    </span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${totalPrice + tax}</span>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mb-4"
                  onClick={() => navigate("/choose-driver")}
                >
                  Proceed to Driver Selection
                </Button>

                <div className="space-y-2">
                  {[
                    "Free cancellation",
                    "Instant confirmation",
                    "24/7 support",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-success" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Cars */}
          {similarCars.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
