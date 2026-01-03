import { ArrowRight, Shield, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-background">
      <div className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="h-4 w-4 fill-primary" />
              #1 Car Rental Platform
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Best Platform for{" "}
              <span className="morfnt-text-gradient">Car Rental</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Ease of doing a car rental safely and reliably. Of course at a low price.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button variant="hero" size="xl">
                  Rent a Car
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="heroOutline" size="xl">
                Learn More
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure</p>
                  <p className="text-xs text-muted-foreground">Payments</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">24/7</p>
                  <p className="text-xs text-muted-foreground">Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-star/10 flex items-center justify-center">
                  <Star className="h-5 w-5 text-star fill-star" />
                </div>
                <div>
                  <p className="text-sm font-medium">4.9/5</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Cards */}
          <div className="relative">
            <div className="grid gap-6">
              {/* Card 1 */}
              <div className="morfnt-card p-8 bg-primary text-primary-foreground transform hover:scale-[1.02] transition-transform">
                <h3 className="text-xl font-bold mb-2">Premium Experience</h3>
                <p className="text-primary-foreground/80 mb-4">
                  100+ premium cars available for rent
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-sm opacity-80">Cars Available</div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="morfnt-card p-8 transform hover:scale-[1.02] transition-transform">
                <h3 className="text-xl font-bold mb-2">Easy Way to Rent</h3>
                <p className="text-muted-foreground mb-4">
                  Simple booking process at affordable prices
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">$29</div>
                  <div className="text-sm text-muted-foreground">Starting from/day</div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Verified</p>
                  <p className="text-xs text-muted-foreground">All drivers checked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
