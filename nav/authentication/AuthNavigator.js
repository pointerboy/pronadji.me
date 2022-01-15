import React from "react";

import {createStackNavigator} from "@react-navigation/stack";

import LoginScreen, {screenOptions as loginScreenOptions,} from "../../screens/authentication/Login";
import SignUpScreen, {screenOptions as signUpScreenOptions,} from "../../screens/authentication/Register";
import NextSignUpScreen, {screenOptions as nextSignUpScreenOptions,} from "../../screens/authentication/NextRegister";

const AuthStackNavigator = createStackNavigator();

const AuthNavigator = (props) => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name="Login"
                component={LoginScreen}
                options={loginScreenOptions}
            />
            <AuthStackNavigator.Screen
                name="SignUp"
                component={SignUpScreen}
                options={signUpScreenOptions}
            />
            <AuthStackNavigator.Screen
                name="NextSignUp"
                component={NextSignUpScreen}
                options={nextSignUpScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    );
};

export default AuthNavigator;