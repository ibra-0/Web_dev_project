const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.classList.add("delete-btn");

    checkbox.addEventListener("change", function () {
        span.classList.toggle("done");
    });

    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(li);
    });

    editBtn.addEventListener("click", function () {

        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;

        li.replaceChild(input, span);
        input.focus();

        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                const newText = input.value.trim();
                if (newText !== "") {
                    span.textContent = newText;
                }
                li.replaceChild(span, input);
            }
        });

        input.addEventListener("blur", function () {
            li.replaceChild(span, input);
        });
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";
}
