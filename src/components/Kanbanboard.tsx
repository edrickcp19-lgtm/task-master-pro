import React from 'react';
import { useTasks } from '../context/TaskContext';
import type { TaskStatus } from '../context/TaskContext';
import { KanbanColumn } from './KanbanColumn';

export const KanbanBoard: React.FC = () => {
  const { tasks, deleteTask, updateTaskStatus } = useTasks();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn 
        title="Pendiente" 
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
        title="Completada" 
        status="COMPLETADA" 
        tasks={tasks} 
        onDeleteTask={deleteTask} 
        onMoveTask={updateTaskStatus} 
      />
    </div>
  );
};