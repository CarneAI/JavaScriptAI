
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

const ProjectAnalyzer: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const analysis = await geminiService.analyzeCode(code);
      setResult(analysis);
    } catch (error) {
      console.error(error);
      alert("Error analizando el código. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto py-8 px-6">
      <header>
        <h2 className="text-3xl font-bold text-white mb-2">Analizador de Proyectos con AI</h2>
        <p className="text-slate-400">Pega tu código JavaScript final y recibe una auditoría completa sobre calidad, bugs y optimizaciones mediante Inteligencia Artificial.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Pega aquí el código de tu proyecto..."
              className="w-full h-96 bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm code-font text-slate-300 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 resize-none transition-all"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !code.trim()}
              className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 text-slate-950 font-bold px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all"
            >
              {loading ? (
                <><i className="fas fa-circle-notch fa-spin"></i> Analizando...</>
              ) : (
                <><i className="fas fa-bolt"></i> Auditar Código</>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden min-h-[24rem]">
          {!result && !loading ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 p-12 text-center">
              <i className="fas fa-robot text-5xl mb-4 opacity-20"></i>
              <p>Tu análisis aparecerá aquí después de procesar el código.</p>
            </div>
          ) : loading ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-yellow-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-300 font-medium animate-pulse">Gemini está analizando tu código...</p>
              <p className="text-slate-500 text-sm mt-2">Evaluando lógica, seguridad y rendimiento.</p>
            </div>
          ) : (
            <div className="p-6 overflow-y-auto max-h-[40rem] space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Puntuación Total</div>
                <div className={`text-4xl font-black ${result?.score! > 80 ? 'text-green-400' : result?.score! > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {result?.score}%
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <i className="fas fa-bug text-red-500"></i> Errores y Riesgos
                </h4>
                <ul className="space-y-2">
                  {result?.bugs.map((bug, i) => (
                    <li key={i} className="bg-red-500/10 border border-red-500/20 text-red-200 p-3 rounded-lg text-sm">
                      {bug}
                    </li>
                  ))}
                  {result?.bugs.length === 0 && <li className="text-slate-500 italic text-sm">No se encontraron errores críticos.</li>}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <i className="fas fa-lightbulb text-yellow-500"></i> Mejoras Recomendadas
                </h4>
                <ul className="space-y-2">
                  {result?.improvements.map((imp, i) => (
                    <li key={i} className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-100 p-3 rounded-lg text-sm">
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800">
                <h4 className="text-white font-semibold">Resumen Ejecutivo</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{result?.explanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyzer;
