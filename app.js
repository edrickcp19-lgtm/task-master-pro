// 1. Selección de elementos (Punto 3 y 6)
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// Elementos de estadísticas (Punto 3)
const statsTotal = document.getElementById('stats-total');
const statsCompleted = document.getElementById('stats-completed');
const statsPending = document.getElementById('stats-pending');

// 2. Estado de la aplicación
let tasks = [];
let currentFilter = 'all'; // Filtro por defecto (Punto 8)

// 3. Persistencia: Recuperar datos (Punto 7)
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('taskFlow_data');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    
    // Recuperar preferencia de modo oscuro (Punto 9)
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
    
    render();
});

// 4. Lógica de Persistencia (Punto 7)
function save() {
    localStorage.setItem('taskFlow_data', JSON.stringify(tasks));
    render();
}

// 5. Añadir Tarea (Punto 6)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    
    if (!title) return; // Punto 10: Evitar tareas sin título

    const newTask = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date().toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    tasks.unshift(newTask); // Añadir al principio de la lista
    taskInput.value = '';
    save();
});

// 6. Funciones de acción (Punto 6 y 8)
function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newTitle = prompt("Edita tu tarea:", task.title);
    if (newTitle && newTitle.trim()) {
        tasks = tasks.map(t => t.id === id ? { ...t, title: newTitle.trim() } : t);
        save();
    }
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    save();
}

// 7. Filtros y Búsqueda (Punto 8)
function setFilter(filter) {
    currentFilter = filter;
    // Actualizar UI de botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('bg-white', btn.dataset.filter === filter);
        btn.classList.toggle('dark:bg-slate-800', btn.dataset.filter === filter);
        btn.classList.toggle('text-slate-500', btn.dataset.filter !== filter);
    });
    render();
}

if (searchInput) {
    searchInput.addEventListener('input', render);
}

// 8. Actualizar Estadísticas (Punto 6)
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    if(statsTotal) statsTotal.textContent = total;
    if(statsCompleted) statsCompleted.textContent = completed;
    if(statsPending) statsPending.textContent = total - completed;
}

// 9. Renderizado Principal (Punto 6)
function render() {
    if (!taskContainer) return;
    taskContainer.innerHTML = '';
    
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    // Lógica de filtrado combinada (Búsqueda + Filtro de estado)
    let filteredTasks = tasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(query);
        if (currentFilter === 'pending') return matchesSearch && !t.completed;
        if (currentFilter === 'completed') return matchesSearch && t.completed;
        return matchesSearch;
    });

    // Manejo de lista vacía (Punto 10)
    if (filteredTasks.length === 0) {
        taskContainer.innerHTML = `
            <div class="text-center py-10 opacity-50">
                <p class="italic text-sm">No hay tareas que coincidan</p>
            </div>`;
    }

    filteredTasks.forEach(task => {
        const article = document.createElement('article');
        
        // Punto 11: Accesibilidad y estados visuales
        article.className = `flex justify-between items-center p-4 rounded-xl border transition-all animate-in fade-in duration-300 ${
            task.completed 
            ? 'bg-slate-50 dark:bg-slate-900/50 border-transparent opacity-60' 
            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-sm'
        }`;

        article.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onclick="toggleTask(${task.id})"
                       aria-label="Marcar como completada"
                       class="w-5 h-5 accent-indigo-600 cursor-pointer rounded">
                <div>
                    <h3 class="font-medium transition-all ${task.completed ? 'line-through text-slate-400' : ''}">
                        ${task.title}
                    </h3>
                    <span class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        ${task.createdAt}
                    </span>
                </div>
            </div>
            <div class="flex gap-1">
                <button onclick="editTask(${task.id})" 
                        aria-label="Editar tarea"
                        class="p-2 text-slate-400 hover:text-indigo-500 transition-colors focus:ring-2 ring-indigo-500 rounded-lg outline-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                </button>
                <button onclick="deleteTask(${task.id})" 
                        aria-label="Eliminar tarea"
                        class="p-2 text-slate-400 hover:text-red-500 transition-colors focus:ring-2 ring-red-500 rounded-lg outline-none">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
            </div>
        `;
        taskContainer.appendChild(article);
    });

    updateStats();
}

// 10. Modo Oscuro (Punto 9)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}
