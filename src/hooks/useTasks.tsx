import { useTasks as useTasksFromContext } from '../context/TaskContext';

// Exportamos nuestro hook personalizado listo para usar en las páginas
export const useTasks = useTasksFromContext;