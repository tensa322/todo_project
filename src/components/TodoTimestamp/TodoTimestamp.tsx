import { formatRelative } from "date-fns"
import { Todo } from "../todo/TodoItem"

type TodoTimestampProps = {
   todo: Todo 
}

export function TodoTimestamp ({ todo}: TodoTimestampProps ) {
   return <div> {formatRelative(todo.createdAt, new Date())} </div> 
}