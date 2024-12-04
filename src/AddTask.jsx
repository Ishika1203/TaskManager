import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addTodo} from './todoSlice'

function AddTask() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTaskHandler = (e) => {
    e.preventDefault()
    dispatch(addTodo(input))
    setInput('')
}
  return (
     <form onSubmit={addTaskHandler} className="space-x-3 mt-12">
      <input
        type="text"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  
  )
}

export default AddTask