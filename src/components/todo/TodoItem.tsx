import './Todo.css'
import {useState} from "react";
import { TodoTimestamp } from '../TodoTimestamp/TodoTimestamp';


export type Todo = {
  title: string
  description: string
  isCompleted: boolean
  createdAt: Date
}
export type LocalTodo = Omit<Todo, "createdAt"> & {
createdAt: string
}
   


type TodoProps = {
  todo: Todo
  index: number
  removeTodo: (index: number) => void
  enterEditMode: (index: number) => void
  toggleTodo: (index: number, isCompleted:boolean) => void
}


export function TodoItem({ todo, index, removeTodo, enterEditMode, toggleTodo }: TodoProps) {
  return (
    <div className="todo-item">
      <div className={`todo-content ${todo.isCompleted ? "is-completed" : ""}`} onClick={() => toggleTodo(index, !todo.isCompleted)}>
        <div className="todo-title">{todo.title}</div>
        <div className="todo-description">{todo.description}</div>
        <div className="todo-created-at"><TodoTimestamp todo={todo} /></div>
      </div>
      <div className="todo-controls">
        <div
          className="control todo-delete"
          onClick={() => removeTodo(index)}
        >
          🗑
        </div>
        <div
          className="control todo-edit"
          onClick={() => enterEditMode(index)}
        >
          🖍
        </div>
      </div>
    </div>
  )
}
