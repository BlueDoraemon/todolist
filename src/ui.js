// UI 

function show(project) {
    //clear the div

    // change the title


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
    deleteButton.className = 'delete-btn#'; // How to check for deleting the right todoitem

    // 3. Assemble the elements and add them to the container
    todoWrapper.appendChild(todoTitle);
    todoWrapper.appendChild(deleteButton);
    listContainer.appendChild(todoWrapper);

    // 4. Return true to indicate that the function ran successfully
    return true;
}