"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompletedTodo = exports.deleteCompletedTodo = exports.addCompletedTodo = exports.getCompletedTodos = exports.deleteTodo = exports.updateTodo = exports.addTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../../models/todo"));
const express_1 = require("express");
const completedTodo_1 = __importDefault(require("../../models/completedTodo"));
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find();
        res.status(200).json(todos);
    }
    catch (err) {
        throw new Error("Error getting todos");
    }
});
exports.getTodos = getTodos;
const getCompletedTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completedTodos = yield completedTodo_1.default.find();
        res.status(200).json(completedTodos);
    }
    catch (err) {
        throw new Error("Error getting completed todos");
    }
});
exports.getCompletedTodos = getCompletedTodos;
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("check 1");
        const body = req.body;
        console.log(body);
        const todo = new todo_1.default({
            id: body.id,
            todo: body.todo,
            isDone: body.isDone,
        });
        const newTodo = yield todo.save();
        const allTodos = yield todo_1.default.find();
        res
            .status(201)
            .json({ message: "Todo added", todo: newTodo, todos: allTodos });
    }
    catch (error) {
        throw error;
    }
});
exports.addTodo = addTodo;
const addCompletedTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("check completed");
        const body = req.body;
        console.log(body);
        const completedtodo = new completedTodo_1.default({
            id: body.id,
            todo: body.todo,
            isDone: body.isDone,
        });
        const newTodo = yield completedtodo.save();
        const allTodos = yield completedTodo_1.default.find();
        res
            .status(201)
            .json({ message: "completed Todo added", todo: newTodo, todos: allTodos });
    }
    catch (error) {
        throw error;
    }
});
exports.addCompletedTodo = addCompletedTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("check2");
    console.log(req.body);
    try {
        const { params: { id }, body, } = req;
        const updateTodo = yield todo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo updating",
            todo: updateTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTodo = updateTodo;
const updateCompletedTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("check3");
    console.log(req.body);
    try {
        const { params: { id }, body, } = req;
        const updateCompletedTodo = yield completedTodo_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTodos = yield completedTodo_1.default.find();
        res.status(200).json({
            message: "completed Todo updating",
            todo: updateCompletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateCompletedTodo = updateCompletedTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const deletedTodo = yield todo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield todo_1.default.find();
        res.status(200).json({
            message: "Todo deleted",
            todo: deletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTodo = deleteTodo;
const deleteCompletedTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const deletedCompletedTodo = yield completedTodo_1.default.findByIdAndRemove(req.params.id);
        const allTodos = yield completedTodo_1.default.find();
        res.status(200).json({
            message: "completedTodo deleted",
            todo: deletedCompletedTodo,
            todos: allTodos,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteCompletedTodo = deleteCompletedTodo;
const router = (0, express_1.Router)();
router.get("/todos", getTodos);
router.get("/completedtodos", getCompletedTodos);
router.post("/add-todo", jsonParser, addTodo);
router.post("/add-completed-todo", jsonParser, addCompletedTodo);
router.put("/edit-todo/:id", jsonParser, updateTodo);
router.put("/edit-completedtodo/:id", jsonParser, updateCompletedTodo);
router.delete("/delete-todo/:id", deleteTodo);
router.delete("/delete-completedtodo/:id", deleteCompletedTodo);
exports.default = router;
//# sourceMappingURL=index.js.map