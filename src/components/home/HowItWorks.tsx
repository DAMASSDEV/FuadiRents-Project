import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Car,
  CalendarCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Search,
} from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">

      <main className="flex-1">
        <div className="container py-10">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">How It Works</h1>
            <p className="text-muted-foreground">
              Simple steps to rent your car with comfort & confidence
            </p>
          </div>

          {/* STEPS SECTION */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">1. Find Your Car</h3>
              <p className="text-muted-foreground text-sm">
                Browse and choose the car that fits your trip — daily, weekly,
                or long-term.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">2. Select Date</h3>
              <p className="text-muted-foreground text-sm">
                Pick your rental start and end date. We’ll check availability in
                real-time.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">3. Confirm & Pay</h3>
              <p className="text-muted-foreground text-sm">
                Complete your booking. No hidden fees — everything is clear
                up-front.
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">4. Enjoy The Ride</h3>
              <p className="text-muted-foreground text-sm">
                Pick up your car or have it delivered. Drive safe & enjoy the
                journey 🚗
              </p>
            </Card>
          </div>

          {/* WHY TRUST US */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-3">
                Why Renting With Us Feels Easy
              </h2>
              <p className="text-muted-foreground mb-4">
                We designed the rental process so you don’t have to stress about
                paperwork, unclear pricing, or complicated steps.
              </p>

              <ul className="space-y-3">
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Clear pricing — no hidden costs
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Friendly support, real humans
                </li>
                <li className="flex gap-2 items-center">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Well-maintained & clean cars
                </li>
              </ul>
            </div>

            <img
              src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
              className="rounded-2xl shadow-lg"
            />
          </div>

         
        </div>
      </main>

    </div>
  );
}
