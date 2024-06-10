import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {Footer} from "../../components/Footer";
import {style} from "./style.ts";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState, CartItem} from "../../state/types.ts";
import {setCart, setCartCount} from "../../state/action.ts";
import {Card} from "../../components/Card";
import {SnackBar} from "../../components/SnackBar";

export const CartScreen: React.FC = () => {
    const cartItems = useSelector((state: AppState) => state.cart)
    const [total, setTotal] = useState(0);
    const [showSnackBar, setShowSnackBar] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        calculateTotal(cartItems);
    }, []);
    const checkOut = () => {
        setShowSnackBar(true);
    }

    useEffect(() => {
        if (showSnackBar) {
            const timer = setTimeout(()=>{
                setShowSnackBar(false);
            }, 2000);

            return () => clearTimeout(timer);
        }

    }, [showSnackBar]);

    useEffect(() => {
        console.log('Total Updated: ', total);
    }, [total]);

    const updateCount = (updatedCartItems: CartItem[]) => {
        let cartCount = 0;
        updatedCartItems.map((a) => {
            cartCount += a.quantity;
        })
        dispatch(setCartCount(cartCount))
    }
    const reduceQuantify = (item: CartItem) => {
        const updatedCartItems = cartItems.map((ct) => {
            if (ct.id === item.id && ct.quantity !== 0) {
                return {...ct, quantity: ct.quantity - 1};
            }
            return ct;
        });
        calculateTotal(updatedCartItems);
        dispatch(setCart(updatedCartItems));
        updateCount(updatedCartItems);
    }
    const addQuantity = (item: CartItem) => {
        const updatedCartItems = cartItems.map((ct) => {
            if (ct.id === item.id) {
                return {...ct, quantity: ct.quantity + 1};
            }
            return ct;
        });
        calculateTotal(updatedCartItems);
        dispatch(setCart(updatedCartItems));
        updateCount(updatedCartItems);
    };

    const handleRemove = (item: CartItem) => {
        const updatedCartItems = cartItems.filter((ct) => ct.id !== item.id);
        calculateTotal(updatedCartItems);
        dispatch(setCart(updatedCartItems));
        updateCount(updatedCartItems);
    }

    const emptyView = () => {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    Cart is empty
                </Text>
            </View>

        )
    }
    const calculateTotal = (cartItems: CartItem[]) => {
        let tempTotal = 0;
        cartItems.map((ct) => tempTotal += (ct.price * ct.quantity));
        setTotal(Math.round((tempTotal + Number.EPSILON) * 100) / 100);
    }
    const cartListView = () => {
        if (cartItems) {
            return cartItems.map((ct) => (
                <View style={{flex: 1, flexDirection: 'column'}} key={ct.id}>
                    <Card borderColor={'black'} color={'white'}>
                        <View style={{flex: 1, paddingBottom: 16, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{flex: 1, alignSelf: 'center', left: 10}}>
                                {ct.image && (<Image source={{uri: ct.image}}
                                                     style={{
                                                         width: 50,
                                                         height: 50,
                                                         marginVertical: 16,
                                                         paddingVertical: 16
                                                     }}/>)}
                            </View>
                            <View style={{flex: 2, alignSelf: 'center'}}>
                                <Text style={{color: 'black', fontSize: 16, fontWeight: 500, paddingVertical: 15}}
                                      numberOfLines={1} ellipsizeMode="tail">{ct.title}</Text>
                                <Text numberOfLines={2} ellipsizeMode="tail">{ct.description}</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end', alignSelf: 'flex-start', top: 16, right: 10}}>
                                <Text style={{color: 'black', fontSize: 14, fontWeight: 700}}>${ct.price}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 3, left: 10}}>
                                <Pressable onPress={() => handleRemove(ct)}>
                                    <Text style={{textDecorationLine: 'underline',}}>Remove</Text>
                                </Pressable>
                            </View>
                            <View style={{flex: 2, right: 10, paddingBottom: 10}}>
                                <View style={{
                                    flex: 1, flexDirection: 'row', alignItems: 'stretch',
                                    borderStyle: 'solid', borderColor: 'black',
                                    borderWidth: 1, borderRadius: 50, paddingVertical: 4, paddingHorizontal: 4
                                }}>
                                    <Pressable onPress={() => reduceQuantify(ct)} style={{paddingHorizontal: 15}}>
                                        <Text style={{fontWeight: 400, fontSize: 20}}>-</Text>
                                    </Pressable>
                                    <Text style={{
                                        paddingHorizontal: 20, fontWeight: 'bold', fontSize: 16,
                                        position: 'relative', top: 2,
                                    }}>{ct.quantity}</Text>
                                    <Pressable onPress={() => addQuantity(ct)} style={{paddingHorizontal: 15}}>
                                        <Text style={{fontWeight: 400, fontSize: 20}}>+</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Card>
                </View>
            ))
        } else {
            <></>
        }

    }

    return (
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
            {showSnackBar   && <SnackBar message={'Success!'} /> }
            {cartItems.length === 0 && emptyView()}
            {cartItems.length > 0 && (<ScrollView style={{flex: 1, marginBottom: 100}}>
                {cartListView()}
            </ScrollView>)}
            <Footer>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontWeight: 'bold'}} >Estimated Total</Text>
                    <Text>${total}</Text>
                </View>
                <View style={{flex: 2,flexDirection: 'row',justifyContent: 'space-between', marginBottom: 10}}>
                    <Pressable style={({pressed}) => [
                        {
                            ...style.button,
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : "#28ABE2",
                        },
                    ]} onPress={() => checkOut()}>
                        <Text style={{...style.buttonText}}>Checkout</Text>
                    </Pressable>
                </View>
            </Footer>
        </View>
    )
}
