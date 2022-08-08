import { model, Schema  } from "mongoose";
import { Todo } from "../types/todo";

const todoSchema: Schema = new Schema({
  id: { type: Number},
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
export default model<Todo>("schemaTodo", todoSchema);