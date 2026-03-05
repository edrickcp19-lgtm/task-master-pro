// 1. Selección de elementos con validación
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const taskCountLabel = document.getElementById('task-count');

let tasks = [];

// 5. Cargar tareas al iniciar (Persistencia)
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('myTasksPro');
    if (savedData) {
        tasks = JSON.parse(savedData);
        render();
    }
});

// 1. Evento para capturar el formulario
if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (text) {
            createTask(text);
            taskInput.value = ''; // 2. Limpiar input
        }
    });
}

// 2. Crear nueva tarea
function createTask(text) {
    const newTask = {
        id: Date.now(),
        text: text
    };
    tasks.push(newTask);
    saveAndRender();
}

// 3. Eliminar tarea
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// 4. Guardar en LocalStorage y renderizar
function saveAndRender() {
    localStorage.setItem('myTasksPro', JSON.stringify(tasks));
    render();
}

// Función para dibujar las tareas en el HTML
function render() {
    if (!taskContainer) return; // Si no hay contenedor, no hace nada

    taskContainer.innerHTML = '';
    
    // Actualizar contador con validación (Evita el TypeError)
    if (taskCountLabel) {
        taskCountLabel.textContent = `${tasks.length} Tarea${tasks.length !== 1 ? 's' : ''}`;
    }

    // Dibujar cada elemento
    tasks.forEach(task => {
        const article = document.createElement('article');
        article.className = 'task-item';
        
        article.innerHTML = `
            <div class="task-content">
                <h3>${task.text}</h3>
                <span class="category">Pendiente</span>
            </div>
            <button class="delete-btn">Eliminar</button>
        `;

        // Evento de eliminación
        article.querySelector('.delete-btn').onclick = () => deleteTask(task.id);
        
        taskContainer.appendChild(article);
    });
}
