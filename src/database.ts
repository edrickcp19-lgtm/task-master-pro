import { Estudiante, ActualizacionEstudiante } from './models.js';

// Base de datos en memoria
const listaEstudiantes: Estudiante[] = [];

// Módulo 3: CRUD Básico
export const guardarEstudiante = (nuevo: Estudiante): void => {
    listaEstudiantes.push(nuevo);
    console.log(`[DB] Estudiante ${nuevo.nombre} guardado.`);
};

export const obtenerTodos = (): Estudiante[] => {
    return listaEstudiantes;
};

export const buscarPorId = (id: number): Estudiante | undefined => {
    return listaEstudiantes.find(e => e.id === id);
};

// --- MÓDULO 4: Lógica de Actualización Parcial ---
export const actualizarEstudiante = (id: number, cambios: ActualizacionEstudiante): string => {
    const indice = listaEstudiantes.findIndex(e => e.id === id);
    if (indice !== -1) {
        // El operador spread (...) fusiona los datos existentes con los nuevos cambios
        listaEstudiantes[indice] = { ...listaEstudiantes[indice], ...cambios };
        return `Estudiante con ID ${id} actualizado correctamente.`;
    }
    return "Error: Estudiante no encontrado.";
};