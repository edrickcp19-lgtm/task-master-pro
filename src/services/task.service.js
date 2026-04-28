// Capa de Servicio: Lógica de negocio pura (Fase B)
let tasks = []; // Persistencia en memoria

module.exports = {
    obtenerTodas: () => {
        return tasks;
    },

    crear: (title) => {
        const newTask = {
            id: Date.now(),
            title: title,
            completed: false,
            createdAt: new Date().toLocaleString('es-ES')
        };
        tasks.unshift(newTask); // Añadir al inicio
        return newTask;
    },

    borrar: (id) => {
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== parseInt(id));
        return tasks.length !== initialLength;
    }
};