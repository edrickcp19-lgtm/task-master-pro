/**
 * INTERFAZ BASE - Módulo 2
 * Define la estructura del objeto Estudiante.
 * El 'id' es readonly para que no pueda ser sobrescrito accidentalmente.
 */
export interface Estudiante {
    readonly id: string;
    nombre: string;
    email: string;
    carrera: string;
}

/**
 * UTILITY TYPE - Módulo 3
 * Creamos un tipo específico para la edición de datos:
 * 1. Omit<Estudiante, "id">: Elimina el campo 'id' de la interfaz para que no se pueda editar.
 * 2. Partial<...>: Hace que el resto de campos (nombre, email, carrera) sean opcionales.
 * * Esto permite que al actualizar, podamos pasar solo el nombre, o solo la carrera,
 * pero nunca el ID.
 */
export type DatosEdicionEstudiante = Partial<Omit<Estudiante, "id">>;