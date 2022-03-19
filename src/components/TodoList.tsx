import React, { useEffect, useState } from 'react'
import { TodoType, TodoStatus } from '../types/todo.module';
import Todo from './Todo';

interface TodoListProps {
    items: TodoType[];
    deleteTodo: (todoId: string) => void;
    changeStatus: (todoId: string, targetStatus: TodoStatus) => void;
}



const TodoList: React.FC<TodoListProps> = (props) => {
    const [todos, setTodos] = useState<TodoType[]>([])
    const [inProgressTodos, setInProgressTodos] = useState<TodoType[]>([])
    const [finishedTodos, setFinishedTodos] = useState<TodoType[]>([])
    const { items, deleteTodo, changeStatus } = props

    useEffect(() => {
        let todos: TodoType[] = []
        let inProgressTodos: TodoType[] = []
        let finishedTodos: TodoType[] = []
        items.forEach(item => {
            switch (item.todoStatus) {
                case "TODO":
                    todos.push(item)
                    return
                case "IN_PROGRESS":
                    inProgressTodos.push(item)
                    return
                case "FINISHED":
                    finishedTodos.push(item)
                    return
                default:
                    todos.push(item)
                    return
            }
        })
        setTodos(todos)
        setInProgressTodos(inProgressTodos)
        setFinishedTodos(finishedTodos)
    }, [items])

    const handleStartDrag = (event: React.DragEvent<HTMLLIElement>, todo: TodoType) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(todo))
        event.dataTransfer.effectAllowed = 'move'
    }

    const handleEndDrag = (event: React.DragEvent<HTMLLIElement>) => {
        // const listEl = event.target as HTMLDivElement
        // listEl.classList.remove('droppable')
        // console.log("removed")
    }

    const handleDropDrag = (event: React.DragEvent<HTMLDivElement>, targetStatus: TodoStatus) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = event.target as HTMLDivElement
            setTimeout(() => {
                listEl.classList.remove('droppable')
            }, 300);

            const todo = JSON.parse(event.dataTransfer.getData("text/plain"))
            if (targetStatus !== todo.status) {
                changeStatus(todo.id, targetStatus)
            }
        }
    }

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = event.target as HTMLDivElement
            listEl.classList.add('droppable')
        }
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        const listEl = event.target as HTMLDivElement
        listEl.classList.remove('droppable')
    }

    const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>, todoId: string) => {
        const optionElementStatus = event.target.value as TodoStatus
        changeStatus(todoId, optionElementStatus)
    }

    return (
        <div className='todo-container'>
            <div className='todo-lists'>
                <div className='active-todos' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDropDrag(e, "TODO")}>
                    <div className='todos-header active'>
                        <p>TODO</p>
                    </div>
                    {todos.map(todo => {
                        return (
                            <li
                                key={todo.id}
                                className="list-item"
                                draggable={true}
                                onDragStart={(e) => handleStartDrag(e, todo)}
                                onDragEnd={handleEndDrag}
                            >
                                <Todo
                                    todo={todo}
                                    handleChangeStatus={handleChangeStatus}
                                    deleteTodo={deleteTodo}
                                    isDeleteEnable={false}
                                    isSelectStatusEnable={true}
                                />
                            </li>
                        )
                    })}
                </div>
                <div className='in-progress-todos' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDropDrag(e, "IN_PROGRESS")}>
                    <div className='todos-header in-progress'>
                        <p>IN PROGRESS</p>
                    </div>
                    {inProgressTodos.map(todo => {
                        return (
                            <li
                                key={todo.id}
                                className="list-item"
                                draggable={true}
                                onDragStart={(e) => handleStartDrag(e, todo)}
                                onDragEnd={handleEndDrag}
                            >
                                <Todo
                                    todo={todo}
                                    handleChangeStatus={handleChangeStatus}
                                    deleteTodo={deleteTodo}
                                    isDeleteEnable={false}
                                    isSelectStatusEnable={true}
                                />
                            </li>
                        )
                    })}
                </div>
                <div className='finished-todos' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDropDrag(e, "FINISHED")}>
                    <div className='todos-header finished'>
                        <p>FINISHED</p>
                    </div>
                    {finishedTodos.map(todo => {
                        return (
                            <li
                                key={todo.id}
                                className="list-item"
                                draggable={true}
                                onDragStart={(e) => handleStartDrag(e, todo)}
                                onDragEnd={handleEndDrag}
                            >
                                <Todo
                                    todo={todo}
                                    handleChangeStatus={handleChangeStatus}
                                    deleteTodo={deleteTodo}
                                    isDeleteEnable={true}
                                    isSelectStatusEnable={false}
                                />
                            </li>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TodoList