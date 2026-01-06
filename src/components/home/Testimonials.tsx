import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Stanton",
    role: "CEO at Amazon",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "We are very happy with the service from FuaDIRents. We got the car in perfect condition and the driver was very professional. Amazing experience!",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "The booking process was seamless and the car exceeded my expectations. Highly recommended for anyone looking for quality car rental service.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Best car rental experience I've ever had. The driver was punctual, professional, and the car was spotless. Will definitely use again!",
  },
];

export function Testimonials() {
  return (
    <section className="container py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our happy customers have to say.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card rounded-2xl border border-border p-6 transition-all duration-300 hover:shadow-lg"
          >
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              "{testimonial.text}"
            </p>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-star text-star" />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
