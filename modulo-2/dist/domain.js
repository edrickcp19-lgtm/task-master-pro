"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarReporte = generarReporte;
function generarReporte(estado) {
    switch (estado.tipo) {
        case "ACTIVA":
            return `El estudiante está cursando: ${estado.asignaturas.join(", ")}`;
        case "SUSPENDIDA":
            return `Matrícula suspendida por: ${estado.motivo}`;
        case "FINALIZADA":
            return `Carrera terminada con nota media de: ${estado.notaMedia}`;
        default:
            // Esto lo mejoraremos en el módulo 3 con el tipo 'never'
            return "Estado desconocido";
    }
}
