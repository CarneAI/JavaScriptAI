
export type Difficulty = 'Principiante' | 'Intermedio' | 'Avanzado';

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample: string;
  exercise: {
    instruction: string;
    initialCode: string;
    solution: string;
    testCase: (output: any, code: string) => boolean;
  };
}

export interface Module {
  id: string;
  title: string;
  difficulty: Difficulty;
  lessons: Lesson[];
}

export interface UserProgress {
  completedLessons: string[];
  currentModuleIndex: number;
  currentLessonIndex: number;
}

export interface AIAnalysisResult {
  score: number;
  bugs: string[];
  improvements: string[];
  explanation: string;
}
