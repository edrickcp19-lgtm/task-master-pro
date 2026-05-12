// Importamos las utilidades matemáticas que pide la práctica
import { calcularMedia, calcularMediana, filtrarAtipicos } from './math-utils.js';

// 1. Definimos datos de prueba (Primitivos y Arrays como pide la guía)
const calificaciones: number[] = [85, 92, 78, 95, 88, 120, 10]; // 120 y 10 son posibles atípicos
const limiteSuperior: number = 100;

console.log("--- Reporte de Análisis Estadístico ---");

// 2. Uso de las funciones con tipado estricto
const media = calcularMedia(calificaciones);
const mediana = calcularMediana(calificaciones);
const limpios = filtrarAtipicos(calificaciones, limiteSuperior);

// 3. Salida por consola para verificar (lo que pide la sección "Ejecución y Verificación")
console.log(`Media calculada: ${media}`);
console.log(`Mediana calculada: ${mediana}`);
console.log(`Registros válidos (sin atípicos):`, limpios);

// 4. Verificación de caso límite (Array vacío)
console.log("Prueba array vacío (Media):", calcularMedia([]));