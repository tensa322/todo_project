import './TodoForm.css'
import {ActiveTodo} from "../../App";
import { KeyboardEvent } from 'react';

export type TodoPayload = {
  title: string
  description: string
}

type TodoFormProps = {
  todoForm: TodoPayload
  activeTodo: ActiveTodo
  setActiveTodo: (payload: ActiveTodo) => void
  setTodoForm: (payload: TodoPayload) => void
  submitTodo: () => void
  clearForm: () => void
  onKeyDown: (e:KeyboardEvent<HTMLInputElement>) => void
}



export function TodoForm({ todoForm, activeTodo, setActiveTodo, clearForm, submitTodo, setTodoForm, onKeyDown}: TodoFormProps) {
  return (
    <div className="create-todo">
      <input
        onChange={(e) => setTodoForm({
          ...todoForm,
          title: e.target.value
        })}
        placeholder="Введите заголовок"
        type="text"
        value={todoForm.title}
        onKeyDown={onKeyDown}
        
      />
      <input
        onChange={(e) => setTodoForm({
          ...todoForm,
          description: e.target.value
        })}
        placeholder="Введите описание"
        type="text"
        value={todoForm.description}
        onKeyDown={onKeyDown}
        
      />
      <button
        disabled={Boolean(!todoForm.title.length || !todoForm.description.length)}
        onClick={submitTodo}
      >
        {activeTodo === null ? 'Создать заметку' : 'Редактировать заметку'}
      </button>
      {activeTodo !== null && (
        <button
          onClick={() => {
            setActiveTodo(null)
            clearForm()
          }}
        >
          Отменить редактирование
        </button>
      )}
    </div>
  )
}
