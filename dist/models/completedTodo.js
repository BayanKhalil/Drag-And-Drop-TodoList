"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const completedTodo = new mongoose_1.Schema({
    id: { type: Number },
    todo: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("completedTodo", completedTodo);
//# sourceMappingURL=completedTodo.js.map