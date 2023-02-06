import express from "express";
import authController from "../controllers/auth.controller";
import taskController from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter
  .route("/api/tasks")
  .get(authController.requireSignin, taskController.list);
taskRouter
  .route("/api/tasks")
  .post(authController.requireSignin, taskController.create);

taskRouter.param("taskID", taskController.taskbyID);
taskRouter.param("userID", taskController.taskByUser);

taskRouter
  .route("/api/users/:userID/tasks/:taskID")
  .get(
    authController.requireSignin,
    taskController.read
  );

taskRouter
  .route("/api/users/:userID/tasks/:taskID")
  .put(authController.requireSignin, taskController.update);

taskRouter
  .route("/api/users/:userID/tasks/:taskID")
  .delete(authController.requireSignin, taskController.remove);

export default taskRouter;
