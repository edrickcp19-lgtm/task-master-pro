export type Carrera = "Ingeniería" | "Derecho" | "Medicina" | "Artes";

export interface Estudiante {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    carrera: Carrera;
    materiasInscritas: string[];
    promedio?: number;
}

export interface Profesor {
    id: number;
    nombre: string;
    especialidad: string;
    activo: boolean;
}

// --- MÓDULO 4: Utility Types ---
// Partial permite que todos los campos sean opcionales para actualizaciones
export type ActualizacionEstudiante = Partial<Estudiante>;

// Omit permite crear un tipo sin el campo 'id'
export type EstudianteNuevo = Omit<Estudiante, "id">;