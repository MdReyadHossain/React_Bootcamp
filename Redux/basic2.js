/* 
multiple reducer

state
action
reducer
store
*/

const { createStore, combineReducers } = require("redux");

const GET_PRODUCTS = "GET_ALL_PRODUCTS";
const ADD_PRODUCT = "ADD_A_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_A_PRODUCT";

const GET_CART_ITEMS = "GET_ALL_CART_ITEMS";
const ADD_CART_ITEM = "ADD_CART_ITEM";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";


// product-state
const initialProductState = {
    products: [
        {
            id: 1,
            name: "Smart Phone"
        },
        {
            id: 2,
            name: "Laptop"
        },
        {
            id: 3,
            name: "Tab"
        }
    ],
}


// cart-state
const initialCartState = {
    carts: [
        {
            product_id: 1,
            user: "Reyad",
        },
        {
            product_id: 1,
            user: "Zebin",
        },
        {
            product_id: 2,
            user: "Utsho",
        }
    ],
}


// product-action
const getProduct = () => {
    return {
        type: GET_PRODUCTS
    }
}

const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        payload: product
    }
}

const removeProduct = (id) => {
    return {
        type: REMOVE_PRODUCT,
        payload: id
    }
}


// cart-action
const getCartItems = () => {
    return {
        type: GET_CART_ITEMS
    }
}

const addCartItem = (item) => {
    return {
        type: ADD_CART_ITEM,
        payload: item
    }
}

const removeCartItem = (id) => {
    return {
        type: REMOVE_CART_ITEM,
        payload: id
    }
}


// product-reducer
const productReducer = (state = initialProductState, action) => {
    if (action.type == GET_PRODUCTS) {
        return { ...state };
    }

    else if (action.type == ADD_PRODUCT) {
        return {
            products: [...state.products, action.payload]
        }
    }

    else if (action.type == REMOVE_PRODUCT) {
        return {
            products: state.products.filter(product => product.id != action.payload)
        }
    }

    else {
        return state;
    }
}


// cart-reducer
const cartReducer = (state = initialCartState, action) => {
    if (action.type == GET_CART_ITEMS) {
        return { ...state };
    }

    else if (action.type == ADD_CART_ITEM) {
        return {
            carts: [...state.carts, action.payload]
        }
    }

    else if (action.type == REMOVE_CART_ITEM) {
        return {
            carts: state.carts.filter(cart => cart.product_id != action.payload)
        }
    }

    else {
        return { ...state };
    }
}

const combineReducer = combineReducers({
    ProductReducer: productReducer,
    CartReducer: cartReducer
})


// store
const store = createStore(combineReducer);
store.subscribe(() => {
    console.log(store.getState());
})

const newProduct = {
    id: 5,
    name: "Airpod"
}

store.dispatch(getProduct());
// store.dispatch(addProduct(newProduct));
// store.dispatch(removeProduct(3));

// store.dispatch(getCartItems());