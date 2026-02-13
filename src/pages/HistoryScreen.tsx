import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChefHat, Clock } from "lucide-react";
import { loadState, getHistory } from "@/lib/storage";
import { CookedSession } from "@/lib/types";

export default function HistoryScreen() {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<CookedSession[]>([]);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const state = loadState();
    setIsPro(state.isPro);
    setSessions(getHistory(state.isPro));
  }, []);

  const totalCooked = loadState().cookedSessions.length;

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="px-5 pt-6 pb-4">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground mb-4 text-sm">
          <ArrowLeft className="w-4 h-4" /> Home
        </button>

        <div className="animate-slide-up">
          <h1 className="text-2xl font-serif text-foreground mb-1">Cooking History</h1>
          <p className="text-sm text-muted-foreground">
            {sessions.length} meal{sessions.length !== 1 ? "s" : ""} cooked
            {!isPro && totalCooked > 3 && (
              <span> · <button onClick={() => navigate("/paywall")} className="text-primary font-medium">Unlock all ({totalCooked})</button></span>
            )}
          </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <div className="px-5 py-16 text-center">
          <ChefHat className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No meals cooked yet.</p>
          <p className="text-muted-foreground text-xs mt-1">Import a recipe to get started!</p>
        </div>
      ) : (
        <div className="px-5 space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-3 bg-card rounded-xl border border-border p-4"
            >
              {session.photoUri ? (
                <img src={session.photoUri} alt="Cooked" className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-surface-warm flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-6 h-6 text-muted-foreground/40" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{session.recipeTitle}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  {new Date(session.cookedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
