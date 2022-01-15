import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Feather} from "@expo/vector-icons";

import InfoScreen, {screenOptions as infoScreenOptions,} from "../../../screens/app/main/InfoScreen";

const Stack = createStackNavigator();

const InfoNavigator = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Info"
                component={InfoScreen}
                options={infoScreenOptions}
            />
        </Stack.Navigator>
    );
};

export const navigatorOptions = {
    title: 'Info',
    tabBarIcon: ({color}) => (
        <Feather
            name="book"
            size={25}
            color="#222222"
        />
    ),
};

export default InfoNavigator;
