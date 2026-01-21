import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CheckCircle, Car, Heart, MapPin } from "lucide-react";
import StatsCounter from "@/components/home/StatsCounter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary/5 border-b">
          <div className="container py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">
              About <span className="morfnt-text-gradient">FuaDIRents</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We’re not just a car rental service — we’re your travel partner.
              From casual trips to business journeys, our focus is comfort,
              safety, and peace of mind.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="container py-12 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
              className="rounded-2xl shadow-lg w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">
              It Started From Something Simple
            </h2>
            <p className="text-muted-foreground mb-4">
              FuaDIRents was born from a simple thought — why is it so hard to
              find a proper rental car? So we created a service that’s simple:
              fast booking, clean cars, friendly drivers, and reasonable
              pricing.
            </p>

            <p className="text-muted-foreground">
              Today, we’ve helped countless people with everything from business
              trips and vacations to family needs — and we’re still growing.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="container py-12">
          <h2 className="text-2xl font-bold text-center mb-10">
            Our Core Values
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="morfnt-card">
              <Car className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Well-Maintained Cars</h3>
              <p className="text-muted-foreground">
                Every car is regularly serviced — so you don’t get any
                “surprises” on the road.
              </p>
            </div>

            <div className="morfnt-card">
              <Heart className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Human-Centered Service</h3>
              <p className="text-muted-foreground">
                We speak like real people — not robotic scripts.
              </p>
            </div>

            <div className="morfnt-card">
              <CheckCircle className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Honest From The Start</h3>
              <p className="text-muted-foreground">
                Clear pricing. No hidden fees. No mysterious charges.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Counter */}
        <StatsCounter />

        {/* Coverage */}
        <section className="bg-card border-t">
          <div className="container py-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Service Areas</h2>
              <p className="text-muted-foreground mb-4">
                We currently serve several major areas — and we’re continuing to
                expand.
              </p>

              <ul className="space-y-2">
                <li className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4 text-primary" />
                  Jakarta & Surrounding Areas
                </li>
                <li className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4 text-primary" />
                  Bandung
                </li>
                <li className="flex gap-2 items-center">
                  <MapPin className="w-4 h-4 text-primary" />
                  Semarang
                </li>
              </ul>
            </div>

            <div>
              <img
                src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg"
                className="rounded-2xl shadow-md w-full object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
