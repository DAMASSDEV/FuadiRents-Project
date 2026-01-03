import { MapPin, Car, UserCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Choose Location",
    description: "Select your pickup and drop-off location with date and time.",
  },
  {
    icon: Car,
    title: "Select Your Car",
    description: "Browse our wide selection and find your perfect ride.",
  },
  {
    icon: UserCheck,
    title: "Choose Driver",
    description: "Optional professional driver or drive yourself.",
  },
  {
    icon: CheckCircle,
    title: "Complete Booking",
    description: "Confirm your booking and enjoy your journey.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Rent a car in just 4 simple steps. Quick, easy, and hassle-free.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative text-center group"
          >
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-border" />
            )}

            <div className="relative z-10">
              {/* Icon */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg">
                <step.icon className="h-10 w-10 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>

              {/* Step Number */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center left-1/2 transform translate-x-8">
                {index + 1}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
