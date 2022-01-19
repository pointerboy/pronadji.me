import React, {useEffect, useState} from "react";
import {ImageBackground, StyleSheet, Text, View} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import firebase from "firebase/app";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";
import {useDispatch} from "react-redux";
import {Root} from "popup-ui";

import AuthNavigator from "../nav/authentication/AuthNavigator";
import DrawerNavigator from "../nav/app/DrawerNavigator";
import {fetchLocation, loginSuccess} from "../store/actions/user";
import {fetchCategories} from "../store/actions/categories";
import Loader from "../components/UI/Loader";
import AuthHeader from "../components/auth/AuthHeader";
import Constants from "expo-constants";
import backgroundImage from "../assets/images/hack.png";

const StartupScreen = (props) => {
    const dispatch = useDispatch();
    const [isAuth, setIsAuth] = useState();
    const [isLoading, setIsLoading] = useState(true);
    let isAutoLogin = true;

    useEffect(() => {
        const init = async () => {
            await dispatch(fetchCategories());
            await dispatch(fetchLocation());
            return firebase.auth().onAuthStateChanged(async (user) => {
                setIsLoading(true);
                if (user) {
                    if (isAutoLogin) {
                        // if firebase autologin success -> fetch user data
                        await dispatch(loginSuccess());
                    }
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
                setIsLoading(false);
                isAutoLogin = false;
            });
        };
        init();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.screen}>
                <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.startup}/>
            </View>
        );
    }

    return (
        <Root>
            <NavigationContainer>
                <ActionSheetProvider>
                    {isAuth ? <DrawerNavigator/> : <AuthNavigator/>}
                </ActionSheetProvider>
            </NavigationContainer>
        </Root>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 35,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "white",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    startup:{
        flex: 1,
        justifyContent: "center"
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default StartupScreen;
