import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
  todos: []
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      addTodo: (state, action ) => {
        const { title, desc, date } = action.payload;
        const newTodo = {
          id: nanoid(),
          title, 
          desc,  
          date,  
        }
        state.todos.push(newTodo)
      },
      updateTodo : (state, action) => {
        const {id, desc} = action.payload
        const todo=state.todos.find((todo) => todo.id===id)
        if(todo){
          todo.desc=desc
        }
      },
      removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload )
    },
      completedTodo : (state, action) => {
      const { id } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed; 
      }
    }
  }
})

export const {addTodo, removeTodo, updateTodo, completedTodo} = todoSlice.actions

export default todoSlice.reducer