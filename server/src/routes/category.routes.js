import express from "express";
import categoryController from "../controllers/category.controller";

const categoryRouter = express.Router();

categoryRouter.route("/api/categories").get(categoryController.list);
categoryRouter.route("/api/categories").post(categoryController.create);

categoryRouter.param("categoryID", categoryController.categoryByID);

categoryRouter
  .route("/api/categories/:categoryID")
  .get(categoryController.read)
  .put(categoryController.update)
  .delete(categoryController.remove);

export default categoryRouter;
