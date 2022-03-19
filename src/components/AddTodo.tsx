import React, { useRef, useState } from 'react'

interface AddTodoProps {
    addTodo: (newTodoText: string) => void;
}

const AddTodo = (props: AddTodoProps) => {
    const { addTodo } = props
    const [todoText, setTodoText] = useState("")

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (todoText !== "") {
            addTodo(todoText)
            setTodoText("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='add-todo-container'>
                <input type="text" placeholder='Enter Todo' value={todoText} onChange={(e) => setTodoText(e.target.value)} />
                <button type='submit' className='add-todo-button'>Submit</button>
            </div>

        </form>
    )
}

export default AddTodo