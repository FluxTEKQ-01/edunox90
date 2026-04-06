import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DeepFocusProvider } from "@/hooks/useDeepFocus";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProfileSetup from "./pages/onboarding/ProfileSetup";
import LearningGoals from "./pages/onboarding/LearningGoals";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import LessonList from "./pages/lessons/LessonList";
import LessonViewer from "./pages/lessons/LessonViewer";
import DoubtInput from "./pages/doubts/DoubtInput";
import AISolution from "./pages/doubts/AISolution";
import DoubtHistory from "./pages/doubts/DoubtHistory";
import DoubtSession from "./pages/doubts/DoubtSession";
import TopicSelection from "./pages/quiz/TopicSelection";
import QuizPage from "./pages/quiz/QuizPage";
import QuizResults from "./pages/quiz/QuizResults";
import StudyTimerPage from "./pages/timer/StudyTimer";   // ← was missing from routes
import SessionSummary from "./pages/timer/SessionSummary";
import MaterialUpload from "./pages/materials/MaterialUpload";
import AILearning from "./pages/materials/AILearning";
import AITutor from "./pages/materials/AITutor";
import ProgressDashboard from "./pages/progress/ProgressDashboard";
import Leaderboard from "./pages/social/Leaderboard";
import Friends from "./pages/social/Friends";
import Achievements from "./pages/social/Achievements";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,   // 2 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <DeepFocusProvider>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected: Onboarding */}
              <Route
                path="/onboarding/profile"
                element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>}
              />
              <Route
                path="/onboarding/goals"
                element={<ProtectedRoute><LearningGoals /></ProtectedRoute>}
              />

              {/* Protected: App screens with sidebar layout */}
              <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
                <Route path="/lessons" element={<ErrorBoundary><LessonList /></ErrorBoundary>} />
                <Route path="/lessons/:id" element={<ErrorBoundary><LessonViewer /></ErrorBoundary>} />
                <Route path="/doubts" element={<ErrorBoundary><DoubtInput /></ErrorBoundary>} />
                <Route path="/doubts/solution" element={<ErrorBoundary><AISolution /></ErrorBoundary>} />
                <Route path="/doubts/history" element={<ErrorBoundary><DoubtHistory /></ErrorBoundary>} />
                <Route path="/doubts/session/:id" element={<ErrorBoundary><DoubtSession /></ErrorBoundary>} />
                <Route path="/quiz" element={<ErrorBoundary><TopicSelection /></ErrorBoundary>} />
                <Route path="/quiz/:id" element={<ErrorBoundary><QuizPage /></ErrorBoundary>} />
                <Route path="/quiz/:id/results" element={<ErrorBoundary><QuizResults /></ErrorBoundary>} />
                {/* ✅ /timer route was missing — now added */}
                <Route path="/timer" element={<ErrorBoundary><StudyTimerPage /></ErrorBoundary>} />
                <Route path="/timer/summary" element={<ErrorBoundary><SessionSummary /></ErrorBoundary>} />
                <Route path="/materials" element={<ErrorBoundary><MaterialUpload /></ErrorBoundary>} />
                <Route path="/materials/learn/:id" element={<ErrorBoundary><AILearning /></ErrorBoundary>} />
                <Route path="/materials/tutor" element={<ErrorBoundary><AITutor /></ErrorBoundary>} />
                <Route path="/progress" element={<ErrorBoundary><ProgressDashboard /></ErrorBoundary>} />
                <Route path="/leaderboard" element={<ErrorBoundary><Leaderboard /></ErrorBoundary>} />
                <Route path="/friends" element={<ErrorBoundary><Friends /></ErrorBoundary>} />
                <Route path="/achievements" element={<ErrorBoundary><Achievements /></ErrorBoundary>} />
                <Route path="/profile" element={<ErrorBoundary><Profile /></ErrorBoundary>} />
                <Route path="/settings" element={<ErrorBoundary><Settings /></ErrorBoundary>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </DeepFocusProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
