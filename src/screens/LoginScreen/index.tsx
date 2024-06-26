import {Image, Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./style.ts";
import React, {useEffect, useState} from "react";
import {Screens} from "../../type.ts";
import {useLogin} from "../../hooks";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ParamListBase} from "@react-navigation/native";

export interface Props {
    navigation: NativeStackNavigationProp<ParamListBase>;
}
// @ts-ignore
export const LoginScreen: React.FC = (props: Props) => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const [triggerLogin, setTriggerLogin] = useState(0);
    const loginHook = useLogin(triggerLogin, userName, password);
    const handleSignIn = () => {

        if (userName && userName.length > 4 && password && password.length > 4) {
            console.log("Login Creds: ", userName, password);
            setTriggerLogin(Date.now());
        }
    }

    useEffect(() => {
            if (loginHook && loginHook.result) {
                console.log("Login Response: ", loginHook.result)
                props.navigation.navigate(Screens.HOME);
            } else if (loginHook.error)
            {
                console.log(loginHook.error)
            }
    }, [loginHook.result, loginHook.error]);


    return (
        <View style={styles.container}>
            <View style={{flex: 2}}/>
            <View style={{flex: 4}}>
                <Image
                    source={require('../../images/logo.png')}
                    style={{width: 240, height: 240, marginBottom: 0}}
                />
            </View>
            <View style={{flex: 2}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor={'black'}
                    secureTextEntry={false}
                    value={userName}
                    onChangeText={value => setUserName(value)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor={'black'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={value => setPassword(value)}
                />
                <Pressable
                    style={({pressed}) => [
                        {
                            ...styles.button,
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.1)' : "#28ABE2",
                        },
                    ]}
                    onPress={handleSignIn}>
                    <Text style={{...styles.buttonText, color: 'white'}}>
                        Login
                    </Text>
                </Pressable>
                <View style={{flex: 5}}/>
            </View>
        </View>
    );
}


