// 1. Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const taskCountLabel = document.getElementById('task-count'); // Elemento para el contador

// Array global de tareas
let tasks = [];

// 5. Cargar tareas al iniciar (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('myTasksPro');
    if (data) {
        tasks = JSON.parse(data);
        render(); // Dibujar lo que recuperamos
    }
});

// 1. Evento de escucha para el formulario (Añadir tarea)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    
    if (text) {
        createTask(text);
        taskInput.value = ''; // 2. Limpiar el input tras añadir
    }
});

// 2. Función para crear el objeto de tarea
function createTask(text) {
    const newTask = {
        id: Date.now(), // ID único basado en tiempo
        text: text
    };
    tasks.push(newTask);
    saveAndRender();
}

// 3. Función para eliminar tarea por ID
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// 4. Guardar en LocalStorage y Actualizar Vista
function saveAndRender() {
    localStorage.setItem('myTasksPro', JSON.stringify(tasks));
    render();
}

// Función principal de dibujo (Renderizado)
function render() {
    // Limpiamos el contenedor para no duplicar
    taskContainer.innerHTML = '';
    
    // Actualizar el contador (Evita el error que tenías)
    if (taskCountLabel) {
        taskCountLabel.textContent = `${tasks.length} Tarea${tasks.length !== 1 ? 's' : ''}`;
    }

    // Dibujar cada tarea como un <article>
    tasks.forEach(task => {
        const article = document.createElement('article');
        article.className = 'task-item'; // Clase de tu CSS
        
        article.innerHTML = `
            <div class="task-content">
                <h3>${task.text}</h3>
                <span class="category">Pendiente</span>
            </div>
            <button class="delete-btn">Eliminar</button>
        `;

        // Asignar el evento de borrado al botón de esta tarea específica
        article.querySelector('.delete-btn').onclick = () => deleteTask(task.id);
        
        taskContainer.appendChild(article);
    });
}
