// Estructura estándar para todas las respuestas de tu "API"
interface RespuestaAPI<T> {
    codigoEstado: number;
    exito: boolean;
    datos: T;
}

export async function obtenerRecurso<T>(endpoint: string): Promise<RespuestaAPI<T>> {
    console.log(`Solicitando datos a: ${endpoint}...`);
    
    // Simulamos un retraso de red
    return new Promise((resolve) => {
        setTimeout(() => {
            // Aquí en un caso real iría un fetch()
            // Por ahora retornamos un objeto genérico
            resolve({
                codigoEstado: 200,
                exito: true,
                datos: {} as T // El 'as T' es necesario en simulaciones
            });
        }, 1000);
    });
}