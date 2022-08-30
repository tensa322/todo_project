import { useState, useEffect, KeyboardEvent } from 'react'
import './App.css'
import { Todo, TodoItem, LocalTodo } from "./components/todo/TodoItem";
import { TodoForm, TodoPayload } from "./components/todo-form/TodoForm";
import { TodoList } from './components/todo-list/TodoList';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale'

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
         description: 'Сегодня день ног, не вздумай пропустить',
         isCompleted: false,
         createdAt: new Date()
      },
   ])
   
   useEffect(() => {
      if (localStorage.getItem('localtasks')) {
         
         const storedList = JSON.parse(localStorage.getItem('localtasks') as string) as LocalTodo[]
         const formattedTodos = storedList.map(todo =>{
            return {...todo, createdAt: new Date(todo.createdAt)}
         }) 
         setTodos(formattedTodos)
      
      }
   }, [])



   function clearForm() {
      setTodoForm({
         title: '',
         description: ''
      })
   }

   function syncLocalStorage (updatedTodos:Todo[]) {
      const formattedTodos = updatedTodos.map(todo =>{
         return {...todo, createdAt: todo.createdAt.getTime()}
      }) 
      localStorage.setItem('localtasks', JSON.stringify(formattedTodos))
   }


   function createTodo(todoForm: TodoPayload) {
      const newTodo: Todo = {
         ...todoForm,
         isCompleted: false,
         createdAt: new Date()
      }

      setTodos([
         newTodo,
         ...todos
         
      ])

      clearForm()
      syncLocalStorage([
         newTodo,
         ...todos
         
      ])


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
         syncLocalStorage(updatedTodos)
      }
   }

   function removeTodo(index: number) {
      const newTodos = todos.filter((todo, todoIndex) => {
         return index !== todoIndex
      })

      setTodos(newTodos)
      syncLocalStorage(newTodos)
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

   function toggleTodo(index: number, isCompleted: boolean) {
      const existingTodo = todos[index]
      const updatedTodo = { ...existingTodo, isCompleted }
      const todosCopy = [...todos]
      todosCopy[index] = updatedTodo
      setTodos(todosCopy)
      syncLocalStorage(todosCopy)
   }

   const onKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13)
   return submitTodo()
   }

   

   return (
      <div className="App">
         <TodoForm
            todoForm={todoForm}
            activeTodo={activeTodo}
            setActiveTodo={setActiveTodo}
            setTodoForm={setTodoForm}
            submitTodo={submitTodo}
            clearForm={clearForm}
            onKeyDown={onKeyDown}
            
         />
         <div className='todo-list-container'>
            <TodoList 
            todos={todos}
            removeTodo={removeTodo}
            enterEditMode={enterEditMode}
            toggleTodo={toggleTodo}

            />
           
         </div>
      </div>
   )
}

export default App
