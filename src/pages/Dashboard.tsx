import React, { useState } from 'react';
import { KanbanColumn } from '../components/KanbanColumn';
import { useTasks } from '../hooks/useTasks';
import { TaskPriority } from '../types';

export const Dashboard: React.FC = () => {
  const { tasks, isLoading, addTask, updateTaskStatus, deleteTask } = useTasks();

  // Estados locales para el formulario de nueva tarea
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask(title, description, priority);
    setTitle('');
    setDescription('');
    setPriority('MEDIA');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <p className="text-slate-500 font-medium text-lg animate-pulse">Cargando tu tablero Kanban...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">TaskMaster Pro</h1>
        <p className="text-slate-500 text-sm">Gestión estricta de tareas con TypeScript y React</p>
      </header>

      {/* Formulario para Añadir Tarea */}
      <section className="max-w-7xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
        <h2 className="text-lg font-bold text-slate-700 mb-4">Añadir Nueva Tarea</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Fix login crash"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Error 500 al enviar credenciales"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Prioridad</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-indigo-500"
              >
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors duration-150 h-[38px] self-end"
            >
              Crear
            </button>
          </div>
        </form>
      </section>

      {/* Tablero Kanban Real */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <KanbanColumn
          title="Pendientes"
          status="PENDIENTE"
          tasks={tasks}
          onDeleteTask={deleteTask}
          onMoveTask={updateTaskStatus}
        />
        <KanbanColumn
          title="En Progreso"
          status="EN_PROGRESO"
          tasks={tasks}
          onDeleteTask={deleteTask}
          onMoveTask={updateTaskStatus}
        />
        <KanbanColumn
          title="Completadas"
          status="COMPLETADA"
          tasks={tasks}
          onDeleteTask={deleteTask}
          onMoveTask={updateTaskStatus}
        />
      </main>
    </div>
  );
};