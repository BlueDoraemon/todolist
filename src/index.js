import { createProject } from './projects.js';
import { isThereACurrentProject, getProject, saveProject } from './localStorage.js';
import { show } from './ui.js';


function defaultProject() {
    let newProject = createProject("New Project");
    newProject.createToDoItem("New Todo", "Description");
    return newProject;
}

//check localstorage or else create new project


// check local storage for project // else create new
if (isThereACurrentProject()) {
    console.log("Okay")

}
else console.log("Nope")
let currentProject = (isThereACurrentProject()) ? getProject() : defaultProject();

// show(currentProject);


