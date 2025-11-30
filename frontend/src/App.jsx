// import React from 'react';
// import React from 'lucide-react';
// import EditorLayout from './components/EditorLayout';

// export default function App(){
//   return (
//     <div className="min-h-screen bg-[var(--bg)] text-white">
//       <header className="text-center py-8">
//         <h1 className="text-4xl tracking-widest font-light">Codemist</h1>
//         <p className="text-sm text-purple-300">Code Editor</p>
//       </header>
//       <main className="px-6 pb-6">
//         <EditorLayout />
//       </main>
//     </div>
//   );
// }
import React from "react";
import EditorLayout from "./components/EditorLayout";

export default function App() {
  return (
    <div className="p-6">
      <EditorLayout />
    </div>
  );
}
