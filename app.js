// Selección de elementos
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const taskCountLabel = document.getElementById('task-count');

let tasks = [];

// Cargar al inicio
document.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('myTasksPro');
    if (data) {
        tasks = JSON.parse(data);
        render();
    }
});

// Añadir tarea
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        const newTask = { id: Date.now(), text: text };
        tasks.push(newTask);
        taskInput.value = '';
        saveAndRender();
    }
});

// Eliminar tarea
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

// Persistencia y actualización
function saveAndRender() {
    localStorage.setItem('myTasksPro', JSON.stringify(tasks));
    render();
}

// Dibujar en pantalla
function render() {
    taskContainer.innerHTML = '';
    
    // Actualizar contador
    taskCountLabel.textContent = `${tasks.length} Tarea${tasks.length !== 1 ? 's' : ''}`;

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