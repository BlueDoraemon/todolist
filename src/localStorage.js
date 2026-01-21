const LOCAL_STORAGE_KEY = "toDoProject";

/**
 * Checks if a project exists in localStorage.
 * @returns {boolean} - True if a project is found, false otherwise.
 */
export function isThereACurrentProject() {
    return localStorage.getItem(LOCAL_STORAGE_KEY) !== null;
}
/**
 * Retrieves the project from localStorage and parses it back into an object.
 * @returns {object | null} - The project object, or null if no project is found.
 */
export function getProject() {
  const projectJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  // Return null if no project is stored
  if (projectJSON === null) {
    return null;
  }
  
  // Parse the JSON string back into a JavaScript object
  try {
    console.log("Loaded project")
    return JSON.parse(projectJSON);
  } catch (e) {
    console.error("Error parsing project from localStorage:", e);
    return null; // Return null if JSON is invalid
  }
}
/**
 * Saves a project object to localStorage.
 * @param {object} project - The project object to save.
 */
export function saveProject(project) {
  try {
    const projectJSON = JSON.stringify(project);
    localStorage.setItem(LOCAL_STORAGE_KEY, projectJSON);
  } catch (e) {
    console.error("Error saving project to localStorage:", e);
  }
}
