"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularMedia = calcularMedia;
exports.filtrarAtipicos = filtrarAtipicos;
exports.calcularMediana = calcularMediana;
/**
 * Calcula la media aritmética de un array de números.
 * Retorna null si el array está vacío.
 */
function calcularMedia(datos) {
    if (datos.length === 0)
        return null;
    const suma = datos.reduce((acc, val) => acc + val, 0);
    return suma / datos.length;
}
/**
 * Filtra valores que superan un límite establecido (Atípicos).
 */
function filtrarAtipicos(datos, limite) {
    return datos.filter(dato => dato <= limite);
}
/**
 * Calcula la mediana de un conjunto de datos.
 */
function calcularMediana(datos) {
    if (datos.length === 0)
        return null;
    const ordenados = [...datos].sort((a, b) => a - b);
    const mitad = Math.floor(ordenados.length / 2);
    if (ordenados.length % 2 === 0) {
        return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
    }
    return ordenados[mitad];
}
