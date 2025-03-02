import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import randomEmail from 'random-email';

// Fix __dirname and __filename
const ___filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(___filename);

// Paths
const tasksFile = path.join(__dirname, 'data', 'tasks.json'); // Path to the Database

// Read all tasks from the database
export function readAllTasks() {
	const tasks = fs.readFileSync(tasksFile, 'utf-8');
	return JSON.parse(tasks);
}

// Get a single task

// Create a new task
export function createTask(title, description) {
	const tasks = readAllTasks();
	let email = randomEmail();

	
	if (tasks.find(task => task.owner === email)) {
		throw new Error(`This email ${email} is already in use. Try again with a new Email.`);
	}

	const newTask = {
		id: uuidv4(),
		title,
		description,
		owner: email,
		completed: false,
		createdAt: new Date().toISOString(), // 12/12/2025
	};

	tasks.push(newTask);

	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
	console.log('Task created successfully:', newTask);
}

// Update a task
export function updateTask(id, title, description) {
	const tasks = readAllTasks();

	// find the task
	const taskIndex = tasks.findIndex(task => task.id === id);

	if (taskIndex < 0) {
		throw new Error(`Task with ${id} not found.`);
	}

	// update the task
	tasks[taskIndex].title = title;
	tasks[taskIndex].description = description;

	// save it back
	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

// Delete a task
export function deleteTask(id) {
	// read all tasks
	const tasks = readAllTasks();

	const filteredTasks = tasks.filter(task => task.id !== id);

	// save all tasks back to DB
	fs.writeFileSync(tasksFile, JSON.stringify(filteredTasks, null, 2));
}

export function markTaskAsCompleted(id) {
	const tasks = readAllTasks();

	const taskIndex = tasks.findIndex(task => task.id === id);
	if (taskIndex < 0) {
		throw new Error(`Task with ID ${id} not found.`);
	}

	tasks[taskIndex].completed = true;

	fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}
export function getTasksByOwner(owner) {
	const tasks = readAllTasks();
	return tasks.filter(task => task.owner === owner);
}
export function deleteAllTasks() {
	fs.writeFileSync(tasksFile, JSON.stringify([], null, 2));
}