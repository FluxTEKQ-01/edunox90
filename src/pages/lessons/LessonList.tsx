import { BookOpen, Search, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LessonList = () => {
  const lessons = [
    { id: "1", title: "Introduction to Calculus", subject: "Mathematics", duration: "45m", level: "Beginner" },
    { id: "2", title: "Organic Chemistry Basics", subject: "Science", duration: "60m", level: "Intermediate" },
    { id: "3", title: "Classical Mechanics", subject: "Physics", duration: "50m", level: "Advanced" },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lessons</h1>
          <p className="text-muted-foreground text-sm">Explore and continue your learning journey</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search lessons..." className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/lessons/${lesson.id}`}
            className="bg-card border border-border rounded-xl p-6 space-y-4 hover:border-primary/40 hover:shadow-sm transition-all group"
          >
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {lesson.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{lesson.subject}</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {lesson.duration}
                </div>
                <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {lesson.level}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
