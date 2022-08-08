import { model, Schema  } from "mongoose";
import { Todo } from "../types/todo";

const completedTodo: Schema = new Schema({
  id: { type: Number},
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
export default model<Todo>("completedTodo", completedTodo);