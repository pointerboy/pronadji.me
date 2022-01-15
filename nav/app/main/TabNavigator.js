import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../../components/UI/HeaderButton";
import colors from "../../../shared/colors";

import HomeNavigator, {
  navigatorOptions as homeNavigatorOptions,
} from "./HomeNavigator";
import MyPostsNavigator, {
  navigatorOptions as myPostsNavigatorOptions,
} from "./MyPostsNavigator";
import InfoNavigator, {
  navigatorOptions as infoNavigatorOptions,
} from "./InfoNavigator"
import {Feather} from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: colors.primary,
  inactiveTintColor: colors.grey,
  tabStyle: {
    paddingTop: 5,
    paddingBottom: 0,
  },
  showIcon: true,
  iconStyle: {
    alignItems: "center",
  },
  labelStyle: {
    fontSize: 11,
  },
  indicatorStyle: {
    backgroundColor: "transparent",
  },
};

const TabNavigator = (props) => {
  return (
    <Tab.Navigator tabBarPosition="bottom" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={homeNavigatorOptions}
      />
      <Tab.Screen
        name="MyPostsNavigator"
        component={MyPostsNavigator}
        options={myPostsNavigatorOptions}
      />
      <Tab.Screen
        name="InfoNavigator"
        component={InfoNavigator}
        options={infoNavigatorOptions}
      />
    </Tab.Navigator>
  );
};

export const navigatorOptions = (navData) => {
  return {headerMode: 'none',
    // razlog zbog čega je maknut options jeste zbog toga sto se navigator duplira
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="ios-menu"
          color="black"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Feather
              name="square-plus"
              size={25}
              color="#222222"
              onPress={() => {
                  navData.navigation.navigate("CreatePost");
              }}
          />
      </HeaderButtons>
    ),
  };
};

export default TabNavigator;
