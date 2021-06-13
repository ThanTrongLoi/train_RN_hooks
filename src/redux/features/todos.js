import {createSlice} from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    value: [
      {name: 'example 1', completed: false},
      {name: 'example 2', completed: false},
      {name: 'example 3', completed: false}
    ]
  },
  reducers: {
    addWord: (state, action) => {
      state.value.push({name: action.payload.name,completed: false}),
      console.log(state)
    },
    completeTodo: (state,action)=>{
      state.value[action.payload.index].completed = true;
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload)
      if(todo){
        todo.completed = !todo.completed
      }
    }
  }
})

export const selectTodos = state => state.todos.value
export const {addWord, toggleTodo} = todosSlice.actions
export default todosSlice.reducer
