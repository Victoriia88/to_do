import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, EDIT_TODO } from "./actions";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, completed: false }],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload),
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case EDIT_TODO:
      const { index, newText, newStatus } = action.payload;
      const updatedTodos = [...state.todos];
      updatedTodos[index] = { text: newText, completed: newStatus };
      return {
        ...state,
        todos: updatedTodos,
      };
    default:
      return state;
  }
};

export default todoReducer;
