import React, { Fragment } from 'react'
import { TodoType, TodoStatus } from '../types/todo.module'

interface TodoProps {
    todo: TodoType;
    handleChangeStatus: (event: React.ChangeEvent<HTMLSelectElement>, todoId: string) => void
    deleteTodo: (todoId: string) => void
    isDeleteEnable: Boolean;
    isSelectStatusEnable: Boolean
}

interface TodoStatusOptions {
    enum: TodoStatus,
    title: string
}

const todoStatusOptions: TodoStatusOptions[] = [{
    enum: "TODO",
    title: "TODO"
}, {
    enum: "IN_PROGRESS",
    title: "IN PROGRESS"
}, {
    enum: "FINISHED",
    title: "FINISHED"
}]

const Todo = (props: TodoProps) => {
    const { todo, handleChangeStatus, deleteTodo, isDeleteEnable, isSelectStatusEnable } = props
    return (
        <Fragment>
            <div className='item-action-header'>
                {isSelectStatusEnable && <select onChange={(e) => handleChangeStatus(e, todo.id)} className='status-select'>
                    {todoStatusOptions.map((status, idx) => {
                        return <option
                            key={idx}
                            className={status.enum === todo.todoStatus ? 'status-option current' : 'status-option'}
                            value={status.enum}
                            selected={status.enum === todo.todoStatus}
                        >
                            {status.title}
                        </option>
                    })}
                </select>}
                {isDeleteEnable && <button className='item-del-btn' onClick={() => deleteTodo(todo.id)}>Delete</button>}
            </div>
            <div className='item-body'>
                <p >{todo.text}</p>
            </div>

        </Fragment>
    )
}

export default Todo;