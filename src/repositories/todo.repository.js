"use strict";

const Todo = require("../models/todo.model");

class TodoRepository {
    static create(todoData) {
        const todo = new Todo(todoData);
        return todo.save();
    }

    static getTodoById(todoId) {
        return Todo.findById(todoId)
            .populate("createdBy", "-createdAt -updatedAt -role")
            .exec();
    }

    static getUserTodos(userId) {
        return Todo.find({ createdBy: userId })
            .sort({ createdAt: -1 })
            .populate("createdBy", "-createdAt -updatedAt -role")
            .exec();
    }

    static update(todoId, todoData) {
        return Todo.findByIdAndUpdate(todoId, todoData, {
            returnDocument: "after",
            runValidators: true,
        }).populate("createdBy", "-createdAt -updatedAt -role");
    }

    static deleteTodo(todoId) {
        return Todo.findByIdAndDelete(todoId);
    }
}

module.exports = TodoRepository;
