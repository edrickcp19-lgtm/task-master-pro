"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos las utilidades matemáticas que pide la práctica
const math_utils_js_1 = require("./math-utils.js");
// 1. Definimos datos de prueba (Primitivos y Arrays como pide la guía)
const calificaciones = [85, 92, 78, 95, 88, 120, 10]; // 120 y 10 son posibles atípicos
const limiteSuperior = 100;
console.log("--- Reporte de Análisis Estadístico ---");
// 2. Uso de las funciones con tipado estricto
const media = (0, math_utils_js_1.calcularMedia)(calificaciones);
const mediana = (0, math_utils_js_1.calcularMediana)(calificaciones);
const limpios = (0, math_utils_js_1.filtrarAtipicos)(calificaciones, limiteSuperior);
// 3. Salida por consola para verificar (lo que pide la sección "Ejecución y Verificación")
console.log(`Media calculada: ${media}`);
console.log(`Mediana calculada: ${mediana}`);
console.log(`Registros válidos (sin atípicos):`, limpios);
// 4. Verificación de caso límite (Array vacío)
console.log("Prueba array vacío (Media):", (0, math_utils_js_1.calcularMedia)([]));
