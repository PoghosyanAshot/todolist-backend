"use strict";

const express = require("express");
const authRouter = require("./routers/auth.routes");
const UserRouter = require("./routers/user.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requestLogger = require("./middlewares/requestLogger");
const errorMiddleware = require("./middlewares/error.middleware");
const routNotFound = require("./middlewares/routNotFound.middleware");

const app = express();

// global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(requestLogger);

// routers
app.use("/api/auth", authRouter);
app.use("/api/users", UserRouter);

// 404 rout not found
app.use(routNotFound);

// error middleware
app.use(errorMiddleware);

module.exports = app;
