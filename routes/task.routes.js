import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
  deleteAlltask
} from "../controllers/task.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/new", isAuthenticated, newTask);
router.get("/me", isAuthenticated, getMyTask);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
  router.delete("/", isAuthenticated, deleteAllTasks);
export default router;
