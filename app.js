// Selección de elementos
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const taskCountLabel = document.getElementById('task-count');

let tasks = [];

// 5. Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('myTasksPro');
    if (data) {
        tasks = JSON.parse(data);
        render();
    }
});

// 1. Evento de escucha para el formulario
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

// 2. Función para crear tarea
function createTask(text) {
    const newTask = { id: Date.now(), text: text };
    tasks.push(newTask);
    saveAndRender();
}

// 3. Función para eliminar
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// 4. Guardar en LocalStorage y Renderizar
function saveAndRender() {
    localStorage.setItem('myTasksPro', JSON.stringify(tasks));
    render();
}

function render() {
    if (!taskContainer) return;
    
    taskContainer.innerHTML = '';
    
    // CORRECCIÓN DEL ERROR: Validamos si existe el contador antes de usarlo
    if (taskCountLabel) {
        taskCountLabel.textContent = `${tasks.length} Tarea${tasks.length !== 1 ? 's' : ''}`;
    }

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

        article.querySelector('.delete-btn').onclick = () => deleteTask(task.id);
        taskContainer.appendChild(article);
    });
}

