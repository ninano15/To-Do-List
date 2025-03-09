document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    loadTasks();

    addTaskBtn.addEventListener("click", function () {
        if (taskInput.value.trim() !== "") {
            addNewTask(taskInput.value, false);
            saveTasks();
            taskInput.value = "";
        }
    });

    function getRandomPastelColor() {
        const hue = Math.floor(Math.random() * 360); // Random hue (0-360)
        return `hsl(${hue}, 80%, 90%)`; // Soft pastel color
    }

    function addNewTask(taskText, isCompleted = false) {
        const task = document.createElement("li");
        task.style.backgroundColor = getRandomPastelColor(); // Set random pastel color
        task.style.opacity = 0; // Initially hidden

        task.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${isCompleted ? "checked" : ""}>
            <textarea class="task-text">${taskText}</textarea>
            <button class="delete-btn">Delete Task</button>
        `;

        taskList.appendChild(task);

        const textarea = task.querySelector(".task-text");
        autoResize(textarea); // Adjust height on creation

        // Mark completed tasks
        if (isCompleted) {
            textarea.classList.add("completed");
        }

        textarea.addEventListener("input", function () {
            autoResize(textarea);
            saveTasks();
        });

        task.querySelector(".task-checkbox").addEventListener("change", function () {
            textarea.classList.toggle("completed", this.checked);
            saveTasks();
        });

        task.querySelector(".delete-btn").addEventListener("click", function () {
            task.style.opacity = 0; // Fade out before removing
            setTimeout(() => {
                task.remove();
                saveTasks();
            }, 500);
        });

        // Fade-in effect
        setTimeout(() => {
            task.style.opacity = 1;
            task.style.transition = "opacity 1.5s ease-in-out";
        }, 100);

        saveTasks();
    }

    function autoResize(textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("li").forEach(task => {
            const text = task.querySelector(".task-text").value;
            const isCompleted = task.querySelector(".task-checkbox").checked;
            tasks.push({ text, isCompleted });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach(task => {
            addNewTask(task.text, task.isCompleted);
        });
    }

    
});

document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "images/bg1.jpg",
        "images/bg2.jpg",
        "images/bg3.jpg",
        "images/bg4.jpg",
        "images/bg5.jpg"
    ];
    
    let currentImageIndex = 0;
    const background = document.getElementById("background");

    function changeBackground() {
        background.style.opacity = 0; // Fade out
        setTimeout(() => {
            background.style.backgroundImage = `url(${images[currentImageIndex]})`;
            background.style.opacity = 1; // Fade in
            currentImageIndex = (currentImageIndex + 1) % images.length;
        }, 2000); // Time for fade-out effect (2s)
    }

    setInterval(changeBackground, 8000); // Change every 8 seconds
    changeBackground(); // Initial load
});