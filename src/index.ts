import express from 'express';
import cors from 'cors';
import { estudiantes, agregarEstudiante } from './database';
import { EstudianteBase } from './models';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.get('/api/v1/estudiantes', (req, res) => {
    res.json(estudiantes);
});

app.post('/api/v1/estudiantes', (req, res) => {
    const nuevo: EstudianteBase = req.body;
    const estudianteGuardado = agregarEstudiante(nuevo);
    res.status(201).json(estudianteGuardado);
});

// Esto es lo que tenías antes para correrlo localmente
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Servidor local corriendo en http://localhost:${port}`);
    });
}

// --- ESTA ES LA LÍNEA QUE HEMOS AÑADIDO ---
export default app;