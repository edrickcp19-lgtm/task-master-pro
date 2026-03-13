// Selectores
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// Estados
let tasks = [];
let currentFilter = 'all';

// --- INICIO Y PERSISTENCIA (Punto 7) ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('taskFlow_data');
    if (savedTasks) tasks = JSON.parse(savedTasks);
    
    // Cargar Tema
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
    
    render();
});

// --- FUNCIONES CORE ---
function save() {
    localStorage.setItem('taskFlow_data', JSON.stringify(tasks));
    render();
}

// Añadir Tarea (Punto 6)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
    };

    tasks.unshift(newTask);
    taskInput.value = '';
    save();
});

// Alternar estado (Marcar completada)
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
}

// Eliminar tarea
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
}

// Editar tarea (Punto 8)
function editTask(id) {
    const newTitle = prompt("Edita tu tarea:");
    if (newTitle && newTitle.trim()) {
        tasks = tasks.map(t => t.id === id ? { ...t, title: newTitle.trim() } : t);
        save();
    }
}

// Borrar completadas (Punto 8)
function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    save();
}

// Filtros y Búsqueda
function setFilter(filter) {
    currentFilter = filter;
    render();
}

searchInput.addEventListener('input', render);

// --- RENDERIZADO Y ESTADÍSTICAS ---
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    document.getElementById('stats-total').textContent = total;
    document.getElementById('stats-completed').textContent = completed;
    document.getElementById('stats-pending').textContent = total - completed;
}

function render() {
    taskContainer.innerHTML = '';
    const query = searchInput.value.toLowerCase();

    // Filtrado lógico
    let filteredTasks = tasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(query);
        if (currentFilter === 'pending') return matchesSearch && !t.completed;
        if (currentFilter === 'completed') return matchesSearch && t.completed;
        return matchesSearch;
    });

    if (filteredTasks.length === 0) {
        taskContainer.innerHTML = `<p class="text-center text-slate-400 py-10 text-sm italic">No hay tareas que mostrar</p>`;
    }

    filteredTasks.forEach(task => {
        const article = document.createElement('article');
        article.className = `flex justify-between items-center p-4 rounded-xl border transition-all ${
            task.completed ? 'bg-slate-50 dark:bg-slate-900/50 border-transparent opacity-75' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm'
        }`;

        article.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onclick="toggleTask(${task.id})"
                       class="w-5 h-5 accent-indigo-600 cursor-pointer">
                <div>
                    <h3 class="font-medium ${task.completed ? 'line-through text-slate-400' : ''}">${task.title}</h3>
                    <span class="text-[10px] text-slate-400 font-bold uppercase">${task.createdAt}</span>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="editTask(${task.id})" class="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button onclick="deleteTask(${task.id})" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
        `;
        taskContainer.appendChild(article);
    });

    updateStats();
}

// --- MODO OSCURO ---
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

