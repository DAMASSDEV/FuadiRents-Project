import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CarCard } from "@/components/cars/CarCard";
import { cars, Car } from "@/data/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Filter, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"];
const capacities = [2, 4, 6, 8];
const transmissions = ["Manual", "Automatic"];

export default function Catalog() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([100]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search filter
    if (searchQuery) {
      result = result.filter((car) =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((car) => selectedCategories.includes(car.category));
    }

    // Capacity filter
    if (selectedCapacities.length > 0) {
      result = result.filter((car) => selectedCapacities.includes(car.capacity));
    }

    // Transmission filter
    if (selectedTransmissions.length > 0) {
      result = result.filter((car) =>
        selectedTransmissions.includes(car.transmission)
      );
    }

    // Price filter
    result = result.filter((car) => car.price <= priceRange[0]);

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // recommended - featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedCapacities,
    selectedTransmissions,
    priceRange,
    sortBy,
  ]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleCapacity = (capacity: number) => {
    setSelectedCapacities((prev) =>
      prev.includes(capacity)
        ? prev.filter((c) => c !== capacity)
        : [...prev, capacity]
    );
  };

  const toggleTransmission = (transmission: string) => {
    setSelectedTransmissions((prev) =>
      prev.includes(transmission)
        ? prev.filter((t) => t !== transmission)
        : [...prev, transmission]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCapacities([]);
    setSelectedTransmissions([]);
    setPriceRange([100]);
    setSearchQuery("");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedCapacities.length +
    selectedTransmissions.length +
    (priceRange[0] < 100 ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect Car</h1>
            <p className="text-muted-foreground">
              Browse our collection of {cars.length}+ premium cars
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search cars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 gap-2 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 rounded-lg border border-input bg-background"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside
              className={cn(
                "w-72 shrink-0 space-y-6",
                "hidden lg:block",
                showFilters && "fixed inset-0 z-50 bg-background p-6 lg:relative lg:p-0 block"
              )}
            >
              {/* Mobile Filter Header */}
              <div className="flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Type Filter */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-4">Type</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <span className="text-sm">{category}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        ({cars.filter((c) => c.category === category).length})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity Filter */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-4">Capacity</h3>
                <div className="space-y-3">
                  {capacities.map((capacity) => (
                    <label
                      key={capacity}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedCapacities.includes(capacity)}
                        onCheckedChange={() => toggleCapacity(capacity)}
                      />
                      <span className="text-sm">{capacity} Person</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={150}
                  min={20}
                  step={5}
                  className="mb-3"
                />
                <p className="text-sm text-muted-foreground">
                  Max: ${priceRange[0]}/day
                </p>
              </div>

              {/* Transmission Filter */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="font-semibold mb-4">Transmission</h3>
                <div className="space-y-3">
                  {transmissions.map((transmission) => (
                    <label
                      key={transmission}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedTransmissions.includes(transmission)}
                        onCheckedChange={() => toggleTransmission(transmission)}
                      />
                      <span className="text-sm">{transmission}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Reset Filters
                </Button>
              )}
            </aside>

            {/* Car Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCars.length} of {cars.length} cars
                </p>
              </div>

              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No cars found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={clearFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
