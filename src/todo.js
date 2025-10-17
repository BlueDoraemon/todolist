class ToDoItem {
  // Private fields are often prefixed with an underscore by convention
  constructor(title, description, dueDate = null,done = false) {
    this._title = title;
    this._description = description;
    this._dueDate = dueDate;
    this._done = done;
  }

  // Title getter/setter
  get title() {
    return this._title;
  }
  set title(newTitle) {
    if (newTitle && newTitle.length > 0) {
      this._title = newTitle;
    } else {
      console.error("Title cannot be empty.");
    }
  }

  // Description getter/setter
  get description() {
    return this._description;
  }
  set description(newDescription) {
    this._description = newDescription;
  }

  // DueDate getter/setter
  get dueDate() {
    return this._dueDate;
  }
  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }
    // Getter for the 'done' status
  get isDone() {
    return this._done;
  }
// ============
  toggleDone() {
    this._done = !this.done;
  }
}

function createToDoItem(title, description, dueDate = null) {
  return new ToDoItem(title, description, dueDate);
}