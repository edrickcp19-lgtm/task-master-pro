/**
 * TASKFLOW PRO - Frontend Core
 * Arquitectura de red, comunicación asíncrona y gestión de estados.
 */

const API_URL = 'http://localhost:3000/api/v1/tasks';

// 1. Selección de elementos
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

const statsTotal = document.getElementById('stats-total');
const statsCompleted = document.getElementById('stats-completed');
const statsPending = document.getElementById('stats-pending');

// 2. Estado Global
let tasks = [];
let currentFilter = 'all';

// 3. Inicialización (Fase D)
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
});

// --- COMUNICACIÓN CON EL SERVIDOR (Fase D) ---

async function loadTasks() {
    renderStatus('loading');
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener datos');
        tasks = await response.json();
        render();
    } catch (error) {
        renderStatus('error', 'No se pudo conectar con el servidor.');
        console.error(error);
    }
}

async function handleAddTask(e) {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }) // Fase B: Validación en frontera
        });

        if (response.status === 201) {
            taskInput.value = '';
            await loadTasks();
        } else {
            const err = await response.json();
            alert(err.error);
        }
    } catch (error) {
        alert("Error de red al crear la tarea.");
    }
}

async function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        });
        if (response.ok) await loadTasks();
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.status === 204) await loadTasks(); // Semántica HTTP 204
    } catch (error) {
        alert("Error al intentar eliminar.");
    }
}

// --- LÓGICA DE INTERFAZ Y RENDERIZADO ---

function renderStatus(status, message = '') {
    if (status === 'loading') {
        taskContainer.innerHTML = `
            <div class="flex flex-col items-center py-10 opacity-50">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                <p class="text-sm">Conectando con el servidor...</p>
            </div>`;
    } else if (status === 'error') {
        taskContainer.innerHTML = `
            <div class="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm border border-red-100">
                ⚠️ ${message}
            </div>`;
    }
}

function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const isActive = btn.dataset.filter === filter;
        btn.className = `filter-btn flex-1 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            isActive ? 'bg-white dark:bg-slate-800 shadow-sm' : 'text-slate-500'
        }`;
    });
    render();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    if(statsTotal) statsTotal.textContent = total;
    if(statsCompleted) statsCompleted.textContent = completed;
    if(statsPending) statsPending.textContent = total - completed;
}

function render() {
    taskContainer.innerHTML = '';
    const query = searchInput.value.toLowerCase();

    const filtered = tasks.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(query);
        if (currentFilter === 'pending') return matchesSearch && !t.completed;
        if (currentFilter === 'completed') return matchesSearch && t.completed;
        return matchesSearch;
    });

    if (filtered.length === 0) {
        taskContainer.innerHTML = `<p class="text-center py-10 text-slate-400 italic text-sm">No hay tareas que mostrar</p>`;
    }

    filtered.forEach(task => {
        const article = document.createElement('article');
        article.className = `flex justify-between items-center p-4 rounded-xl border transition-all ${
            task.completed ? 'bg-slate-50 dark:bg-slate-900/50 opacity-60' : 'bg-white dark:bg-slate-800'
        } border-slate-100 dark:border-slate-700 shadow-sm`;

        article.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" ${task.completed ? 'checked' : ''} 
                       onclick="toggleTask(${task.id})"
                       class="w-5 h-5 accent-indigo-600 cursor-pointer">
                <div>
                    <h3 class="font-medium ${task.completed ? 'line-through text-slate-400' : ''}">${task.title}</h3>
                    <span class="text-[10px] text-slate-400 font-bold uppercase tracking-widest">${task.createdAt}</span>
                </div>
            </div>
            <button onclick="deleteTask(${task.id})" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
        `;
        taskContainer.appendChild(article);
    });

    updateStats();
}

// Event Listeners
taskForm.addEventListener('submit', handleAddTask);
searchInput.addEventListener('input', render);
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});
