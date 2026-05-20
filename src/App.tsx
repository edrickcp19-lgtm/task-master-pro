import { TaskProvider } from './context/TaskContext';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskForm } from './components/TaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="p-10 bg-slate-50 min-h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Mi Tablero Kanban</h1>
          <p className="text-slate-600">Gestiona tus tareas de forma eficiente</p>
        </header>
        
        <TaskForm />
        <KanbanBoard />
      </div>
    </TaskProvider>
  );
}

export default App;