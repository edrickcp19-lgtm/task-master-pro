import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Estudiante } from './models.js';
import { guardarEstudiante, obtenerTodos, actualizarEstudiante } from './database.js';

const app: Application = express();
app.use(cors());
app.use(express.json());

// --- MÓDULO 1: Lógica Matemática ---
const calcularMedia = (datos: number[]): number | null => {
    if (datos.length === 0) return null;
    return datos.reduce((acc, val) => acc + val, 0) / datos.length;
};

app.get('/api/v1/stats', (req: Request, res: Response) => {
    const notas = [10, 8, 9, 7];
    const media = calcularMedia(notas);
    res.json({ estatus: "success", modulo: 1, media });
});

// --- MÓDULO 3: Gestión de Estudiantes ---
app.get('/api/v1/estudiantes', (req: Request, res: Response) => {
    res.json(obtenerTodos());
});

app.post('/api/v1/estudiantes', (req: Request, res: Response) => {
    const nuevo: Estudiante = req.body;
    guardarEstudiante(nuevo);
    res.status(201).json({ mensaje: "Creado", alumno: nuevo });
});

// --- MÓDULO 4: Actualización con Partial ---
app.patch('/api/v1/estudiantes/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const cambios = req.body; // Aquí TypeScript usa el Partial<Estudiante>
    const resultado = actualizarEstudiante(id, cambios);
    res.json({ mensaje: resultado, cambiosAplicados: cambios });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log(`🚀 SERVIDOR TOTALMENTE FUNCIONAL`);
    console.log(`📂 Módulos 1, 2, 3 y 4 integrados`);
    console.log(`🔗 URL: http://localhost:${PORT}/api/v1/estudiantes`);
    console.log("------------------------------------------");
});