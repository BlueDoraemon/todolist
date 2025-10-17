// UI 

function show(project) {
    // TODO: clear the div

    //  TODO: change the title


    // for each todo display it
    project.todo.array.forEach(e => {
        displayToDo(e)
    });
    return true;
}
function displayToDo(todo) {
    const listContainer = document.getElementById('todolist');
    if (!listContainer) {
        console.error("Error: The 'todo-list' container was not found in the DOM.");
        return false;
    }
    const todoWrapper = document.createElement('div');
    todoWrapper.className = 'todo-item'; 

    const todoTitle = document.createElement('p');
    todoTitle.textContent = todo.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn'; // TODO: How to check for deleting the right todoitem
    deleteButton.addEventListener('click', function(event) {
        const itemToRemove = event.target.parentElement;
        itemToRemove.remove();
            });

    todoWrapper.appendChild(todoTitle);
    todoWrapper.appendChild(deleteButton);
    listContainer.appendChild(todoWrapper);

    return true;
}