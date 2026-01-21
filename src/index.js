// src/index.js
import { createProject, defaultProject, Project } from './projects.js'; // 1. IMPORT 'Project' Class
import { createToDoItem } from './todo.js'; 
import { isThereACurrentProject, getProject, saveProject } from './localStorage.js';
import { show, displayButtons } from './ui.js';
import './styles.css';

// 2. Initialize currentProject correctly
let currentProject;

if (isThereACurrentProject()) {
    const rawData = getProject();
    
    // THE FIX: Convert plain JSON object back to a real Project instance
    currentProject = Project.fromJSON(rawData);
} else {
    currentProject = defaultProject();
    saveProject(currentProject);
}

// 3. Render
show(currentProject);

// 3. Render Buttons & Define Save Logic
displayButtons((formData) => {
    console.log("Saving new task...", formData);

    // A. Create the new item
    const newItem = createToDoItem(
        formData.title,
        formData.description,
        formData.dueDate
    );

    // B. Handle Priority (if your ToDoItem supports it)
    if(formData.priority) {
        newItem.priority = formData.priority;
    }

    // C. Add to Project, Save, and Refresh UI
    currentProject.addTodo(newItem);
    saveProject(currentProject);
    show(currentProject);
});
