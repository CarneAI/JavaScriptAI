
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import ProjectAnalyzer from './components/ProjectAnalyzer';
import { CURRICULUM } from './constants';
import { UserProgress, Lesson } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'lesson' | 'analyzer'>('lesson');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('js-academy-progress');
    return saved ? JSON.parse(saved) : {
      completedLessons: [],
      currentModuleIndex: 0,
      currentLessonIndex: 0
    };
  });

  const [currentCode, setCurrentCode] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('js-academy-progress', JSON.stringify(progress));
    const currentLesson = CURRICULUM[progress.currentModuleIndex].lessons[progress.currentLessonIndex];
    setCurrentCode(currentLesson.exercise.initialCode);
    setIsSuccess(false);
  }, [progress.currentModuleIndex, progress.currentLessonIndex]);

  const handleLessonSelect = (mIdx: number, lIdx: number) => {
    setProgress(prev => ({ ...prev, currentModuleIndex: mIdx, currentLessonIndex: lIdx }));
    setView('lesson');
  };

  const handleRunCode = (output: string[]) => {
    const lesson = CURRICULUM[progress.currentModuleIndex].lessons[progress.currentLessonIndex];
    if (lesson.exercise.testCase(output, currentCode)) {
      setIsSuccess(true);
      if (!progress.completedLessons.includes(lesson.id)) {
        setProgress(prev => ({
          ...prev,
          completedLessons: [...prev.completedLessons, lesson.id]
        }));
      }
    } else {
      setIsSuccess(false);
    }
  };

  const nextLesson = () => {
    const currentModule = CURRICULUM[progress.currentModuleIndex];
    if (progress.currentLessonIndex < currentModule.lessons.length - 1) {
      setProgress(prev => ({ ...prev, currentLessonIndex: prev.currentLessonIndex + 1 }));
    } else if (progress.currentModuleIndex < CURRICULUM.length - 1) {
      setProgress(prev => ({ 
        ...prev, 
        currentModuleIndex: prev.currentModuleIndex + 1,
        currentLessonIndex: 0 
      }));
    }
  };

  const activeLesson = CURRICULUM[progress.currentModuleIndex].lessons[progress.currentLessonIndex];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar 
        progress={progress} 
        onSelectLesson={handleLessonSelect}
        onSelectAnalyzer={() => setView('analyzer')}
        activeView={view}
      />
      
      <main className="flex-1 h-full overflow-y-auto bg-slate-950">
        {view === 'lesson' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Content Side */}
            <div className="p-8 border-r border-slate-900 overflow-y-auto space-y-8">
              <div className="flex items-center gap-3">
                <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded">
                  Módulo {progress.currentModuleIndex + 1}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-xs">Lección {progress.currentLessonIndex + 1}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black text-white">{activeLesson.title}</h1>
                <p className="text-lg text-slate-400 leading-relaxed">{activeLesson.content}</p>
              </div>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-yellow-500">
                  <i className="fas fa-terminal"></i> Ejemplo Interactivo
                </h3>
                <pre className="code-font text-sm bg-slate-950 p-4 rounded-lg text-blue-300 overflow-x-auto border border-slate-800">
                  <code>{activeLesson.codeExample}</code>
                </pre>
              </div>

              <div className="pt-6 border-t border-slate-900">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <i className="fas fa-puzzle-piece text-purple-400"></i> Tu Desafío
                </h3>
                <p className="text-slate-300 bg-slate-900/50 p-4 rounded-lg border-l-4 border-purple-500">
                  {activeLesson.exercise.instruction}
                </p>
              </div>

              {isSuccess && (
                <div className="bg-green-500/10 border border-green-500/50 p-4 rounded-xl flex items-center justify-between animate-bounce">
                  <div className="flex items-center gap-3 text-green-400">
                    <i className="fas fa-trophy text-2xl"></i>
                    <div>
                      <p className="font-bold">¡Excelente trabajo!</p>
                      <p className="text-xs">Has completado esta lección con éxito.</p>
                    </div>
                  </div>
                  <button 
                    onClick={nextLesson}
                    className="bg-green-500 hover:bg-green-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition-colors"
                  >
                    Siguiente <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Editor Side */}
            <div className="p-8 bg-slate-900/30 flex flex-col h-full">
              <div className="flex-1 min-h-[400px]">
                <CodeEditor 
                  initialCode={activeLesson.exercise.initialCode} 
                  onCodeChange={setCurrentCode}
                  onRun={handleRunCode}
                />
              </div>
              <div className="mt-6 text-slate-500 text-xs flex justify-between">
                <span>Pista: Revisa la consola para ver los resultados de `console.log`</span>
                <span>Usa `let` y `const` según corresponda</span>
              </div>
            </div>
          </div>
        ) : (
          <ProjectAnalyzer />
        )}
      </main>
    </div>
  );
};

export default App;
