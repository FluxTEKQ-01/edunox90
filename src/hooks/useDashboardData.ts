import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export const useDashboardData = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const docRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    },
    enabled: !!user,
  });

  const { data: streak } = useQuery({
    queryKey: ["streak", user?.uid],
    queryFn: async () => {
      if (!user) return null;
      const docRef = doc(db, "user_streaks", user.uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : { current_streak: 0 };
    },
    enabled: !!user,
  });

  const { data: totalXp } = useQuery({
    queryKey: ["totalXp", user?.uid],
    queryFn: async () => {
      if (!user) return 0;
      const q = query(collection(db, "xp_logs"), where("user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let total = 0;
      querySnapshot.forEach((doc) => {
        total += doc.data().xp_amount || 0;
      });
      return total;
    },
    enabled: !!user,
  });

  const { data: studyTime } = useQuery({
    queryKey: ["studyTime", user?.uid],
    queryFn: async () => {
      if (!user) return "0h";
      const q = query(collection(db, "study_sessions"), where("user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let totalSeconds = 0;
      querySnapshot.forEach((doc) => {
        totalSeconds += doc.data().duration_seconds || 0;
      });
      const hours = (totalSeconds / 3600).toFixed(1);
      return `${hours}h`;
    },
    enabled: !!user,
  });

  const { data: avgScore } = useQuery({
    queryKey: ["avgScore", user?.uid],
    queryFn: async () => {
      if (!user) return 0;
      const q = query(collection(db, "quiz_attempts"), where("user_id", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return 0;
      let totalPct = 0;
      let count = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.total_questions > 0) {
          totalPct += (data.score / data.total_questions);
          count++;
        }
      });
      return count > 0 ? Math.round((totalPct / count) * 100) : 0;
    },
    enabled: !!user,
  });

  const continueLearning: any[] = [];
  const weakTopics: any[] = [];

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return {
    profile,
    streak,
    totalXp: totalXp ?? 0,
    studyTime: studyTime ?? "0h",
    avgScore: avgScore ?? null,
    continueLearning,
    weakTopics,
    greeting: greeting(),
  };
};