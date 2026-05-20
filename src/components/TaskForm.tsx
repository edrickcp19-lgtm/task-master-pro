import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import type { TaskPriority } from '../context/TaskContext';

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('MEDIA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title, description: '', priority });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm mb-8 flex gap-2">
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="border border-slate-200 p-2 rounded-lg w-full"
      />
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
        className="border border-slate-200 p-2 rounded-lg"
      >
        <option value="BAJA">Baja</option>
        <option value="MEDIA">Media</option>
        <option value="ALTA">Alta</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Añadir
      </button>
    </form>
  );
};