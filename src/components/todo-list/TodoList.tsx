import { Todo, TodoItem } from "../todo/TodoItem"
import "./TodoList.css"

type TodoListProps = {
   todos: Todo[]
   removeTodo: (index: number) => void
   enterEditMode: (index: number) => void
   toggleTodo: (index: number, isCompleted:boolean) => void
}

export function TodoList({ todos, removeTodo, enterEditMode, toggleTodo }: TodoListProps) {
   return (
<div className="todo-list">
               {todos.map((todo, index) => {
                  return (
                     <TodoItem key={`${todo.createdAt.getMilliseconds()}-${todo.title}`}
                        todo={todo}
                        index={index}
                        removeTodo={removeTodo}
                        enterEditMode={enterEditMode}
                        toggleTodo={toggleTodo}
                     />
                  )
               })}
            </div>
   )
}