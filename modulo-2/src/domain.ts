// Interfaces base con Readonly para IDs
export interface Asignatura {
    readonly id: number;
    nombre: string;
}

export interface Estudiante {
    readonly id: string;
    nombre: string;
    email: string;
}

// --- UNIÓN DISCRIMINADA (Patrón clave de la práctica) ---
interface MatriculaActiva {
    tipo: "ACTIVA";
    asignaturas: string[];
}

interface MatriculaSuspendida {
    tipo: "SUSPENDIDA";
    motivo: string;
}

interface MatriculaFinalizada {
    tipo: "FINALIZADA";
    notaMedia: number;
}

export type EstadoMatricula = MatriculaActiva | MatriculaSuspendida | MatriculaFinalizada;

export function generarReporte(estado: EstadoMatricula): string {
    switch (estado.tipo) {
        case "ACTIVA":
            return `El estudiante está cursando: ${estado.asignaturas.join(", ")}`;
        case "SUSPENDIDA":
            return `Matrícula suspendida por: ${estado.motivo}`;
        case "FINALIZADA":
            return `Carrera terminada con nota media de: ${estado.notaMedia}`;
        default:
            // --- ESTO ES EL EXHAUSTIVENESS CHECKING ---
            const comprobacionExhaustiva: never = estado;
            throw new Error(`Estado no manejado: ${comprobacionExhaustiva}`);
    }
}