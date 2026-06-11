const Task = require("../models/task.model");
const {
  createTaskSchema,
  updateStatusSchema,
} = require("../schemas/task.schema");

class TaskController {
  async create(req, res, next) {
    try {
      const data = createTaskSchema.parse(req.body);

      const task = await Task.create(data);

      return res.status(201).json({
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const { status, tag, search } = req.query;

      const filter = {
        deletedAt: null,
      };

      if (status) {
        filter.status = status;
      }

      if (tag) {
        filter.tags = { $in: [tag] };
      }

      if (search) {
        filter.title = {
          $regex: search,
          $options: "i",
        };
      }

      const tasks = await Task.find(filter).sort({ createdAt: -1 });

      return res.status(200).json({
        message: "Tasks listed successfully",
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = updateStatusSchema.parse(req.body);

      const task = await Task.findOneAndUpdate(
        {
          _id: id,
          deletedAt: null,
        },
        { status },
        { new: true }
      );

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      return res.status(200).json({
        message: "Task status updated successfully",
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;

      const task = await Task.findOneAndUpdate(
        {
          _id: id,
          deletedAt: null,
        },
        {
          deletedAt: new Date(),
        },
        { new: true }
      );

      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      return res.status(200).json({
        message: "Task removed successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TaskController();