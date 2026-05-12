"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerRecurso = obtenerRecurso;
async function obtenerRecurso(endpoint) {
    console.log(`Llamando a: ${endpoint}...`);
    // Simulamos un retraso de red
    return new Promise((resolve) => {
        setTimeout(() => {
            // Aquí simulamos que la API responde con cualquier dato de tipo T
            // En un caso real, esto vendría de un fetch()
            const mockData = {};
            resolve({
                codigoEstado: 200,
                exito: true,
                datos: mockData
            });
        }, 1000);
    });
}
