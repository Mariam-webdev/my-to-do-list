function addTask() {
    const taskInput = document.getElementById('task');
    const taskList = document.getElementById('task-list');
    const newTask = document.createElement('li');
    const taskText = taskInput.value;
    newTask.innerText = taskText;

    const completedButton = document.createElement('button');
    completedButton.textContent = 'Terminée';
    completedButton.onclick = function() {
        taskList.classList.toggle(newTask);
        };
        newTask.appendChild(completedButton);

        const deletedButton = document.createElement('button');
        deletedButton.textContent = 'Supprimer';
        deletedButton.onclick = function() {
            taskList.removeChild(newTask);
        };
        newTask.appendChild(deletedButton);

    taskList.appendChild(newTask);
    taskInput.value ='';
}