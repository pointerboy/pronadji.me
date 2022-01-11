import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import i18n from "i18n-js";

import MyProfileScreen, {
  screenOptions as myPostsScreenOptions,
} from "../../../screens/app/main/MyProfileScreen";

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
  tabBarIcon: ({ color }) => (
    <Ionicons
      name={Platform.OS === "android" ? "md-bookmark" : "ios-bookmark"}
      size={25}
      color={color}
    />
  ),
};

export default MyPostsNavigator;
