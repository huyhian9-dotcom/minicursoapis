// 1. Onde nossa API está morando? (Endereço do servidor FastAPI)
const API_URL = 'http://localhost:8000';

// 2. Referências dos elementos HTML que vamos manipular
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');

/**
 * MÉTODO GET (Buscar Dados)
 * Esta função vai até a API, pega as tarefas e chama a renderTasks para mostrar na tela.
 */
async function fetchTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`); // Chamada padrão é GET
        const tasks = await response.json();
        renderTasks(tasks);
        updateStatus(true); // API está respondendo!
    } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        updateStatus(false); // API provavelmente está desligada
    }
}

/**
 * Função de auxílio para desenhar as tarefas no HTML
 */
function renderTasks(tasks) {
    taskList.innerHTML = ''; // Limpa a lista antes de desenhar
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleTask(${task.id}, '${task.title}', ${task.completed})">
                ${task.title}
            </span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
        `;
        taskList.appendChild(li);
    });
}

/**
 * MÉTODO POST (Criar Dados)
 * Pega o texto do input e envia para a API criar uma nova tarefa.
 */
async function addTask() {
    const title = taskInput.value.trim();
    if (!title) return; // Não envia se estiver vazio

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST', // Especificamos o método POST
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false }) // Dados em JSON
        });

        if (response.ok) {
            taskInput.value = ''; // Limpa o campo de texto
            fetchTasks(); // Atualiza a lista para mostrar a nova tarefa
        }
    } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
    }
}

/**
 * MÉTODO PUT (Atualizar Dados)
 * Inverte o status de 'concluída' da tarefa clicada.
 */
async function toggleTask(id, title, completed) {
    try {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT', // Especificamos o método PUT
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: !completed })
        });
        fetchTasks(); // Atualiza a lista
    } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
    }
}

/**
 * MÉTODO DELETE (Remover Dados)
 * Pede para a API apagar a tarefa pelo ID dela.
 */
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE' // Especificamos o método DELETE
        });
        fetchTasks(); // Atualiza a lista
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
    }
}

// Função visual para mostrar se o backend está ligado
function updateStatus(online) {
    if (online) {
        statusDot.classList.add('online');
        statusText.innerText = 'Backend Online (Pronto para requisições)';
    } else {
        statusDot.classList.remove('online');
        statusText.innerText = 'Backend Offline (Inicie o main.py no Python)';
    }
}

// Eventos de clique e teclado
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Iniciamos buscando as tarefas assim que a página carrega
fetchTasks();

// Verifica o status da API a cada 5 segundos para manter o sinal de "Online/Offline"
setInterval(fetchTasks, 5000);
