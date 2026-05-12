"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_js_1 = require("./domain.js");
const miEstado = {
    tipo: "ACTIVA",
    asignaturas: ["TypeScript", "React", "Node"]
};
console.log((0, domain_js_1.generarReporte)(miEstado));
