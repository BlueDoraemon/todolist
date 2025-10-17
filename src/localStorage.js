
function isThereACurrentProject() {
    return localStorage.toDo
}
function getProject() {
    return localStorage.getItem(toDo)
}
function saveProject(project) {
    localStorage.setItem(toDo, project);
}

