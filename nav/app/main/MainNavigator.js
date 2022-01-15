import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

import TabNavigator, {
  navigatorOptions as tabNavigatorOptions,
} from "./TabNavigator";
import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../../../screens/app/main/SearchScreen";
import PostDetailScreen, {
  screenOptions as postDetailScreenOptions,
} from "../../../screens/app/main/PostDetailScreen";
import CreatePostScreen, {
  screenOptions as createPostScreenOptions,
} from "../../../screens/app/main/CreatePostScreen";
import MapScreen, {
  screenOptions as mapScreenOptions,
} from "../../../screens/app/main/MapScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../../components/UI/HeaderButton";

const Stack = createStackNavigator();

const MainNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={tabNavigatorOptions}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={postDetailScreenOptions}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={createPostScreenOptions}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={mapScreenOptions}
      />
    </Stack.Navigator>
  );
};

export const navigatorOptions = (navData) => {
    return {
        title: 'Lost And Found', headerTitleAlign: 'center',
        drawerIcon: ({size, color}) => (
            <Ionicons
                name={Platform.OS === "android" ? "md-home" : "ios-home"}
                size={size}
                color={color}
            />
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Feather
                    name="plus-square"
                    size={24}
                    color="#222222"
                    onPress={() => {
                        navData.navigation.navigate('CreatePost');
                    }}
                />
            </HeaderButtons>
        ),
    };
};

export default MainNavigator;
