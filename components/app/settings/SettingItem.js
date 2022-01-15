import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";

import CustomText from "../../UI/CustomText";
import colors from "../../../shared/colors";

const SettingItem = (props) => {
    return (
        <View style={styles.container}>
            {props.onPress ? (
                <TouchableOpacity
                    style={styles.contentBox}
                    onPress={props.onPress}
                    activeOpacity={0.6}
                >
                    <CustomText style={styles.title}>{props.title}</CustomText>
                    <CustomText style={styles.contentText} numberOfLines={1}>
                        {props.text}
                    </CustomText>
                </TouchableOpacity>
            ) : (
                <View style={styles.contentBox}>
                    <CustomText style={styles.disableTitle}>{props.title}</CustomText>
                    <CustomText style={styles.disableContentText}>{props.text}</CustomText>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentBox: {
        flex: 1,
        borderBottomWidth: 0.2,
        padding: 10,
    },
    contentText: {
        fontSize: 14,
        marginTop: 1,
        color: "black",
    },
    title: {
        color: "black",
        paddingTop: 4,
        fontSize: 16,
    },
    disableTitle: {
        color: colors.grey,
        paddingTop: 4,
        fontSize: 16,
    },
    disableContentText: {
        fontSize: 14,
        marginTop: 1,
        color: colors.grey,
    },
});

export default SettingItem;
