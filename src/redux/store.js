import {configureStore} from '@reduxjs/toolkit'
import CounterReducer from './features/counter'
import TodoReducer from './features/todos'
export default configureStore({
  reducer: {
    counter: CounterReducer,
    todos: TodoReducer
  }
})