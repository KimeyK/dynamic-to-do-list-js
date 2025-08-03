document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            // Create a new <li> element
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            // Create a new button element for removing the task
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.className = 'remove-btn';

            // Assign an onclick event to the remove button
            removeButton.onclick = function () {
                taskList.removeChild(listItem);
            };

            // Append the remove button to the <li>, then append the <li> to the list
            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);

            // Clear the input field
            taskInput.value = "";
        } else {
            alert("Please enter a task.");
        }
    }

    // Add event listener to addButton
    addButton.addEventListener('click', addTask);

    // Add event listener to taskInput for 'keypress' to allow Enter key to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
