import React from "react";
import {StyleSheet, Text} from "react-native";

const MyText = (props) => {
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
    text: {
    },
});

export default MyText;
