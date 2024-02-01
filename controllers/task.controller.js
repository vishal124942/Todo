import Task from "../models/Task.models.js";
import ErrorHandler from "../middlewares/error.js";
export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    if (!tasks) return next(new ErrorHandler("Task Not Found", 404));
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler());
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler());
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
