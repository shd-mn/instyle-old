import { createContext, useContext, useEffect, useReducer } from 'react';
import {
    TOGGLE_CART,
    GET_CART,
    GET_WISHLIST,
    TOGGLE_WISHLIST,
    TOGGLE_FILTER,
    ADD_TO_CART,
} from './actions';
import { reducer } from './reducer';

const MainContext = createContext();
const initialState = {
    news: [],
    isLoading: false,
    error: '',
    currency: 'USD',
    cart: [],
    wishlist: [],
    isChecked: {
        size: [],
        color: [],
    },
};

const MainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const toggleCart = (e, product) => {
        e.preventDefault();
        const cartItem = {
            ...product,
            quantity: 1,
            selectedColor: product.color[0],
            selectedSize: product.size[0],
        };
        dispatch({ type: TOGGLE_CART, payload: cartItem });
    };
    const addToCart = (product) => {
        dispatch({ type: ADD_TO_CART, payload: product });
    };

    const toggleWishlist = (e, product) => {
        e.preventDefault();
        dispatch({ type: TOGGLE_WISHLIST, payload: product });
    };

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            dispatch({
                type: GET_CART,
                payload: JSON.parse(localStorage.getItem('cart')),
            });
        }
        if (localStorage.getItem('wishlist')) {
            dispatch({
                type: GET_WISHLIST,
                payload: JSON.parse(localStorage.getItem('wishlist')),
            });
        }
    }, []);

    const filterProducts = (title, item) => {
        dispatch({ type: TOGGLE_FILTER, payload: { title, item } });
    };

    const value = {
        ...state,
        dispatch,
        toggleCart,
        addToCart,
        toggleWishlist,
        filterProducts,
    };

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    );
};

export const useMyContext = () => useContext(MainContext);

export default MainProvider;
