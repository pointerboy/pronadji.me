import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {Feather} from '@expo/vector-icons';

import HomeScreen, {screenOptions as homeScreenOptions,} from "../../../screens/app/main/HomeScreen";

const Stack = createStackNavigator();

const HomeNavigator = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={homeScreenOptions}
            />
        </Stack.Navigator>
    );
};

export const navigatorOptions = {
    title: 'Početna strana',
    tabBarIcon: ({color}) => (
        <Feather
            name="home"
            size={25}
            color="#222222"
        />
    ),
};

export default HomeNavigator;
