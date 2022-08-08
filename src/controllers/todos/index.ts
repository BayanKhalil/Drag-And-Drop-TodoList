import { Response, Request } from "express"
import { Todo } from "../../types/todo"
import schemaTodo from "../../models/todo"
import { Router } from "express"
import completedTodo from "../../models/completedTodo"
var bodyParser = require('body-parser')
import * as cors from 'cors';


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const getTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const todos:Todo[] = await schemaTodo.find()
        res.status(200).json(todos)
    }catch(err){
        throw new Error("Error getting todos");
        
    }
    
}

const getCompletedTodos = async (req: Request, res: Response): Promise<void> => {
 
  try {
      
      const completedTodos:Todo[] = await completedTodo.find()
      res.status(200).json(completedTodos)
  }catch(err){
      throw new Error("Error getting completed todos");
      
  }
  
}


const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("check 1")
      const body = req.body as Pick<Todo, "id" |"todo" | "isDone">
       console.log(body)
      const todo: Todo = new schemaTodo({
        id: body.id,
        todo: body.todo,
        isDone: body.isDone,
      })
  
      const newTodo: Todo = await todo.save()
      const allTodos: Todo[] = await schemaTodo.find()
  
      res
        .status(201)
        .json({ message: "Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
      throw error
    }
  }

  const addCompletedTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("check completed")
      const body = req.body as Pick<Todo, "id" |"todo" | "isDone">
       console.log(body)
      const completedtodo: Todo = new completedTodo({
        id: body.id,
        todo: body.todo,
        isDone: body.isDone,
      })
  
      const newTodo: Todo = await completedtodo.save()
      const allTodos: Todo[] = await completedTodo.find()
  
      res
        .status(201)
        .json({ message: "completed Todo added", todo: newTodo, todos: allTodos })
    } catch (error) {
      throw error
    }
  }




const updateTodo = async (req: Request, res: Response): Promise<void> => {
  console.log("check2")
    console.log(req.body)
  try {
      const {
        params: { id },
        body,
      } = req
     
      const updateTodo: Todo | null = await schemaTodo.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allTodos: Todo[] = await schemaTodo.find()
      res.status(200).json({
        message: "Todo updating",
        todo: updateTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
}

const updateCompletedTodo = async (req: Request, res: Response): Promise<void> => {
  console.log("check3")
    console.log(req.body)
  try {
      const {
        params: { id },
        body,
      } = req
     
      const updateCompletedTodo: Todo | null = await completedTodo.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allTodos: Todo[] = await completedTodo.find()
      res.status(200).json({
        message: "completed Todo updating",
        todo: updateCompletedTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
}
  
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  console.log(req.params)
  try {
      const deletedTodo: Todo | null = await schemaTodo.findByIdAndRemove(
        req.params.id
      )
      const allTodos: Todo[] = await schemaTodo.find()
      res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }
  
    
const deleteCompletedTodo = async (req: Request, res: Response): Promise<void> => {
  console.log(req.params)
  try {
      const deletedCompletedTodo: Todo | null = await completedTodo.findByIdAndRemove(
        req.params.id
      )
      const allTodos: Todo[] = await completedTodo.find()
      res.status(200).json({
        message: "completedTodo deleted",
        todo: deletedCompletedTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }
export { getTodos, addTodo, updateTodo, deleteTodo ,getCompletedTodos,addCompletedTodo,deleteCompletedTodo,updateCompletedTodo}
  

const router: Router = Router()

router.get("/todos", getTodos)
router.get("/completedtodos", getCompletedTodos)

router.post("/add-todo",jsonParser, addTodo)
router.post("/add-completed-todo",jsonParser, addCompletedTodo)

router.put("/edit-todo/:id", jsonParser, updateTodo)
router.put("/edit-completedtodo/:id",jsonParser,updateCompletedTodo)


router.delete("/delete-todo/:id", deleteTodo)
router.delete("/delete-completedtodo/:id", deleteCompletedTodo)


export default router