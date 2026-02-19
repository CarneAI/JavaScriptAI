
import React, { useState, useEffect } from 'react';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange?: (code: string) => void;
  onRun?: (output: string[]) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, onCodeChange, onRun }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  }, [initialCode]);

  const runCode = () => {
    setOutput([]);
    setError(null);
    const logs: string[] = [];
    
    // Custom console.log to capture output
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      }
    };

    try {
      // Use eval safely-ish for education
      const run = new Function('console', code);
      run(customConsole);
      setOutput(logs);
      if (onRun) onRun(logs);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <button 
          onClick={runCode}
          className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 px-4 py-1 rounded text-sm font-bold flex items-center gap-2 transition-transform active:scale-95"
        >
          <i className="fas fa-play"></i> Ejecutar
        </button>
      </div>

      <div className="flex-1 relative flex flex-col md:flex-row min-h-0">
        <textarea
          value={code}
          onChange={(e) => {
            const val = e.target.value;
            setCode(val);
            if (onCodeChange) onCodeChange(val);
          }}
          className="flex-1 bg-transparent p-4 text-slate-300 code-font text-sm resize-none focus:outline-none focus:ring-1 focus:ring-yellow-500/30 selection:bg-yellow-500/20"
          spellCheck={false}
          placeholder="// Escribe tu código aquí..."
        />
        
        <div className="w-full md:w-1/3 bg-slate-900/50 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col">
          <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold border-b border-slate-800/50">Consola</div>
          <div className="flex-1 p-4 overflow-y-auto code-font text-xs space-y-1">
            {error ? (
              <div className="text-red-400 flex items-start gap-2">
                <i className="fas fa-exclamation-triangle mt-0.5"></i>
                <span>{error}</span>
              </div>
            ) : output.length > 0 ? (
              output.map((line, i) => (
                <div key={i} className="text-green-400 flex items-start gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span>{line}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-600 italic">Esperando salida...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
