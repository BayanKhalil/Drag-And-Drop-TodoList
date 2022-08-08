"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    id: { type: Number },
    todo: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false,
        required: true
    }
});
exports.default = (0, mongoose_1.model)("schemaTodo", todoSchema);
//# sourceMappingURL=todo.js.map