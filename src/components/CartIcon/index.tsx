import Icon from "react-native-vector-icons/EvilIcons";
import React, {useState} from "react";
import {Pressable, TouchableOpacity, View} from "react-native";
import DotWithNumber from "../DotWithNumber";
import {useSelector} from "react-redux";
import {AppState} from "../../state/types.ts";
import {Screens} from "../../type.ts";

interface Props {
    action: () => {};
}

export const CartIcon: React.FC<Props> = ({action}) => {
    const cartCount = useSelector((state: AppState) => state.cartCount)

    return (
        <TouchableOpacity onPress={action}>
            <View style={{position: 'relative', left: 18, top: 10, elevation: 2}}>
                <DotWithNumber value={"" + cartCount}/>
            </View>
            <View style={{elevation: 1}}>
                <Icon name="cart" size={30} color="black"/>
            </View>
        </TouchableOpacity>


    )
}
