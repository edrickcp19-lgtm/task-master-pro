const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');
const taskCountLabel = document.getElementById('task-count');
const themeToggle = document.getElementById('theme-toggle');

let tasks = [];

// --- GESTIÓN DE TEMA (MODO OSCURO) ---
themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Cargar tema guardado
if (localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// --- LÓGICA DE TAREAS ---
document.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('myTasksTailwind');
    if (data) {
        tasks = JSON.parse(data);
        render();
    }
});

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text: text });
        taskInput.value = '';
        saveAndRender();
    }
});

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('myTasksTailwind', JSON.stringify(tasks));
    render();
}

function render() {
    taskContainer.innerHTML = '';
    
    // Actualizar contador
    if (taskCountLabel) {
        taskCountLabel.textContent = `${tasks.length} Tarea${tasks.length !== 1 ? 's' : ''}`;
    }

    tasks.forEach(task => {
        const article = document.createElement('article');
        // Clases de utilidad de Tailwind para cada tarea
        article.className = 'flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all group';
        
        article.innerHTML = `
            <div class="flex flex-col">
                <h3 class="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${task.text}</h3>
                <span class="text-xs text-slate-500 dark:text-slate-400 italic">Pendiente</span>
            </div>
            <button class="delete-btn px-3 py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white dark:hover:bg-red-600 transition-all">
                Eliminar
            </button>
        `;

        article.querySelector('.delete-btn').onclick = () => deleteTask(task.id);
        taskContainer.appendChild(article);
    });
}
