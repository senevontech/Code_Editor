// import React, { useState, useRef, useEffect } from 'react';
// // ---------- FALLBACK ICONS (paste this and remove lucide-react import) ----------
// const Icon = ({ emoji, size = 16, className = '' }) => (
//   <span className={className} style={{ fontSize: size, lineHeight: 1 }}>{emoji}</span>
// );

// const Play = (p) => <Icon emoji="▶️" {...p} />;
// const Sparkles = (p) => <Icon emoji="✨" {...p} />;
// const Copy = (p) => <Icon emoji="📋" {...p} />;
// const Download = (p) => <Icon emoji="⬇️" {...p} />;
// const Trash2 = (p) => <Icon emoji="🗑️" {...p} />;
// const Plus = (p) => <Icon emoji="➕" {...p} />;
// const Save = (p) => <Icon emoji="💾" {...p} />;
// const CheckCircle = (p) => <Icon emoji="✅" {...p} />;
// const AlertCircle = (p) => <Icon emoji="⚠️" {...p} />;
// const Sun = (p) => <Icon emoji="🌞" {...p} />;
// const Moon = (p) => <Icon emoji="🌙" {...p} />;
// // -------------------------------------------------------------------------------



// export default function CodeEditor() {
//   const [code, setCode] = useState(
// `// JavaScript code — this editor executes JS via eval
// console.log("Hello, world!");
// `
//   );
//   const [output, setOutput] = useState('');
//   const [fileName, setFileName] = useState('main.js');
//   const [isRunning, setIsRunning] = useState(false);
//   const [isSaved, setIsSaved] = useState(true);
//   const [theme, setTheme] = useState('dark');
//   const [fontSize, setFontSize] = useState(14);
//   const textareaRef = useRef(null);

//   const lineNumbers = code.split('\n').map((_, i) => i + 1);
//   const isDark = theme === 'dark';

//   useEffect(() => {
//     const handleKeyboard = (e) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
//         e.preventDefault();
//         runCode();
//       }
//       if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
//         e.preventDefault();
//         saveCode();
//       }
//     };
//     window.addEventListener('keydown', handleKeyboard);
//     return () => window.removeEventListener('keydown', handleKeyboard);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [code]);

//   const runCode = async () => {
//     setIsRunning(true);
//     setOutput('⏳ Executing code...\n');

//     setTimeout(() => {
//       try {
//         const logs = [];
//         const originalConsoleLog = console.log;
//         console.log = (...args) => {
//           logs.push(args.map(arg => {
//             if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
//             return String(arg);
//           }).join(' '));
//         };

//         // eslint-disable-next-line no-eval
//         eval(code);

//         console.log = originalConsoleLog;

//         if (logs.length > 0) {
//           setOutput('✅ Output:\n\n' + logs.join('\n'));
//         } else {
//           setOutput('✅ Code executed successfully (no output)');
//         }
//       } catch (err) {
//         setOutput(`❌ Runtime Error:\n\n${err?.message || String(err)}\n\n${err?.stack || ''}`);
//       } finally {
//         setIsRunning(false);
//       }
//     }, 300);
//   };

//   const saveCode = () => {
//     setIsSaved(true);
//     try {
//       localStorage.setItem('codemist-code', code);
//     } catch {
//       // ignore
//     }
//   };

//   const clearOutput = () => setOutput('');
//   const copyOutput = async () => {
//     try {
//       if (navigator.clipboard) {
//         await navigator.clipboard.writeText(output);
//       } else {
//         const ta = document.createElement('textarea');
//         ta.value = output;
//         document.body.appendChild(ta);
//         ta.select();
//         document.execCommand('copy');
//         ta.remove();
//       }
//       const el = document.getElementById('copy-btn');
//       if (el) {
//         const original = el.innerHTML;
//         el.innerHTML = '✓';
//         setTimeout(() => (el.innerHTML = original), 1200);
//       }
//     } catch {
//       // ignore
//     }
//   };

//   const downloadCode = () => {
//     const blob = new Blob([code], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName || 'untitled.txt';
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//     URL.revokeObjectURL(url);
//   };

//   const handleCodeChange = (e) => {
//     setCode(e.target.value);
//     setIsSaved(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Tab') {
//       e.preventDefault();
//       const target = e.target;
//       const start = target.selectionStart;
//       const end = target.selectionEnd;
//       const newCode = code.substring(0, start) + '    ' + code.substring(end);
//       setCode(newCode);
//       setIsSaved(false);
//       requestAnimationFrame(() => {
//         if (textareaRef.current) {
//           textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
//         }
//       });
//     }
//   };

//   const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

//   const newFile = () => {
//     if (!isSaved && !window.confirm('You have unsaved changes. Continue?')) return;
//     setCode('// New file\n');
//     setFileName('untitled.js');
//     setOutput('');
//     setIsSaved(true);
//   };

//   return (
//     <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-slate-950 via-black to-slate-900' : 'bg-gradient-to-br from-gray-100 via-white to-gray-50'} ${isDark ? 'text-white' : 'text-gray-900'} flex flex-col overflow-hidden transition-colors duration-300`}>
//       <header className={`flex items-center justify-between px-6 py-4 border-b ${isDark ? 'border-gray-800/50 bg-black/40' : 'border-gray-300/50 bg-white/40'} backdrop-blur-xl relative z-10`}>
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-3">
//             <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-gradient-to-br from-purple-600 to-purple-800 shadow-lg shadow-purple-500/50' : 'bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg shadow-purple-400/50'} flex items-center justify-center`}>
//               <span className="text-lg font-bold text-white">C</span>
//             </div>
//             <div>
//               <h1 className={`text-xl tracking-[0.25em] font-light ${isDark ? 'text-white' : 'text-gray-900'}`}>CODEMIST</h1>
//               <p className={`text-[10px] tracking-[0.15em] ${isDark ? 'text-purple-300/70' : 'text-purple-600/70'}`}>PROFESSIONAL EDITOR</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <button
//             onClick={toggleTheme}
//             className={`p-2.5 rounded-lg ${isDark ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-200/50 hover:bg-gray-200'} transition-all transform hover:scale-105`}
//             title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
//           >
//             {isDark ? (
//               <Sun size={18} className="text-yellow-400" />
//             ) : (
//               <Moon size={18} className="text-purple-600" />
//             )}
//           </button>
//           <div className={`px-3 py-1.5 ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} rounded-lg flex items-center gap-2`}>
//             {isSaved ? (
//               <>
//                 <CheckCircle size={14} className="text-green-500" />
//                 <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Saved</span>
//               </>
//             ) : (
//               <>
//                 <AlertCircle size={14} className="text-yellow-500" />
//                 <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Unsaved</span>
//               </>
//             )}
//           </div>
//           <div className={`w-10 h-10 rounded-full ${isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700' : 'bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-200 hover:to-gray-300'} transition-all cursor-pointer flex items-center justify-center shadow-lg`}>
//             <span className="text-xs font-semibold">AC</span>
//           </div>
//         </div>
//       </header>

//       <div className="flex-1 flex overflow-hidden">
//         <aside className={`w-64 ${isDark ? 'bg-gray-950/50' : 'bg-white/50'} backdrop-blur-sm border-r ${isDark ? 'border-gray-800/50' : 'border-gray-300/50'} p-4 space-y-2`}>
//           <button
//             onClick={newFile}
//             className={`w-full flex items-center gap-3 px-4 py-3 ${isDark ? 'bg-purple-600/20 hover:bg-purple-600/30' : 'bg-purple-100 hover:bg-purple-200'} rounded-lg transition-colors text-sm`}
//           >
//             <Plus size={18} />
//             <span>New File</span>
//           </button>
//           <button
//             onClick={downloadCode}
//             className={`w-full flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} rounded-lg transition-colors text-sm`}
//           >
//             <Download size={18} />
//             <span>Download</span>
//           </button>
//           <button
//             onClick={saveCode}
//             className={`w-full flex items-center gap-3 px-4 py-3 ${isDark ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'} rounded-lg transition-colors text-sm`}
//           >
//             <Save size={18} />
//             <span>Save (Ctrl+S)</span>
//           </button>

//           <div className={`pt-4 border-t ${isDark ? 'border-gray-800/50' : 'border-gray-300/50'}`}>
//             <label className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-2 block`}>Font Size</label>
//             <input
//               type="range"
//               min="12"
//               max="20"
//               value={fontSize}
//               onChange={(e) => setFontSize(Number(e.target.value))}
//               className="w-full"
//             />
//             <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{fontSize}px</span>
//           </div>

//           <div className="pt-4">
//             <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'} mb-2`}>Keyboard Shortcuts</p>
//             <div className={`space-y-1 text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
//               <div>Ctrl+Enter - Run Code</div>
//               <div>Ctrl+S - Save</div>
//               <div>Tab - Indent</div>
//             </div>
//           </div>
//         </aside>

//         <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
//           <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-900/40' : 'bg-white/60'} backdrop-blur-sm rounded-xl overflow-hidden border ${isDark ? 'border-gray-800/50' : 'border-gray-300/50'} shadow-2xl`}>
//             <div className={`flex items-center justify-between px-4 py-3 ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'} border-b ${isDark ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
//               <div className="flex items-center gap-3">
//                 <div className="flex gap-1.5">
//                   <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer"></div>
//                 </div>
//                 <input
//                   type="text"
//                   value={fileName}
//                   onChange={(e) => {
//                     setFileName(e.target.value);
//                     setIsSaved(false);
//                   }}
//                   className={`${isDark ? 'bg-gray-800/50 text-purple-300 border-gray-700/30 focus:border-purple-500/50' : 'bg-gray-200/50 text-purple-700 border-gray-400/30 focus:border-purple-400/50'} px-3 py-1.5 rounded-md text-sm outline-none border transition-all w-40`}
//                 />
//               </div>

//               <button
//                 onClick={runCode}
//                 disabled={isRunning}
//                 className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-purple-500/25 hover:shadow-purple-500/40' : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 shadow-purple-400/25 hover:shadow-purple-400/40'} rounded-md transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 text-white`}
//               >
//                 <Play size={16} fill="white" />
//                 <span className="text-sm font-medium">{isRunning ? 'Running...' : 'Run'}</span>
//                 <kbd className="ml-2 px-1.5 py-0.5 bg-black/30 rounded text-xs">Ctrl+↵</kbd>
//               </button>
//             </div>

//             <div className="flex-1 flex overflow-hidden">
//               <div className={`${isDark ? 'bg-gray-950/30 text-gray-600 border-gray-800/30' : 'bg-gray-100/30 text-gray-500 border-gray-300/30'} px-3 py-4 text-right text-sm font-mono select-none border-r min-w-[50px]`}>
//                 {lineNumbers.map((num) => (
//                   <div key={num} className="leading-6 h-6 hover:text-purple-400 transition-colors">
//                     {num}
//                   </div>
//                 ))}
//               </div>

//               <textarea
//                 ref={textareaRef}
//                 value={code}
//                 onChange={handleCodeChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="// Start coding..."
//                 className={`flex-1 bg-transparent p-4 font-mono outline-none resize-none ${isDark ? 'text-gray-100 placeholder-gray-700' : 'text-gray-900 placeholder-gray-400'} leading-6`}
//                 spellCheck={false}
//                 style={{ fontSize: `${fontSize}px`, lineHeight: '1.5rem' }}
//               />
//             </div>
//           </div>

//           <div className={`w-full lg:w-[420px] flex flex-col ${isDark ? 'bg-gray-900/40' : 'bg-white/60'} backdrop-blur-sm rounded-xl overflow-hidden border ${isDark ? 'border-gray-800/50' : 'border-gray-300/50'} shadow-2xl`}>
//             <div className={`flex items-center justify-between px-4 py-3 ${isDark ? 'bg-gray-800/30' : 'bg-gray-100/50'} border-b ${isDark ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
//                 <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Console Output</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 {output && (
//                   <>
//                     <button
//                       id="copy-btn"
//                       onClick={copyOutput}
//                       className={`p-2 ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} rounded-md transition-colors`}
//                       title="Copy Output"
//                     >
//                       <Copy size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
//                     </button>
//                     <button
//                       onClick={clearOutput}
//                       className={`p-2 ${isDark ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50'} rounded-md transition-colors`}
//                       title="Clear Output"
//                     >
//                       <Trash2 size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
//                     </button>
//                   </>
//                 )}
//                 <button className={`w-9 h-9 rounded-lg ${isDark ? 'bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-purple-500/30 hover:shadow-purple-500/50' : 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 shadow-purple-400/30 hover:shadow-purple-400/50'} transition-all flex items-center justify-center shadow-lg ml-2 transform hover:scale-105`}>
//                   <Sparkles size={16} className="text-white" />
//                 </button>
//               </div>
//             </div>

//             <div className={`flex-1 p-4 font-mono text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} overflow-auto`}>
//               {output ? (
//                 <pre className="whitespace-pre-wrap break-words">{output}</pre>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
//                   <div className={`w-20 h-20 rounded-2xl ${isDark ? 'bg-gradient-to-br from-gray-800/50 to-gray-800/30' : 'bg-gradient-to-br from-gray-200/50 to-gray-200/30'} flex items-center justify-center mb-4 shadow-xl`}>
//                     <Play size={32} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
//                   </div>
//                   <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Ready to Execute</p>
//                   <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>Run your code to see the output</p>
//                   <div className={`mt-4 px-3 py-1.5 ${isDark ? 'bg-gray-800/30 border-gray-700/30' : 'bg-gray-200/30 border-gray-400/30'} rounded-lg border`}>
//                     <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Press <kbd className={`px-1 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'} rounded`}>Ctrl+Enter</kbd></span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, code, onChange }) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Editor
        height="100%"
        width="100%"
        value={code}
        language={language}
        theme="vs-dark"
        onChange={(value) => onChange(value || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
