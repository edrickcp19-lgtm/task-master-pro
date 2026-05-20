import React, { createContext, useContext, useState, useEffect } from 'react';

export type TaskStatus = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';
export type TaskPriority = 'BAJA' | 'MEDIA' | 'ALTA';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Omit<Task, 'id' | 'status'>) => {
    setTasks([...tasks, { ...newTask, id: crypto.randomUUID(), status: 'PENDIENTE' }]);
  };

  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de un TaskProvider');
  }
  return context;
}