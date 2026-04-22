"use strict";

const { MESSAGES, LIMITS, REGEX } = require("../constants");
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, MESSAGES.VALIDATION.TODO.TITLE_REQUIRED],
            trim: true,
            minlength: [
                LIMITS.TODO.TITLE_MIN_LENGTH,
                MESSAGES.VALIDATION.TODO.TITLE_LENGTH,
            ],
            maxlength: [
                LIMITS.TODO.TITLE_MAX_LENGTH,
                MESSAGES.VALIDATION.TODO.TITLE_LENGTH,
            ],
            match: [REGEX.NO_HTML_TAGS, MESSAGES.VALIDATION.TODO.NO_HTML_TAGS],
        },

        description: {
            type: String,
            trim: true,
            default: "",
            maxlength: [
                LIMITS.TODO.DESCRIPTION_MAX_LENGTH,
                MESSAGES.VALIDATION.TODO.DESCRIPTION_MAX_LENGTH,
            ],
            match: [REGEX.NO_HTML_TAGS, MESSAGES.VALIDATION.TODO.NO_HTML_TAGS],
        },

        completed: {
            type: Boolean,
            default: false,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.__v;
                return ret;
            },
        },
    },
);

module.exports = mongoose.model("Todo", TodoSchema);
