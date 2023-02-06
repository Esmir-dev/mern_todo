import express from "express";
import authController from "../controllers/auth.controller";
import taskController from "../controllers/task.controller";

const taskAggragatedRouter = express.Router();

taskAggragatedRouter
  .route("/api/tasks/:userID/:categoryID")
  .get(authController.requireSignin, taskController.tasksByCategory);

export default taskAggragatedRouter;
