import React from "react";
import {Image, StyleSheet, View} from "react-native";

import CustomText from "../UI/CustomText";

const Header = (props) => {
    return (
        <View style={props.style}>
            {props.image && <Image style={styles.image} source={props.image}/>}
            <CustomText style={styles.title}>{props.title}</CustomText>
            <CustomText style={styles.subtitle}>{props.subtitle}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 35,
    },
    subtitle: {
        fontSize: 30,
    },
});

export default Header;
