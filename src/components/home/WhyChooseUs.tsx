import { Car, DollarSign, Star, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Car,
    title: "Wide Selection",
    description: "Choose from 100+ cars including sports, SUVs, sedans and more.",
    stat: "100+",
    statLabel: "Cars",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    description: "Competitive rates with no hidden fees. Get the best value.",
    stat: "$29",
    statLabel: "Starting",
  },
  {
    icon: Star,
    title: "Professional Drivers",
    description: "Verified, experienced drivers for your safety and comfort.",
    stat: "50+",
    statLabel: "Drivers",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support whenever you need us.",
    stat: "24/7",
    statLabel: "Support",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer the best car rental experience with premium service and unbeatable value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{benefit.description}</p>
              <div className="pt-4 border-t border-border">
                <span className="text-2xl font-bold text-primary">{benefit.stat}</span>
                <span className="text-sm text-muted-foreground ml-1">{benefit.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
