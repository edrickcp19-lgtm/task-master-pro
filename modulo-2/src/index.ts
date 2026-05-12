import { generarReporte, EstadoMatricula } from './domain.js';

const miEstado: EstadoMatricula = {
    tipo: "ACTIVA",
    asignaturas: ["TypeScript", "React", "Node"]
};

console.log(generarReporte(miEstado));