import { useState } from 'react'
import './App.css'
import {Todo, TodoItem} from "./components/todo/TodoItem";
import {TodoForm, TodoPayload} from "./components/todo-form/TodoForm";

export type ActiveTodo = number | null

function App() {
  const [activeTodo, setActiveTodo] = useState<ActiveTodo>(null)

  const [todoForm, setTodoForm] = useState<TodoPayload>({
    title: '',
    description: ''
  })

  const [todos, setTodos] = useState<Todo[]>([
    {
      title: 'Продукты',
      description: 'Нужны сходить в магазин за продуктами',
      isCompleted: false,
      createdAt: new Date()
    },
    {
      title: 'Зал',
      description: 'Сегодня день ног, не вздумай проебать',
      isCompleted: false,
      createdAt: new Date()
    },
  ])

  function clearForm() {
    setTodoForm({
      title: '',
      description: ''
    })
  }

  function createTodo(todoForm: TodoPayload) {
    const newTodo: Todo = {
      ...todoForm,
      isCompleted: false,
      createdAt: new Date()
    }

    setTodos([
      ...todos,
      newTodo
    ])

    clearForm()
  }

  function updateTodo(todoForm: TodoPayload) {
    if (activeTodo !== null) {
      const existingTodo = todos[activeTodo]

      const updatedTodo = {
        ...existingTodo,
        ...todoForm
      }

      const updatedTodos = [...todos]

      updatedTodos[activeTodo] = updatedTodo

      setTodos(updatedTodos)

      setActiveTodo(null)
      clearForm()
    }
  }

  function removeTodo(index: number) {
    const newTodos = todos.filter((todo, todoIndex) => {
      return index !== todoIndex
    })

    setTodos(newTodos)
  }

  function enterEditMode(index: number) {
    const todoItem = todos[index]

    setActiveTodo(index)

    setTodoForm({
      title: todoItem.title,
      description: todoItem.description
    })
  }

  function submitTodo() {
    activeTodo === null ? createTodo(todoForm) : updateTodo(todoForm)
  }

  function toggleTodo( index:number, isCompleted:boolean ) {
   const existingTodo = todos[index]
   const updatedTodo = {...existingTodo, isCompleted}
   const todosCopy = [...todos]
   todosCopy[index] = updatedTodo
   setTodos(todosCopy)
}

   function completedTodos () {
      return todos.filter(todo => todo.isCompleted)
   }
   function incompletedTodos () {
      return todos.filter(todo => !todo.isCompleted)}

  return (
    <div className="App">
      <TodoForm
        todoForm={todoForm}
        activeTodo={activeTodo}
        setActiveTodo={setActiveTodo}
        setTodoForm={setTodoForm}
        submitTodo={submitTodo}
        clearForm={clearForm}
      />
<div className='todo-list-container'>
      <div className="todo-list">
        {incompletedTodos().map((todo, index) => {
          return (
            <TodoItem 
              todo={todo}
              index={index}
              removeTodo={removeTodo}
              enterEditMode={enterEditMode}
              toggleTodo={toggleTodo}
            />
          )
        })}
      </div>
      <div className="todo-list">
        {completedTodos().map((todo, index) => {
          return (
            <TodoItem 
              todo={todo}
              index={index}
              removeTodo={removeTodo}
              enterEditMode={enterEditMode}
              toggleTodo={toggleTodo}
            />
          )
        })}
      </div>
      </div>
    </div>
  )
}

export default App
