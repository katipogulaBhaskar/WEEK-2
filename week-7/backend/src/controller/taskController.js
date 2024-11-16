import Task from '../models/Task.js'; // Import the Task model

// Get All Tasks for Logged-In User
export const getTasks = async (req, res) => {
    try {
        // Fetch tasks that belong to the logged-in user
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks); // Send tasks as response
    } catch (error) {
        console.error('Error fetching tasks:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a New Task
export const createTask = async (req, res) => {
    const { title } = req.body;

    // Ensure title is provided
    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    try {
        // Create a new task and associate it with the logged-in user
        const newTask = new Task({
            title,
            user: req.user.id,
        });

        await newTask.save(); // Save the task to the database

        res.status(201).json(newTask); // Send the created task as response
    } catch (error) {
        console.error('Error creating task:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an Existing Task
export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    // Ensure title is provided
    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    try {
        // Find the task by ID
        const task = await Task.findById(id);

        // Check if the task exists
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Ensure the logged-in user owns the task
        if (task.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to update this task' });
        }

        // Update the task title
        task.title = title;
        await task.save(); // Save changes

        res.json(task); // Send the updated task as response
    } catch (error) {
        console.error('Error updating task:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a Task
export const deleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        // Using `findByIdAndDelete()` to delete the task by its ID
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
