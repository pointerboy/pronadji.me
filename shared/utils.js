import React, {useState} from "react";
import {Alert, Platform} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Toast} from "popup-ui";
import i18n from "i18n-js";

import ConfettiCannon from 'react-native-confetti-cannon';

import colors from "./colors";

const showToast = (title, text, color, duration, icon) => {
    Toast.show({
        title: title,
        text: text,
        color: color,
        timing: duration,
        icon: icon,
    });

};

export const showSuccess = (
    title,
    text,
    duration = 6000,
    icon = Platform.OS === "android"
        ? "md-checkmark-circle"
        : "ios-checkmark-circle"
) => {
    showToast(
        title,
        text,
        colors.success,
        duration,
        <ConfettiCannon count={100} origin={{x: -10, y: 0}} />
    );
};

export const showError = (
    text,
    duration = 2000,
    icon = Platform.OS === "android" ? "md-close-circle" : "ios-close-circle"
) => {
    showToast(
        i18n.t("utils.error"),
        text,
        colors.error,
        duration,
        <Ionicons name={icon} color="white" size={24}/>
    );
};

