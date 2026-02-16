const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const listEl = document.getElementById("list");

let tasks = loadTasks(); 

render();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.unshift({
    id: crypto.randomUUID(),
    text,
    done: false,
  });

  taskInput.value = "";
  saveTasks();
  render();
}

function toggleDone(id) {
  tasks = tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function render() {
  listEl.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "item";

    const check = document.createElement("div");
    check.className = "check";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = task.done;
    cb.addEventListener("change", () => toggleDone(task.id));
    check.appendChild(cb);

    const text = document.createElement("div");
    text.className = "text" + (task.done ? " done" : "");
    text.textContent = task.text;

    const trash = document.createElement("div");
    trash.className = "trash";

    const btn = document.createElement("button");
    btn.title = task.done ? "Delete" : "Complete task to delete";
    btn.innerHTML = `<i class="fa-solid fa-trash-alt"></i>`;

    if (!task.done) btn.classList.add("disabled");

    btn.addEventListener("click", () => deleteTask(task.id));
    trash.appendChild(btn);

    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(trash);

    listEl.appendChild(li);
  });

 }

function saveTasks() {
  localStorage.setItem("todo_tasks", JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem("todo_tasks");
    if (!raw) {
      return [
        { id: crypto.randomUUID(), text: "First item", done: true },
        { id: crypto.randomUUID(), text: "Second item", done: false },
        { id: crypto.randomUUID(), text: "Third item", done: false },
      ];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}