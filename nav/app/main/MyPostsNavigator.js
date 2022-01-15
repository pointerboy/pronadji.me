import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Feather} from "@expo/vector-icons";

import MyProfileScreen, {screenOptions as myPostsScreenOptions,} from "../../../screens/app/main/MyProfileScreen";

const Stack = createStackNavigator();

const MyPostsNavigator = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MyProfile"
                component={MyProfileScreen}
                options={myPostsScreenOptions}
            />
        </Stack.Navigator>
    );
};

export const navigatorOptions = {
    title: 'Profil',
    tabBarIcon: ({color}) => (
        <Feather
            name="user"
            size={25}
            color="#222222"
        />
    ),
};

export default MyPostsNavigator;
