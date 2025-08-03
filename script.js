document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // Don't save again while loading
        });
    }

    // Function to save the current tasks array to Local Storage
    function saveTasksToStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add a task to the list and optionally to Local Storage
    function addTask(taskText, save = true) {
        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        // Create <li> for the task
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove task from DOM and localStorage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = currentTasks.filter(task => task !== taskText);
            saveTasksToStorage(updatedTasks);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to Local Storage
        if (save) {
            const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            currentTasks.push(taskText);
            saveTasksToStorage(currentTasks);
        }

        taskInput.value = '';
    }

    // Event listener: Add Task button
    addButton.addEventListener('click', function () {
        addTask(taskInput.value, true);
    });

    // Event listener: Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value, true);
        }
    });

    // Load tasks initially
    loadTasks();
});
