// import React, { useState } from 'react';
// import CodeEditor from './CodeEditor';
// import OutputPanel from './OutputPanel';
// import axios from 'axios';

// export default function EditorLayout(){
//   const [language, setLanguage] = useState('python');
//   const [code, setCode] = useState(`# python example\nprint("hello codemist")`);
//   const [output, setOutput] = useState('');
//   const [running, setRunning] = useState(false);

//   const run = async () => {
//     setRunning(true);
//     setOutput('Running...');
//     try {
//       const languageMap = { python: 71, javascript: 63 }; // adjust server mapping if different
//       const resp = await axios.post('/api/runner/run', {
//         source_code: code,
//         language_id: languageMap[language]
//       }, { timeout: 60000 });
//       setOutput(JSON.stringify(resp.data, null, 2));
//     } catch (err) {
//       setOutput('Error: ' + (err.response?.data?.error || err.message));
//     } finally {
//       setRunning(false);
//     }
//   };

//   const save = async () => {
//     try {
//       await axios.post('/api/snippets', { title: 'untitled', language, code });
//       alert('Saved');
//     } catch (e) {
//       alert('Save failed: ' + (e.message || e));
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 h-[70vh]">
//       <section className="bg-[var(--panel)] rounded-xl p-4 flex flex-col glow">
//         <div className="flex items-center justify-between mb-3">
//           <div className="text-purple-300 font-semibold">File Name</div>
//           <div className="flex items-center gap-3">
//             <button onClick={run} className="px-3 py-1 rounded-full bg-gradient-to-b from-brand-700 to-brand-500 text-white" disabled={running}>▶ Run</button>
//             <select value={language} onChange={e=>setLanguage(e.target.value)} className="bg-transparent border border-gray-700 rounded px-2 py-1">
//               <option value="python">Python</option>
//               <option value="javascript">JavaScript</option>
//             </select>
//             <button onClick={save} className="px-3 py-1 rounded-full border border-purple-600 text-purple-200">Save</button>
//           </div>
//         </div>
//         <div className="flex-1 overflow-hidden rounded-md">
//           <CodeEditor language={language} code={code} onChange={setCode} />
//         </div>
//       </section>

//       <aside className="bg-[var(--panel)] rounded-xl p-4 flex flex-col glow">
//         <h3 className="text-purple-300">Output</h3>
//         <pre className="mt-3 bg-black/40 p-3 rounded h-full overflow-auto text-sm whitespace-pre-wrap">{output}</pre>
//       </aside>
//     </div>
//   );
// }

// EditorLayout.jsx
import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import OutputPanel from './OutputPanel';
import axios from 'axios';

export default function EditorLayout() {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(`# python example\nprint("hello codemist")`);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setOutput('Running...');
    try {
      const languageMap = { python: 71, javascript: 63 };
      const resp = await axios.post('/api/runner/run', {
        source_code: code,
        language_id: languageMap[language]
      }, { timeout: 60000 });
      setOutput(JSON.stringify(resp.data, null, 2));
    } catch (err) {
      setOutput('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setRunning(false);
    }
  };

  const save = async () => {
    try {
      await axios.post('/api/snippets', { title: 'untitled', language, code });
      alert('Saved');
    } catch (e) {
      alert('Save failed: ' + (e.message || e));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 h-[70vh]">

      <section className="bg-[var(--panel)] rounded-xl p-4 flex flex-col glow">
        <div className="flex items-center justify-between mb-3">
          <div className="text-purple-300 font-semibold">File Name</div>

          <div className="flex items-center gap-3">
            <button onClick={run} disabled={running}
              className="px-3 py-1 rounded-full bg-gradient-to-b from-brand-700 to-brand-500 text-white">
              ▶ Run
            </button>

            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-transparent border border-gray-700 rounded px-2 py-1"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>

            <button onClick={save}
              className="px-3 py-1 rounded-full border border-purple-600 text-purple-200">
              Save
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden rounded-md">
          <CodeEditor language={language} code={code} onChange={setCode} />
        </div>
      </section>

      <aside className="bg-[var(--panel)] rounded-xl p-4 flex flex-col glow">
        <h3 className="text-purple-300">Output</h3>
        <pre className="mt-3 bg-black/40 p-3 rounded h-full overflow-auto text-sm whitespace-pre-wrap">
          {output}
        </pre>
      </aside>

    </div>
  );
}
