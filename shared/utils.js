import React, {useState} from "react";
import {Alert, Platform} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Toast} from "popup-ui";

import ConfettiCannon from 'react-native-confetti-cannon';

import colors from "./colors";
import * as ImagePicker from "expo-image-picker";

export const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    return result;
}
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
        'Došlo je do greške!',
        text,
        colors.error,
        duration,
        <Ionicons name={icon} color="white" size={24}/>
    );
};

