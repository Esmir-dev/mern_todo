import taskModel from "../models/task.model";
import _, { join } from "lodash";
import dbErrorHandler from "../helpers/dbErrorHandler";

const create = (req, res, next) => {
  const task = new taskModel(req.body);

  task.save((err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    return res.status(200).json({ message: "Task Created" });
  });
};

const list = (req, res) => {
  taskModel
    .find((err, tasks) => {
      if (err) {
        return res
          .status(400)
          .json({ error: dbErrorHandler.getErrorMessage(err) });
      }

      return res.status(200).json(tasks);
    })
    .populate("userID")
    .populate("categoryID");
};

const taskbyID = (req, res, next, id) => {
  taskModel
    .findById(id)
    .exec((err, task) => {
      if (err) {
        return res
          .status(400)
          .json({ error: dbErrorHandler.getErrorMessage(err) });
      }

      req.profile = task;
      next();
    })
    .populate("userID")
    .populate("categoryID");
};

const taskByUser = (req, res, next, id) => {
  let q = req.params.userID;

  taskModel
    .find({ userID: q })
    .populate("userID")
    .populate("categoryID")
    .exec((err, task) => {
      if (err || !task) {
        return res
          .status(400)
          .json({ error: dbErrorHandler.getErrorMessage(err) });
      }

      req.profile = task;
      next();
    });
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const update = (req, res, next) => {
  var task = req.profile;
  var data = req.body;

  task = _.extend(task, data);

  task.save((err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    return res.status(200).json(req.profile);
  });
};

const remove = (req, res, next) => {
  var task = req.profile;

  task.remove((err, deletedTask) => {
    if (err) {
      return res
        .status(400)
        .json({ error: dbErrorHandler.getErrorMessage(err) });
    }

    return res.status(200).json(deletedTask);
  });
};

const tasksByCategory = (req, res) => {
  var userParam = req.params.userID;
  var catParam = req.params.categoryID;

  taskModel
    .find({ userID: userParam, categoryID: catParam })
    .populate("userID")
    .populate("categoryID")
    .exec((err, tasks) => {
      if (err || !tasks) {
        return res
          .status(400)
          .json({ error: dbErrorHandler.getErrorMessage(err) });
      }

      return res.status(200).json(tasks);
    });
};

export default {
  create,
  list,
  taskbyID,
  read,
  update,
  remove,
  taskByUser,
  tasksByCategory
};
