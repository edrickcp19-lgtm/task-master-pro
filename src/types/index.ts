// Definimos los tres estados posibles de una tarea en el tablero Kanban
export type TaskStatus = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';

// Definimos los niveles de prioridad
export type TaskPriority = 'BAJA' | 'MEDIA' | 'ALTA';

// Interfaz estricta para nuestro objeto Tarea
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
}
