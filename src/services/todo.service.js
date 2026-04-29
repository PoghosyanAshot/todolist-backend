"use strict";

const { TodoRepository } = require("../repositories");
const { NotFoundError, ForbiddenError } = require("../errors");

class TodoService {
    static async create(todoData) {
        return await TodoRepository.create(todoData);
    }

    static async getTodoById(userId, todoId) {
        const todo = await TodoRepository.getTodoById(todoId);

        TodoService.#checkTodoExists(todo);
        TodoService.#checkOwnership(todo, userId);

        return todo;
    }

    static async getUserTodos(userId) {
        return await TodoRepository.getUserTodos(userId);
    }

    static async update(userId, todoId, todoData) {
        const todo = await TodoRepository.getTodoById(todoId);

        TodoService.#checkTodoExists(todo);
        TodoService.#checkOwnership(todo, userId);

        return await TodoRepository.update(todoId, todoData);
    }

    static async deleteTodo(userId, todoId) {
        const todo = await TodoRepository.getTodoById(todoId);

        TodoService.#checkTodoExists(todo);
        TodoService.#checkOwnership(todo, userId);

        return await TodoRepository.deleteTodo(todoId);
    }

    static #checkTodoExists(todo) {
        if (!todo) {
            throw new NotFoundError();
        }
    }

    static #checkOwnership(todo, userId) {
        if (userId.toString() !== todo.createdBy._id.toString()) {
            throw new ForbiddenError();
        }
    }
}

module.exports = TodoService;
