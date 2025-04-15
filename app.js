let task = [];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        task.push({ text: text, completed: false });
        taskInput.value = "";
        taskInput.focus();
        updateTaskList();
    }
};

const updateTaskList = () => {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    task.forEach((t, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${t.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkBox" ${t.completed ? "checked" : ""} />
                    <p>${t.text}</p>
                </div>
                <div class="icons flex gap-2">
                    <img src="writing (1).png" alt="Edit" 
                         class="edit-icon cursor-pointer" 
                         style="width: 36px; height: 36px" 
                         data-index="${index}">
                    <img src="delete.png" alt="Delete" 
                         class="delete-icon cursor-pointer" 
                         style="width: 36px; height: 36px" 
                         data-index="${index}">
                </div>
            </div>
        `;

        // Add event listeners after setting innerHTML
        listItem.querySelector('.checkBox').addEventListener('change', () => toggleTaskComplete(index));
        listItem.querySelector('.edit-icon').addEventListener('click', () => editTask(index));
        listItem.querySelector('.delete-icon').addEventListener('click', () => deleteTask(index));

        taskList.appendChild(listItem);
    });

    updateProgress();
    // local storage 
    localStorage.setItem("tasks", JSON.stringify(task));
    
};

const toggleTaskComplete = (index) => {
    task[index].completed = !task[index].completed;
    updateTaskList();
};

const deleteTask = (index) => {
    task.splice(index, 1);
    updateTaskList();
};

const editTask = (index) => {
    const newText = prompt("Edit your task:", task[index].text);
    if (newText !== null && newText.trim() !== "") {
        task[index].text = newText.trim();
        updateTaskList();
    }
};

const updateProgress = () => {
    const completed = task.filter(t => t.completed).length;
    const total = task.length;

    const progress = document.getElementById("progress");
    const stats = document.querySelector(".numbers");

    const percent = total === 0 ? 0 : (completed / total) * 100;
    progress.style.width = `${percent}%`;
    stats.textContent = `${completed} / ${total}`;

    // 🎉 Confetti trigger
    if (total > 0 && completed === total) {
        blast();
    }
};


// Add task button click handler
document.getElementById('taskNew').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

// Load tasks from localStorage when the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        task = JSON.parse(savedTasks);
    }
    updateTaskList();
});

// Optional: Handle "Enter" key for input
document.getElementById('taskInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

//confitti js animation
const blast = () =>  {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
} 
