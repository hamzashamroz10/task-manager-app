import Task from "../models/taskModel.js";

// CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, completed } = req.body;

        const task = new Task({
            title,
            description,
            priority,
            dueDate,
            completed: completed === 'Yes' || completed === true,
            owner: req.user.id
        });

        const saved = await task.save();
        res.status(201).json({ success: true, message: "Task created successfully", task: saved });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// GET ALL TASKS FOR LOGGED-IN USER
export const getTask = async (req, res) => {
    try {
        const task = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// GET SINGLE TASK BY ID
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.json({ success: true, task });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.completed !== undefined) {
            data.completed = data.completed === 'Yes' || data.completed === true;
        }

        const update = await Task.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            data,
            { new: true, runValidators: true }
        );

        if (!update) {
            return res.status(404).json({
                success: false,
                message: "Task not found or not yours"
            });
        }

        res.json({ success: true, message: "Task updated successfully", task: update });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
    try {
        const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Task not found or not yours" });
        }

        res.json({ success: true, message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
