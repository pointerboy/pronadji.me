import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import InfoScreen, {
    screenOptions as infoScreenOptions,
} from "../../../screens/app/main/InfoScreen";

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
    tabBarIcon: ({ color }) => (
        <Ionicons
            name={Platform.OS === "android" ? "md-info" : "ios-home"}
            size={25}
            color={color}
        />
    ),
};

export default InfoNavigator;
