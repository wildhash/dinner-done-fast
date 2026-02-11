import { useLocation, useNavigate } from "react-router-dom";
import { Home, Clock, Crown } from "lucide-react";

const tabs = [
  { path: "/", icon: Home, label: "Import" },
  { path: "/history", icon: Clock, label: "History" },
  { path: "/paywall", icon: Crown, label: "Pro" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide nav on cook mode
  if (location.pathname.startsWith("/cook/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 transition-all ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
