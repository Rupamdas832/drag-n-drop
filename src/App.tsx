import { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { TodoType, TodoStatus } from './types/todo.module';
import './components/todo.css'

const todosData: TodoType[] = [
  { id: "1", text: "Grocery", todoStatus: "TODO" },
  { id: "2", text: "Food", todoStatus: "FINISHED" },
  { id: "3", text: "Gym", todoStatus: "TODO" },
  { id: "4", text: "Coding Practice", todoStatus: "FINISHED" },
  { id: "5", text: "1 hr reading", todoStatus: "IN_PROGRESS" },
  { id: "6", text: "Washing clothes", todoStatus: "FINISHED" },
  { id: "7", text: "Shopping", todoStatus: "TODO" }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([])

  const handleAddTodo = (newTodoText: string) => {
    setTodos(prevTodos => [...prevTodos, { id: Math.random().toString(), text: newTodoText, todoStatus: "TODO" }])
  }

  const handleDeleteTodo = (todoId: string) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const handleTodoStatus = (todoId: string, targetStatus: TodoStatus) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, todoStatus: targetStatus }
      } else return todo
    }))
  }

  useEffect(() => {
    const todosFromLocal = JSON.parse(localStorage.getItem('todos')!)
    if (todosFromLocal) {
      setTodos(todosFromLocal)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <div className='app-wrapper'>
        <h1 className='project-heading'>KARYA</h1>
        <AddTodo addTodo={handleAddTodo} />
        <TodoList items={todos} deleteTodo={handleDeleteTodo} changeStatus={handleTodoStatus} />
      </div>
    </div>
  );
}

export default App;
