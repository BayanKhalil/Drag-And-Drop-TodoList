import { Document } from "mongoose";

export interface Todo extends Document {
    id: number;
    todo: string;
    isDone: boolean;
}