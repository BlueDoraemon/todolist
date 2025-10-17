class Project {
  constructor(title, toDoList = []) {
    this.title = title; // String
    this.toDoList = toDoList; // List
  }

  static create(title) {
    return new Project(title, []);
  }

  static fromJSON(obj) {
    const { title, toDoList = [] } = obj ?? {};
    return new Project(title, toDoList);
  }
  rename(newTitle) {
    this.title = newTitle;
    return this;
  }

  addTodo(item) {
    this.toDoList.push(item);
    return this;
  }
  removeTodo(item) {
        const index = this.toDoList.indexOf(item);
        if (index > -1) {
        // If the item is found, remove it from the array
            this.toDoList.splice(index, 1);
        } else {
        // Optional: throw an error if the item doesn't exist
        // This prevents silent failures.
        console.warn(`Item "${item}" not found in the to-do list.`);
        }
        return this;
    }
}

function createProject(title) {
    return Project.create(title)
}