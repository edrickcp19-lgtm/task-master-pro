import React from 'react';
import type { Task, TaskStatus } from '../context/TaskContext';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onMoveTask: (id: string, nextStatus: TaskStatus) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  status, 
  tasks, 
  onDeleteTask, 
  onMoveTask 
}) => {
  const columnTasks = tasks.filter(task => task.status === status);

  return (
    <div className="bg-slate-50 p-4 rounded-2xl w-full min-w-[280px] flex flex-col border border-slate-100">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="font-bold text-slate-700 text-lg flex items-center gap-2">
          {title}
          <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
            {columnTasks.length}
          </span>
        </h3>
      </div>
      
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-250px)] pr-1">
        {columnTasks.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-sm">
            No hay tareas aquí
          </div>
        ) : (
          columnTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onDelete={onDeleteTask} 
              onMove={onMoveTask} 
            />
          ))
        )}
      </div>
    </div>
  );
};