import { useEffect, useState } from "react";

interface StatItem {
  number: number;
  label: string;
  suffix?: string;
}

const STATS: StatItem[] = [
  {
    number: 5000,
    label: "Happy Customers",
    suffix: "+",
  },
  {
    number: 250,
    label: "Active Vehicles",
    suffix: "+",
  },
  {
    number: 50,
    label: "Service Areas",
    suffix: "+",
  },
  {
    number: 98,
    label: "Customer Satisfaction",
    suffix: "%",
  },
];

const CounterItem = ({
  target,
  label,
  suffix,
}: {
  target: number;
  label: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let current = 0;
    const increment = target / 50; // Animate dalam 50 steps

    intervalId = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(intervalId);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(intervalId);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-primary mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-muted-foreground text-sm md:text-base">{label}</p>
    </div>
  );
};

export default function StatsCounter() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 border-y py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          By The Numbers
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((stat, index) => (
            <CounterItem
              key={index}
              target={stat.number}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
