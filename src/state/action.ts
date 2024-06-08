import {CartItem} from "./types.ts";

export const SetUser = "SetUser";
export const SetProductId = "SetProductId";
export const SetCartCount = "SetCartCount";
export const SetCart = "SetCart";
export const setUser = (user: string) => {
    return {
        type: SetUser,
        payload: user,
    }
}

export const setProductId = (productId: number) => {
    return {
        type: SetProductId,
        payload: productId,
    }
}

export const setCartCount = (count: number) => {
    return {
        type: SetCartCount,
        payload: count,
    }
}
export const setCart = (cart: CartItem[]) => {
    return {
        type: SetCart,
        payload: cart,
    }
}

