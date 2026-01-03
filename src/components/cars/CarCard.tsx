import { Link } from "react-router-dom";
import { Heart, Fuel, Settings, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car } from "@/data/cars";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CarCardProps {
  car: Car;
  className?: string;
}

export function CarCard({ car, className }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className={cn(
        "group bg-card rounded-2xl border border-border p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Image Container */}
      <div className="relative mb-4">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center transition-colors hover:bg-background"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isFavorite ? "fill-accent-red text-accent-red" : "text-muted-foreground"
            )}
          />
        </button>
        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{car.name}</h3>
            <Badge variant="secondary" className="mt-1">
              {car.category}
            </Badge>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-star text-star" />
          <span className="text-sm font-medium">{car.rating}</span>
          <span className="text-sm text-muted-foreground">({car.reviews})</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{car.capacity}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-primary">${car.price}</span>
            <span className="text-muted-foreground">/day</span>
            {car.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${car.originalPrice}
              </span>
            )}
          </div>
          <Link to={`/car/${car.id}`}>
            <Button size="sm">Rent Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
