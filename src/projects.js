// projects.js

import {createToDoItem} from './todo';
export class Project {
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

export function createProject(title) {
    return Project.create(title)
}

export function defaultProject() {
    const newProject = createProject("Default Project");
    
    // Task 1: High Priority (Red Border)
    const task1 = createToDoItem(
        "Complete Odin Project", 
        "Finish the Full Stack JavaScript curriculum to build a strong portfolio.", 
        "2026-01-31"
    );
    task1.priority = "high"; 
    
    // Task 2: Medium Priority (Orange Border)
    const task2 = createToDoItem(
        "Learn Webpack", 
        "Understand loaders, plugins, and how to bundle assets for production.", 
        "2026-01-20"
    );
    task2.priority = "medium";
    
    // Task 3: Low Priority (Green Border)
    const task3 = createToDoItem(
        "Practice JavaScript Daily", 
        "Solve one LeetCode problem or build a small component every morning.", 
        "2026-01-15"
    );
    task3.priority = "low";

    newProject.addTodo(task1);
    newProject.addTodo(task2);
    newProject.addTodo(task3);
    
    return newProject;
}
