const { default: axios } = require("axios");
const { applyMiddleware } = require("redux");
const { createStore } = require("redux");
const { default: thunk } = require("redux-thunk");

const GET_TODO_REQUEST = "GET_TODO_REQUEST";
const GET_TODO_SUCCESS = "GET_TODO_SUCCESS";
const GET_TODO_FAILED = "GET_TODO_FAILED";
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// state
const initialTodoState = {
    todos: [],
    isLoading: false,
    error: null
}


// action
const getRequest = () => {
    return {
        type: GET_TODO_REQUEST,
    }
}

const getSuccess = (todos) => {
    return {
        type: GET_TODO_SUCCESS,
        payload: todos
    }
}

const getFailed = (error) => {
    return {
        type: GET_TODO_FAILED,
        payload: error
    }
}


// reducer
const todoReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case GET_TODO_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case GET_TODO_SUCCESS:
            return {
                ...state,
                todos: [action.payload],
                isLoading: false
            }

        case GET_TODO_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }
}


//async function creator
const fetchData = () => {
    return (dispatch) => {
        dispatch(getRequest());
        axios.get(API_URL)
            .then(response => {
                // const titles = response.data.map(todo => todo.title);
                const id = response.data.map(todo => todo.id);
                dispatch(getSuccess(id));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(getFailed(errorMessage));
            })
    }
}


// store
const store = createStore(todoReducer, applyMiddleware(thunk));
store.subscribe(() => {
    console.log(store.getState());
})
store.dispatch(fetchData());