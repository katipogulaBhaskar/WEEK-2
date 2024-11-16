import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controller/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getTasks); // Get all tasks
router.post('/', authMiddleware, createTask); // Create a new task
router.put('/:id', authMiddleware, updateTask); // Update a task
router.delete('/:id', authMiddleware, deleteTask); // Delete a task

export default router;
