import {Image, Pressable, ScrollView, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {useGetAllProducts} from "../../hooks/serviceHooks.ts";
import {Card} from "../../components/Card";
import {Screens} from "../../type.ts";
import {useDispatch} from "react-redux";
import { setProductId} from "../../state/action.ts";
import Icon from 'react-native-vector-icons/EvilIcons';

// @ts-ignore
export const HomeScreen: React.FC = ({navigation}) => {
    // const [tiggerProducts, setTriggerProducts] = useState(0);
    const [products, setProducts] = useState<any[]>([]);
    const productsHook = useGetAllProducts();
    const dispatch = useDispatch();
    useEffect(() => {
        if (productsHook.result) {
            console.log('HomeScreen: ', productsHook.result)
            setProducts(productsHook.result);
        }
    }, [productsHook.result]);
    useEffect(() => {
        if (productsHook.error) {
            console.error('HomeScreen: ',productsHook.error)
        }
    }, [productsHook.error]);

    const handleProductSelection = (id: number) => {
        dispatch(setProductId(id));
        navigation.navigate(Screens.PRODUCT_DETAIL)
    }

    const card = () => {
        console.log('products', products);
        if (products) {
            return products.map((p: any) => (
                <Pressable onPress={() => handleProductSelection(p.id)} key={p.id}>
                    <Card borderColor={'#323232'} color={'#FFFFFF'} >

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 2}}>
                                <Image source={{uri: p.image}}
                                       style={{width: 100, height: 100, margin: 10}}/>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={{color: 'black', fontSize: 20, fontWeight: 700}}>${p.price}</Text>
                                <Text style={{color: 'black', fontSize: 16, fontWeight: 500, paddingVertical: 15}} numberOfLines={1} ellipsizeMode="tail">{p.title}</Text>
                                <Text numberOfLines={2} ellipsizeMode="tail">{p.description}</Text>
                            </View>
                        </View>
                    </Card>
                </Pressable>
            ))
        } else {
            return <></>
        }
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <ScrollView>
                {products && card()}
            </ScrollView>
        </View>
    )
}
