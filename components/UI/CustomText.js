import React from "react";
import {StyleSheet, Text} from "react-native";

const CustomText = (props) => {
    return (
        <Text
            style={{...styles.text, ...props.style}}
            numberOfLines={props.numberOfLines}
        >
            {" "}
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {},
});

export default CustomText;
