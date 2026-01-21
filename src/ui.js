// ui.js 
const CONTAINER = "input-container";
const TITLE_ID = "project-title";
import { saveProject } from './localStorage.js'; 
const BUTTON_CONTAINER_ID = "btn-container"; // New ID for where buttons go

// --- Helper for creating inputs ---
function createFormField(id, labelText, type = "text", placeholder = "") {
    const wrapper = document.createElement("div");
    wrapper.className = "form-group";
    
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = labelText;
    
    let input;
    if (type === "textarea") {
        input = document.createElement("textarea");
        input.rows = 3;
    } else if (type === "select") {
        input = document.createElement("select");
    } else {
        input = document.createElement("input");
        input.type = type;
    }
    
    input.id = id;
    input.placeholder = placeholder;
    
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    return { wrapper, input };
}

export function show(project) {
    const listContainer = document.getElementById(CONTAINER);
    const titleElement = document.getElementById(TITLE_ID);

    if (!listContainer) return false;

    // 1. Clear the div
    listContainer.innerHTML = "";

    // 2. Change the title
    if (titleElement) {
        titleElement.textContent = project.title;
    }

    // 3. Display each todo
    project.toDoList.forEach(todo => {
        displayToDo(todo, project); 
    });

    return true;
}

export function displayToDo(todo, project) {
    const listContainer = document.getElementById(CONTAINER);
    if (!listContainer) return false;

    const todoWrapper = document.createElement('div');
    todoWrapper.className = `todo-item priority-${todo.priority || 'low'}`; 

    // Title and Date
    const infoDiv = document.createElement('div');
    const todoTitle = document.createElement('p');
    todoTitle.className = "todo-text";
    todoTitle.textContent = todo.title;
    
    const todoDate = document.createElement('span');
    todoDate.className = "todo-date";
    todoDate.textContent = todo.dueDate ? `Due: ${todo.dueDate}` : "No Date";

    infoDiv.appendChild(todoTitle);
    infoDiv.appendChild(todoDate);

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn'; 
    deleteButton.addEventListener('click', function(event) {
        if (project) {
            // 1. Remove from data
            project.removeTodo(todo);
            
            // 2. SAVE the change to local storage
            saveProject(project); 
        }
        // 3. Remove from UI
        event.target.closest('.todo-item').remove();
    });
    
    deleteButton.addEventListener('click', function(event) {
        if (project) {
            project.removeTodo(todo);
            // NOTE: You must call save from index.js or pass a save callback here
            // For now, we just update the UI
        }
        event.target.closest('.todo-item').remove();
    });

    todoWrapper.appendChild(infoDiv);
    todoWrapper.appendChild(deleteButton);
    listContainer.appendChild(todoWrapper);

    return true;
}

/**
 * Creates a modal to add a new task.
 * @param {Function} saveCallback - Function to run when user clicks "Save". Receives { title, description, dueDate, priority }
 */
export function addNewTask(saveCallback) {
    // 1. Create Modal Overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // 2. Create Form Container
    const form = document.createElement('div');
    form.className = 'task-form';
    
    const header = document.createElement('h3');
    header.textContent = "New Task";
    form.appendChild(header);

    // 3. Create Inputs
    const titleObj = createFormField("new-title", "What needs to be done?", "text");
    const descObj = createFormField("new-desc", "Notes / Description", "textarea");
    const dateObj = createFormField("new-date", "Due Date", "date");
    
    // Priority Dropdown
    const priorityObj = createFormField("new-prio", "Priority", "select");
    ["Low", "Medium", "High"].forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.toLowerCase();
        opt.textContent = p;
        priorityObj.input.appendChild(opt);
    });

    form.appendChild(titleObj.wrapper);
    form.appendChild(descObj.wrapper);
    form.appendChild(dateObj.wrapper);
    form.appendChild(priorityObj.wrapper);

    // 4. Buttons (Save / Cancel)
    const btnGroup = document.createElement('div');
    btnGroup.className = 'form-buttons';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Task';
    saveBtn.className = 'save-btn';

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.className = 'cancel-btn';

    // Event: Cancel
    cancelBtn.addEventListener('click', () => {
        overlay.remove();
    });

    // Event: Save
    saveBtn.addEventListener('click', () => {
        if (titleObj.input.value === "") {
            alert("Title is required!");
            return;
        }
        
        // Pass data back to index.js
        if(saveCallback) {
            saveCallback({
                title: titleObj.input.value,
                description: descObj.input.value,
                dueDate: dateObj.input.value,
                priority: priorityObj.input.value
            });
        }
        overlay.remove();
    });

    btnGroup.appendChild(cancelBtn);
    btnGroup.appendChild(saveBtn);
    form.appendChild(btnGroup);

    overlay.appendChild(form);
    document.body.appendChild(overlay);
}

/**
 * Renders the main control buttons (like "Add Task")
 * @param {Function} onAddClick - Function to run when "Add Task" is clicked
 */
export function displayButtons(onAddClick) {
    const container = document.getElementById(BUTTON_CONTAINER_ID) || document.body;
    
    // Prevent duplicate buttons if called multiple times
    const existingBtn = document.getElementById('add-task-global-btn');
    if(existingBtn) return; 

    const addBtn = document.createElement('button');
    addBtn.id = 'add-task-global-btn';
    addBtn.textContent = "+ Add Task";
    addBtn.className = "add-task-btn"; // Style this in CSS
    
    addBtn.addEventListener('click', () => {
        // We pass a callback to addNewTask to handle the data saving
        addNewTask(onAddClick);
    });

    // If you have a specific container for buttons in HTML, use it. 
    // Otherwise, prepend to body or main container.
    if (document.getElementById(BUTTON_CONTAINER_ID)) {
        container.appendChild(addBtn);
    } else {
        document.body.insertBefore(addBtn, document.getElementById(CONTAINER));
    }
}
