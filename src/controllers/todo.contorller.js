"use strict";

const { TodoService } = require("../services");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/responseFormatter");
const { HTTP_STATUS, MESSAGES } = require("../constants");

const create = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const todoData = req.body;

    todoData.createdBy = userId;

    const todo = await TodoService.create(todoData);

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.TODO.CREATED.code,
        MESSAGES.SUCCESS.TODO.CREATED.message,
        { todo },
    );
});

const getTodoById = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const todoId = req.params.id;

    const todo = await TodoService.getTodoById(userId, todoId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.TODO.FETCHED.code,
        MESSAGES.SUCCESS.TODO.FETCHED.message,
        { todo },
    );
});

const getUserTodos = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const todos = await TodoService.getUserTodos(userId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.TODO.FETCHED.code, // ՇՏԿՎԱԾ Է
        MESSAGES.SUCCESS.TODO.FETCHED.message, // ՇՏԿՎԱԾ Է
        { todos },
    );
});

const update = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const todoId = req.params.id;
    const todoData = req.body;

    const updatedTodo = await TodoService.update(userId, todoId, todoData);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.TODO.UPDATED.code,
        MESSAGES.SUCCESS.TODO.UPDATED.message,
        { updatedTodo },
    );
});

const deleteTodo = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const todoId = req.params.id;

    await TodoService.deleteTodo(userId, todoId);

    return res.status(HTTP_STATUS.NO_CONTENT).end();
});

module.exports = {
    create,
    getTodoById,
    getUserTodos,
    update,
    deleteTodo,
};
