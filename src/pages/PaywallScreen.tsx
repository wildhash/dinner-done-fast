import { useNavigate } from "react-router-dom";
import { Crown, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setProStatus, loadState } from "@/lib/storage";

const freeFeatures = [
  { text: "5 imports per month", included: true },
  { text: "Grocery lists", included: true },
  { text: "Cook mode", included: true },
  { text: "3 history entries", included: true },
  { text: "Unlimited imports", included: false },
  { text: "Unlimited history", included: false },
  { text: "Pantry match", included: false },
];

const proFeatures = [
  "Unlimited recipe imports",
  "Unlimited cooking history",
  "Pantry match feature",
  "Priority parsing",
];

export default function PaywallScreen() {
  const navigate = useNavigate();
  const state = loadState();

  const handleUpgrade = () => {
    setProStatus(true);
    navigate("/");
  };

  if (state.isPro) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center animate-scale-in">
        <Crown className="w-14 h-14 text-primary mb-4" />
        <h1 className="text-2xl font-serif text-foreground mb-2">You're Pro!</h1>
        <p className="text-muted-foreground text-sm mb-6">All features are unlocked.</p>
        <Button onClick={() => navigate("/")} className="rounded-xl h-12 px-8">
          Back to cooking
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-5 pt-12 pb-8">
      <div className="max-w-lg mx-auto animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-serif text-foreground mb-2">Upgrade to Pro</h1>
          <p className="text-muted-foreground text-sm">
            You've used all {loadState().monthlyImports} free imports this month.
          </p>
        </div>

        {/* What you get */}
        <div className="bg-card rounded-2xl border-2 border-primary/30 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Everything in Pro</span>
          </div>
          <div className="space-y-3">
            {proFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-success" />
                </div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleUpgrade}
            className="w-full bg-primary text-primary-foreground rounded-2xl p-5 text-left transition-all hover:opacity-90"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-base">Annual</p>
                <p className="text-sm opacity-80">$39/year · Save 35%</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$3.25</p>
                <p className="text-xs opacity-70">/month</p>
              </div>
            </div>
          </button>

          <button
            onClick={handleUpgrade}
            className="w-full bg-card border border-border text-foreground rounded-2xl p-5 text-left transition-all hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-base">Monthly</p>
                <p className="text-sm text-muted-foreground">Cancel anytime</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$4.99</p>
                <p className="text-xs text-muted-foreground">/month</p>
              </div>
            </div>
          </button>
        </div>

        {/* Restore / Skip */}
        <div className="text-center space-y-2">
          <button onClick={handleUpgrade} className="text-xs text-muted-foreground underline">
            Restore purchase
          </button>
          <br />
          <button onClick={() => navigate("/")} className="text-xs text-muted-foreground">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
