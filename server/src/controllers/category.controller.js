import categoryModel from "../models/category.model";
import _, { join } from "lodash";
import errorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const category = new categoryModel(req.body);

  category.save((err, result) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    return res.status(200).json({ message: "Category added" });
  });
};

const list = (req, res) => {
  categoryModel.find((err, categories) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    return res.json(categories);
  });
};

const categoryByID = (req, res, next, id) => {
  categoryModel.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: "Category not found" });
    }

    req.profile = category;
    next();
  });
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const update = (req, res, next) => {
  var category = req.profile;
  var data = req.body;

  category = _.extend(category, data);

  category.save((err) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    return res.status(200).json(category);
  });
};

const remove = (req, res, next) => {
  var category = req.profile;

  category.remove((err, deletedCategory) => {
    if (err) {
      return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }

    return res.json(deletedCategory);
  });
};

export default { create, list, categoryByID, read, update, remove };
