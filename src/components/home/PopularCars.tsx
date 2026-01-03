import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import { getFeaturedCars } from "@/data/cars";

export function PopularCars() {
  const featuredCars = getFeaturedCars();

  return (
    <section className="container py-16 lg:py-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Popular Cars</h2>
          <p className="text-muted-foreground">
            The most popular cars for rent this week
          </p>
        </div>
        <Link to="/catalog" className="hidden sm:block">
          <Button variant="ghost" className="gap-2">
            View All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredCars.slice(0, 4).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link to="/catalog">
          <Button variant="outline" className="gap-2">
            Browse All Cars
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
