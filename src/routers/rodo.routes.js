"use strict";

const { TodoController } = require("../controllers");
const isAuth = require("../middlewares/auth.middleware");
const TodoSchema = require("../validators/todo.validator");
const validate = require("../middlewares/validation.middleware");
const router = require("express").Router();

router.use(isAuth());

// (GET /api/todos/me)
router.get("/me", TodoController.getUserTodos);

// (GET /api/todos/me/:id)
router.get("/me/:id", TodoController.getTodoById);

// (POST /api/todos/me)
router.post("/me", validate(TodoSchema.create), TodoController.create);

// (PATCH /api/todos/me/:id)
router.patch("/me/:id", validate(TodoSchema.update), TodoController.update);

// (DELETE /api/todos/me/:id)
router.delete("/me/:id", TodoController.deleteTodo);

module.exports = router;
