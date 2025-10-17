import {createToDoItem} from './todo'
import {createProject} from './projects'
import {isThereACurrentProject,getProject,saveProject}  from './localStorage'
import {displayToDo,show} from './ui'


function defaultProject() {
    let newProject = createProject("New Project");
    newProject.createToDoItem("New Todo", "Description");
    return newProject;
}

//check localstorage or else create new project


// check local storage for project // else create new
let currentProject = isThereACurrentProject() ? getProject() : defaultProject();

show(currentProject);


