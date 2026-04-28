const taskService = require('../services/task.service');

module.exports = {
    // Obtener todas las tareas
    getTasks: (req, res) => {
        const tasks = taskService.obtenerTodas();
        res.status(200).json(tasks);
    },

    // Crear una nueva tarea con validación (Fase B)
    createTask: (req, res) => {
        const { title } = req.body;
        
        // Validación en la frontera de red
        if (!title || title.trim().length < 3) {
            return res.status(400).json({ 
                error: "El título es obligatorio y debe tener al menos 3 caracteres" 
            });
        }

        const newTask = taskService.crear(title);
        res.status(201).json(newTask); // Semántica 201 Created
    },

    // Eliminar una tarea (Fase A)
    deleteTask: (req, res) => {
        const { id } = req.params;
        const exitoso = taskService.borrar(id);
        
        if (exitoso) {
            res.status(204).send(); // Semántica 204 No Content
        } else {
            res.status(404).json({ error: "Tarea no encontrada" });
        }
    }
};