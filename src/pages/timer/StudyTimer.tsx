import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Timer, Zap, Flame } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { saveStudySession } from "@/lib/studySession";
import { toast } from "sonner";

const StudyTimerPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [saving, setSaving] = useState(false);

  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAt = useRef<string>(new Date().toISOString());
  const secondsRef = useRef(0);

  useEffect(() => { secondsRef.current = seconds; }, [seconds]);

  const { data: streak } = useQuery({
    queryKey: ["streak", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if (interval.current) {
      clearInterval(interval.current);
    }
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [running]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const xpEarned = Math.floor(seconds / 60) * 5;

  const handleStop = useCallback(async () => {
    setRunning(false);
    if (interval.current) clearInterval(interval.current);

    const dur = secondsRef.current;

    if (!user || dur < 10) {
      toast.info("Session too short to earn XP");
      navigate("/dashboard");
      return;
    }

    setSaving(true);
    try {
      const { xp } = await saveStudySession(
        user.id,
        startedAt.current,
        dur,
        streak ?? null
      );
      toast.success(`Session complete! You earned ${xp} XP.`);
    } catch (error) {
      console.error("Failed to save study session:", error);
      toast.error("Failed to save study session");
    } finally {
      setSaving(false);
      navigate("/dashboard");
    }
  }, [user, streak, navigate]);

  const handleStart = () => {
    startedAt.current = new Date().toISOString();
    setRunning(true);
  };

  // Progress circle dimensions
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  // Animate based on a 25-min pomodoro cycle
  const pomodoroSeconds = 25 * 60;
  const progress = Math.min((seconds % pomodoroSeconds) / pomodoroSeconds, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="p-6 md:p-8 max-w-lg mx-auto space-y-8 flex flex-col items-center justify-center min-h-[70vh]">

      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 rounded-2xl bg-primary/10 items-center justify-center">
          <Timer className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Study Timer</h1>
        <p className="text-muted-foreground text-sm">
          Stay focused and earn 5 XP per minute
        </p>
      </div>

      {/* Circular timer — ring uses primary color */}
      <div className="relative flex items-center justify-center">
        <svg width="220" height="220" className="-rotate-90">
          {/* Background track */}
          <circle
            cx="110" cy="110" r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          {/* Progress arc — uses primary (azure) */}
          <circle
            cx="110" cy="110" r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-4xl font-mono font-bold text-foreground tracking-wider">
            {fmt(seconds)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {running ? "Studying…" : seconds > 0 ? "Paused" : "Ready to start"}
          </div>
        </div>
        {/* Pulse ring when active */}
        {running && (
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!running ? (
          <Button
            onClick={handleStart}
            disabled={saving}
            className="gap-2 bg-cta text-cta-foreground hover:bg-cta/90 font-semibold px-8 h-11"
          >
            <Play className="h-4 w-4" />
            {seconds > 0 ? "Resume" : "Start"}
          </Button>
        ) : (
          <Button
            onClick={() => setRunning(false)}
            variant="outline"
            className="gap-2 px-8 h-11"
          >
            <Pause className="h-4 w-4" /> Pause
          </Button>
        )}
        {seconds > 0 && (
          <Button
            onClick={handleStop}
            disabled={saving}
            variant="outline"
            className="gap-2 px-8 h-11 border-destructive text-destructive hover:bg-destructive/10"
          >
            <Square className="h-4 w-4" />
            {saving ? "Saving…" : "Stop & Save"}
          </Button>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-cta mb-1">
            <Zap className="h-4 w-4" />
            <span className="text-lg font-bold">+{xpEarned}</span>
          </div>
          <div className="text-xs text-muted-foreground">XP Earned</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-destructive mb-1">
            <Flame className="h-4 w-4" />
            <span className="text-lg font-bold">{streak?.current_streak ?? 0}</span>
          </div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>

      {/* Pomodoro hint */}
      <p className="text-xs text-muted-foreground text-center">
        Tip: Try 25-minute focused sessions with 5-minute breaks (Pomodoro technique)
      </p>
    </div>
  );
};

export default StudyTimerPage;
