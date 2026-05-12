// 1. Interfaces base con readonly
export interface Estudiante {
    readonly id: string; // Inmutable
    nombre: string;
    edad: number;
}

export interface Asignatura {
    readonly id: string;
    nombre: string;
    creditos: number;
}

// 2. Unión Discriminada (Patrón avanzado)
interface MatriculaActiva {
    tipo: "ACTIVA"; // Discriminante
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