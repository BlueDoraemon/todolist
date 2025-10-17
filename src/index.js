import {createToDoItem} from './todo'
import {createProject} from './projects'
import {isThereACurrentProject,getProject,saveProject}  from './localStorage'
//check localstorage or else create new project


// check local storage for project 
if isThereACurrentProject() 
// else create new
createProject("Hello From New Project")