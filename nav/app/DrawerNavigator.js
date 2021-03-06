import React from "react";
import {Image, Platform, StyleSheet, View} from "react-native";
import {createDrawerNavigator, DrawerItem, DrawerItemList,} from "@react-navigation/drawer";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";

import MainNavigator, {navigatorOptions as mainNavigatorOptions,} from "./main/MainNavigator";
import SettingsNavigator, {navigatorOptions as settingsNavigatorOptions,} from "./settings/SettingsNavigator";
import CustomText from "../../components/UI/CustomText";
import {logout} from "../../store/actions/user";

const Drawer = createDrawerNavigator();

const drawerContentOptions = {};

const DrawerContent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                />
                <CustomText style={styles.title}>pronadji.me</CustomText>
            </View>
            <DrawerItemList {...props} />
            <DrawerItem
                label='Odjava'
                labelStyle={styles.label}
                onPress={props.onLogout}
                icon={({size, color}) => (
                    <Ionicons
                        name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                        size={size}
                        color={color}
                    />
                )}
            />
        </View>
    );
};

const DrawerNavigator = (props) => {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await dispatch(logout());
    };

    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <DrawerContent {...props} onLogout={logoutHandler}/>
            )}
            drawerContentOptions={drawerContentOptions}
        >
            <Drawer.Screen
                name="MainNavigator"
                component={MainNavigator}
                options={mainNavigatorOptions}
            />
            <Drawer.Screen
                name="SettingsNavigator"
                component={SettingsNavigator}
                options={settingsNavigatorOptions}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 25,
        paddingVertical: 20,
        paddingLeft: 10,
    },
    label: {},
});

export default DrawerNavigator;