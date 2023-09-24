/*
DISPATCH the ACTION  when hit increment/decrement, 
for the TYPE of the ACTION, REDUCER will work with logical methodology base on ACTION TYPE, 
lastly, after REDUCER update all the things, then STORE in STATE

1. state;
2. action - increment, decrement;
3. reducer;
4. store;
*/

const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

// constant
const GET_USER = "GET_ALL_USER";
const ADD_USER = "ADD_AN_USER";
const REMOVE_USER = "REMOVE_AN_USER";

// state
const initialUserState = {
    user: [
        {
            id: 1,
            name: "Reyad"
        },
        {
            id: 2,
            name: "Zebin"
        }
    ],
    count: 1,
}


// action
const getUser = () => {
    return {
        type: GET_USER
    }
}

const addUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}

const removeUser = (name) => {
    return {
        type: REMOVE_USER,
        payload: name
    }
}

// reducer 
const userReducer = (state = initialUserState, action) => {
    if (action.type == GET_USER) {
        return {
            ...state
        }
    }
    else if (action.type == ADD_USER) {
        return {
            user: [...state.user, action.payload],
            count: state.count + 1,
        }
    }

    else if (action.type == REMOVE_USER) {
        return {
            user: state.user.filter(user => user.name !== action.payload),
            count: state.count - 1,
            organization: "OrangeToolz"
        }
    }
}

// store
const store = createStore(userReducer, applyMiddleware(logger));
store.subscribe(() => {
    console.log(store.getState());
})

// dispatch
const newUser = {
    id: 2,
    name: "Mehedi"
}

store.dispatch(getUser());
// store.dispatch(removeUser("Reyad"));
// store.dispatch(getUser());
store.dispatch(addUser(newUser));
// store.dispatch(getUser());
