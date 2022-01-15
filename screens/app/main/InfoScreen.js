import React from "react";
import {StyleSheet, Text, View,} from "react-native";
import colors from "../../../shared/colors";

const InfoScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Text>
                FAQ uskoro!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.lightGrey,
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 25,
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    searchIcon: {
        padding: 8,
    },
    searchText: {
        flex: 1,
        paddingVertical: 4,
        fontSize: 16,
    },
    title: {
        fontSize: 19,
    },
    nickname: {
        fontSize: 25,
        fontFamily: "kanit",
    },
    email: {
        color: colors.grey,
    },
});

export const screenOptions = {
    headerShown: false,
};

export default InfoScreen;
