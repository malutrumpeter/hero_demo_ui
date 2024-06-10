import {SetUser, SetProductId, SetCartCount, SetCart} from "./action.ts";
import {AppState} from "./types.ts";

const initialState = {
    user: '',
    productId: 0,
    cartCount: 0,
    cart: [],
    productsInCart: [],
}

interface Action {
    type: string;
    payload: any;
}

export const reducer = (state: AppState = initialState, action: Action) => {
    switch (action.type) {
        case SetUser:
            return {
                ...state,
                user: action.payload
            }
        case SetProductId:
            return {
                ...state,
                productId: action.payload
            }
        case SetCartCount:
            return {
                ...state,
                cartCount: action.payload
            }
        case SetCart:
            return {
                ...state,
                cart: action.payload
            }

        default:
            return state;
    }
}
