export interface QuizOption {
  id: string;
  optionText: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface Quiz {
  id: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}

export interface LessonResponse {
  data: {
    id: string;
    courseId: string;
    title: string;
    content: string;
    orderNumber: number;
    durationMinutes: number;
  };
  timestamp: string;
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  orderNumber: number;
}

export interface Profile {
  trade: string;
  language: string;
  learnerLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  progressPercent: number;
  completedModules: number;
  totalModules: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  orderNumber: number;
  durationMinutes: number;
  content: string;
  isLocked: boolean;
  status: "UP_NEXT" | "LOCKED" | "COMPLETED" | "IN_PROGRESS";
  flashcards: FlashCard[];
  quiz?: Quiz;
}

export interface NewLesson {
  id: string;
  title: string;
  description: string;
  level: string;
  thumbnailUrl: string;
  isPublished: boolean;
  createdAt: string;
  progressPercent: number;
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
  isQuizAvailable: true;
  isAssignmentAvailable: true;
  lastAccessedLessonId: null;
}

export interface LearningPath {
  status: string;
  message: string;
  profile: Profile;
  courses: Course[];
}

export interface LearningPathStatus {
  status: string;
  isReady: boolean;
  availableCourseCount: number;
  message: string;
  profile: {
    trade: string;
    learnerLevel: string;
  };
}

export interface ApiResponse<T = unknown> {
  data: T;
  timestamp: string;
}

export interface CourseLessonsResponse {
  data: Lesson[];
  timestamp: string;
}

export type LearningPathResponse = ApiResponse<LearningPath>;

export type LearningPathStatusResponse = ApiResponse<LearningPathStatus>;
export type CourseLessonResponse = ApiResponse<NewLesson>;

export type CourseContent = ApiResponse<Lesson[]>;
export type singleLessonResponse = ApiResponse<Lesson>;
export type QuizPost = ApiResponse<Quiz[]>;
export type QuizResponse = ApiResponse<{
  scorePercent: number;
  isPassed: boolean;
}>;
