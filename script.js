function addTask() {
    const taskInput = document.getElementById('task'); 
    const dateInput = document.getElementById('date-input'); 
    const categoryInput = document.getElementById('category-input'); 
    const priorityInput = document.getElementById('priority-input'); 
    const taskText = taskInput.value; 
    const dueDate = dateInput.value; 
    const taskCategory = categoryInput.value; 
    const taskPriority = priorityInput.value;


    const task = {
        text: taskText,
        dueDate: dueDate,
        category: taskCategory,
        priority: taskPriority,
        completed: false
    };

    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = ''; 
    dateInput.value = ''; 
    categoryInput.value = 'dislabe selected'; 
    priorityInput.value = ''; 
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');

    const newTask = document.createElement('li'); 
    newTask.textContent = `${task.text} - Échéance: ${task.dueDate} - Catégorie: ${task.category} - Priorité: ${task.priority}`;

    const completedButton = document.createElement('button'); 
    completedButton.textContent = 'Terminée'; 
    completedButton.onclick = function() { 
        newTask.classList.toggle('completed');
        task.completed = !task.completed;
        saveTasksToLocalStorage();
    };
    newTask.appendChild(completedButton);

    const modifierButton = document.createElement('button'); 
    modifierButton.textContent = 'Modifier'; 
    modifierButton.onclick = function() { 
        const editedTaskText = prompt('Modifier la tâche', task.text);
        if (editedTaskText !== null && editedTaskText !== '') {
            task.text = editedTaskText;
            newTask.textContent = `${task.text} - Échéance: ${task.dueDate} - Catégorie: ${task.category} - Priorité: ${task.priority}`;
            newTask.appendChild(completedButton);
            newTask.appendChild(modifierButton);
            newTask.appendChild(deleteButton);
            saveTasksToLocalStorage();
        }
    };
    newTask.appendChild(modifierButton); 

    const deleteButton = document.createElement('button'); 
    deleteButton.textContent = 'Supprimer'; 
    deleteButton.onclick = function() { 
        taskList.removeChild(newTask); 
        removeTaskFromLocalStorage(task);
    };
    newTask.appendChild(deleteButton); 

    taskList.appendChild(newTask);

    if (task.completed) {
        newTask.classList.add('completed');
    }
}

function saveTask(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#task-list li')).map(li => {
        const text = li.firstChild.textContent.split(' - ')[0];
        const dueDate = li.firstChild.textContent.split(' - ')[1].split(': ')[1];
        const category = li.firstChild.textContent.split(' - ')[2].split(': ')[1];
        const priority = li.firstChild.textContent.split(' - ')[3].split(': ')[1];
        return {
            text: text,
            dueDate: dueDate,
            category: category,
            priority: priority,
            completed: li.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

function filterTasks(status) { 
    const tasks = document.querySelectorAll('#task-list li'); 
    tasks.forEach(task => { 
        if (status === 'all') { 
            task.style.display = ''; 
        } else if (status === 'completed' && task.classList.contains('completed')) { 
            task.style.display = ''; 
        } else if (status === 'ongoing' && !task.classList.contains('completed')) { 
            task.style.display = ''; 
        } else { 
            task.style.display = 'none'; 
        } 
    }); 
}

function searchTasks() { 
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); 
    const tasks = document.querySelectorAll('#task-list li'); 
    tasks.forEach(task => { 
        const text = task.textContent.toLowerCase(); 
        if (text.includes(searchInput)) { 
            task.style.display = ''; 
        } else { 
            task.style.display = 'none';
        } 
    }); 
}

