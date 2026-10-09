// --- 1. GREETING & CLOCK ---
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date-display').textContent = now.toLocaleDateString('id-ID', options);

  const hours = now.getHours();
  let greeting = 'Good Morning';
  if (hours >= 12 && hours < 17) greeting = 'Good Afternoon';
  else if (hours >= 17) greeting = 'Good Evening';

  const savedName = localStorage.getItem('customName') || '';
  document.getElementById('greeting-text').textContent = `${greeting},`;
}
setInterval(updateClock, 1000);
updateClock();

// Custom Name (Challenge)
const nameInput = document.getElementById('name-input');
nameInput.value = localStorage.getItem('customName') || '';
nameInput.addEventListener('input', (e) => {
  localStorage.setItem('customName', e.target.value);
});


// --- 2. FOCUS TIMER (25 Mins) ---
let timerInterval;
let timeLeft = 25 * 60;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer-display').textContent = 
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      alert('Waktu fokus selesai!');
    }
  }, 1000);
});

document.getElementById('stop-btn').addEventListener('click', () => clearInterval(timerInterval));

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  updateTimerDisplay();
});


// --- 3. TO-DO LIST (Local Storage) ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveAndRenderTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('done');

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
        <span>${task.text}</span>
      </label>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

document.getElementById('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('todo-input');
  if (input.value.trim() !== '') {
    tasks.push({ text: input.value.trim(), completed: false });
    input.value = '';
    saveAndRenderTasks();
  }
});

window.toggleTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  saveAndRenderTasks();
};

window.editTask = (index) => {
  const newText = prompt('Edit tugas:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveAndRenderTasks();
  }
};

window.deleteTask = (index) => {
  tasks.splice(index, 1);
  saveAndRenderTasks();
};

// Sort Tasks (Challenge)
document.getElementById('sort-tasks-btn').addEventListener('click', () => {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  saveAndRenderTasks();
});

saveAndRenderTasks();


// --- 4. QUICK LINKS (Local Storage) ---
let quickLinks = JSON.parse(localStorage.getItem('quickLinks')) || [
  { name: 'Google', url: 'https://google.com' },
  { name: 'Gmail', url: 'https://mail.google.com' }
];

function saveAndRenderLinks() {
  localStorage.setItem('quickLinks', JSON.stringify(quickLinks));
  const container = document.getElementById('links-container');
  container.innerHTML = '';

  quickLinks.forEach((link, index) => {
    const a = document.createElement('a');
    a.href = link.url;
    a.target = '_blank';
    a.className = 'link-btn';
    a.innerHTML = `${link.name} <button class="btn-delete" onclick="deleteLink(event, ${index})">✕</button>`;
    container.appendChild(a);
  });
}

document.getElementById('link-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('link-name');
  const urlInput = document.getElementById('link-url');
  
  quickLinks.push({ name: nameInput.value.trim(), url: urlInput.value.trim() });
  nameInput.value = '';
  urlInput.value = '';
  saveAndRenderLinks();
});

window.deleteLink = (e, index) => {
  e.preventDefault(); // Mencegah navigasi tautan saat menghapus
  e.stopPropagation();
  quickLinks.splice(index, 1);
  saveAndRenderLinks();
};

saveAndRenderLinks();


// --- 5. LIGHT / DARK MODE (Challenge) ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '☀️ Light Mode';
}

themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggleBtn.textContent = '🌙 Dark Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggleBtn.textContent = '☀️ Light Mode';
  }
});