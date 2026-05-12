import { Estudiante } from './domain.js';

// Creamos un tipo que:
// 1. Omite el 'id' (porque no debe editarse)
// 2. Hace que el resto de campos sean opcionales (Partial)
type DatosEdicionEstudiante = Partial<Omit<Estudiante, "id">>;

export function actualizarPerfil(id: string, cambios: DatosEdicionEstudiante) {
    console.log(`Actualizando estudiante ${id} con los siguientes cambios:`, cambios);
    // Aquí iría la lógica de guardado
}

// Ejemplo de uso:
actualizarPerfil("USR-123", { nombre: "Nuevo Nombre" }); // Válido, solo enviamos lo que cambia