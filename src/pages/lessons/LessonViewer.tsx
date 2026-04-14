import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LessonViewer = () => {
  const { id } = useParams();

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <Link to="/lessons" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Lessons
      </Link>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-border bg-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Lesson {id}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Detailed Lesson Title</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            In this lesson, we will cover the fundamental concepts and practical applications
            to help you master this topic.
          </p>
        </div>

        <div className="p-8 space-y-6">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8">2. Key Concepts</h2>
            <p className="text-muted-foreground leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className="pt-8 border-t border-border flex justify-between items-center">
            <Button variant="outline">Previous Lesson</Button>
            <Button className="bg-success text-success-foreground hover:bg-success/90 gap-2">
              Mark as Complete <CheckCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
