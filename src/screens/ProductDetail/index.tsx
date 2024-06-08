import React, {useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {useGetProduct} from "../../hooks/serviceHooks.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppState, CartItem} from "../../state/types.ts";
import {setCart, setCartCount, setProductId} from "../../state/action.ts";
import {style} from "./style.ts";
import {Footer} from "../../components/Footer";


export const ProductDetail: React.FC = () => {
    const productId = useSelector((state: AppState) => state.productId);
    const [product, setProduct] = useState<any>({});
    const productHook = useGetProduct(productId);
    const cart = useSelector((state: AppState) => state.cart)

    const dispatch = useDispatch();
    useEffect(() => {
        if (productHook.result) {
            setProduct(productHook.result);
        }
    }, [productHook.result]);

    useEffect(() => {
        // console.error(productHook.error);
    }, [productHook.error]);

    const addToCart = () => {
        const cartItems = cart.filter((c) => c.id === product.id);
        console.log('cartItems', cartItems);
        let cartItemCount = 0;
        if (cartItems.length > 0) {
            cart.map((ct) => {
                if (ct.id === product.id) {
                    ct.quantity += 1;
                }
                cartItemCount += ct.quantity;
            })
            dispatch(setCart(cart));
        } else {
            cart.map((ct) => {
                if (ct.id === product.id) {
                    ct.quantity += 1;
                }
                cartItemCount += ct.quantity;
            })
            cartItemCount += 1;
            dispatch(setCart([...cart, {...product, quantity: 1}]));
        }
        dispatch(setCartCount(cartItemCount));
    }
    const productView = () => {
        if (productHook.result) {
            return (<View style={{flex: 1, flexDirection: 'column', backgroundColor: '#FFFFFF', paddingHorizontal: 16}}>
                <ScrollView style={{flex: 2, marginBottom: 100}}>
                    <View style={{flex: 1}}>
                        <Text style={{color: 'black', fontWeight: 700, paddingVertical: 32}}>{product.title}</Text>
                        <Text>{product.description}</Text>
                    </View>
                    <View style={{flex: 5, alignSelf: 'center'}}>
                        {product.image && (<Image source={{uri: product.image}}
                                                  style={{
                                                      width: 150,
                                                      height: 200,
                                                      marginVertical: 16,
                                                      paddingVertical: 16
                                                  }}/>)}
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 700,
                            paddingTop: 16
                        }}>${product.price}</Text>
                    </View>

                </ScrollView>
                <Footer>
                    <Pressable style={({pressed}) => [
                        {
                            ...style.button,
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : "#28ABE2",
                        },
                    ]} onPress={() => addToCart()}>
                        <Text style={{...style.buttonText}}>Add To Cart</Text>
                    </Pressable>
                </Footer>
            </View>)
        } else {
            return <></>
        }
    }
    return productView();
}
