import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic AI tutor access", "5 document uploads", "Practice quizzes"],
      cta: "Current Plan",
      current: true,
    },
    {
      name: "Pro",
      price: "$19",
      features: ["Unlimited AI tutor", "Unlimited uploads", "Advanced analytics", "Priority support"],
      cta: "Upgrade to Pro",
      current: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Bulk licenses", "Custom AI training", "Admin dashboard", "SLA"],
      cta: "Contact Sales",
      current: false,
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto py-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Simple, Transparent Pricing</h1>
        <p className="text-muted-foreground">Choose the plan that best fits your learning journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-card border ${
              plan.current ? "border-primary" : "border-border"
            } rounded-2xl p-8 space-y-6 relative flex flex-col`}
          >
            {plan.current && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Current Plan
              </span>
            )}
            <div>
              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-sm text-muted-foreground">/month</span>}
              </div>
            </div>
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full gap-2 ${
                plan.current ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
              }`}
              disabled={plan.current}
            >
              {plan.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
