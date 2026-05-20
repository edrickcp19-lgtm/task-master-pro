import React from 'react';
import type { Task, TaskStatus } from '../context/TaskContext';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onMove: (id: string, nextStatus: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onMove }) => {
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'ALTA':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'MEDIA':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'BAJA':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col gap-3 group">
      <div className="flex justify-between items-center">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-rose-50 text-xs"
          title="Eliminar tarea"
        >
          🗑️
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-semibold text-slate-800 text-base leading-snug">
          {task.title}
        </h4>
        <p className="text-slate-500 text-sm line-clamp-3">
          {task.description}
        </p>
      </div>

      <div className="border-t border-slate-100 my-1"></div>

      <div className="flex justify-end gap-1.5">
        {task.status !== 'PENDIENTE' && (
          <button
            onClick={() => onMove(task.id, 'PENDIENTE')}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded-md transition-colors"
          >
            ← Pendiente
          </button>
        )}
        
        {task.status !== 'EN_PROGRESO' && (
          <button
            onClick={() => onMove(task.id, 'EN_PROGRESO')}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 px-2 py-1 rounded-md transition-colors"
          >
            {task.status === 'PENDIENTE' ? 'Empezar →' : '← Proceso'}
          </button>
        )}

        {task.status !== 'COMPLETADA' && (
          <button
            onClick={() => onMove(task.id, 'COMPLETADA')}
            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-2 py-1 rounded-md transition-colors"
          >
            Terminar ✔
          </button>
        )}
      </div>
    </div>
  );
};