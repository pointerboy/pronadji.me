import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";

import MyText from "./MyText";
import Colors from "../../shared/colors";

const MyButton = (props) => {
    return (
        <TouchableOpacity
            style={{...styles.button, ...props.style}}
            onPress={props.onPress}
            activeOpacity={0.6}
        >
            <MyText style={styles.title}>{props.title}</MyText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        color: "white",
        fontSize: 20,
    },
});

export default MyButton;
