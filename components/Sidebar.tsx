
import React from 'react';
import { CURRICULUM } from '../constants';
import { UserProgress } from '../types';

interface SidebarProps {
  progress: UserProgress;
  onSelectLesson: (moduleIdx: number, lessonIdx: number) => void;
  onSelectAnalyzer: () => void;
  activeView: 'lesson' | 'analyzer';
}

const Sidebar: React.FC<SidebarProps> = ({ progress, onSelectLesson, onSelectAnalyzer, activeView }) => {
  return (
    <aside className="w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
          <i className="fab fa-js-square text-3xl"></i>
          <span>JS Master</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Aprende paso a paso</p>
      </div>

      <nav className="flex-1 p-4 space-y-6">
        <div>
          <button 
            onClick={onSelectAnalyzer}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeView === 'analyzer' 
                ? 'bg-yellow-400 text-slate-950 font-semibold' 
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <i className="fas fa-microscope"></i>
            <span>Analizador AI</span>
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4">Currículum</h3>
          {CURRICULUM.map((module, mIdx) => (
            <div key={module.id} className="space-y-1">
              <div className="px-4 py-1 text-sm font-medium text-slate-400 flex justify-between items-center">
                <span>{module.title}</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">{module.difficulty}</span>
              </div>
              {module.lessons.map((lesson, lIdx) => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const isActive = activeView === 'lesson' && progress.currentModuleIndex === mIdx && progress.currentLessonIndex === lIdx;
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(mIdx, lIdx)}
                    className={`w-full text-left px-4 py-2 text-sm rounded-md flex items-center gap-3 transition-colors ${
                      isActive 
                        ? 'bg-slate-800 text-white border-l-4 border-yellow-400' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <i className={`fas ${isCompleted ? 'fa-check-circle text-green-500' : 'fa-circle text-[8px]'}`}></i>
                    <span className="truncate">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        v1.0.0 &bull; Hecho con ❤️ para devs
      </div>
    </aside>
  );
};

export default Sidebar;
