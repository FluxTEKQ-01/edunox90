import { supabase } from "@/integrations/supabase/client";

interface StreakData {
  current_streak: number;
  longest_streak: number;
  last_study_date: string | null;
}

interface SaveSessionResult {
  xp: number;
  newStreak: number;
}

/**
 * saveStudySession — stubbed for Firebase migration
 */
export async function saveStudySession(
  userId: string,
  startedAt: string,
  durationSeconds: number,
  currentStreak: StreakData | null
): Promise<SaveSessionResult> {
  const xp = Math.floor(durationSeconds / 60) * 5;
  return { xp, newStreak: currentStreak?.current_streak ?? 0 };
}

/**
 * awardXP — stubbed for Firebase migration
 */
export async function awardXP(
  userId: string,
  amount: number,
  sourceType: "quiz" | "lesson" | "study_session" | "achievement" | "daily_login"
): Promise<void> {
  console.log(`Awarding ${amount} XP for ${sourceType}`);
}
