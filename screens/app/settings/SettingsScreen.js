import React from "react";
import {Alert, Platform, ScrollView, StyleSheet, TouchableOpacity, View,} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {connectActionSheet, useActionSheet,} from "@expo/react-native-action-sheet";

import CustomText from "../../../components/UI/CustomText";
import colors from "../../../shared/colors";

const Setting = (props) => {
    return (
        <TouchableOpacity
            style={styles.settingContainer}
            onPress={props.onPress}
            activeOpacity={0.6}
        >
            <Ionicons name={props.iconName} size={25} color="black"/>
            <CustomText style={styles.label}>{props.label}</CustomText>
        </TouchableOpacity>
    );
};

const SettingsScreen = (props) => {
    const {showActionSheetWithOptions} = useActionSheet();

    // brisanje naloga je striktno fiktivna funkcija
    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={{...styles.container, paddingTop: 0}}>
                <CustomText style={styles.title}>Korisnička podešavanja</CustomText>
                <Setting
                    label='Podešavanja naloga'
                    iconName={Platform.OS === "android" ? "md-card" : "ios-card"}
                    onPress={() => props.navigation.navigate("AccountSetting")}
                />
                <Setting
                    label='Brisanje naloga'
                    iconName={Platform.OS === "android" ? "book" : "ios-card"}
                    onPress={() => Alert.alert("Brisanje naloga", "Zahtjev za brisanje naloga i Vaših objava možete učiniti preko našeg sajta.")}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 25,
        backgroundColor: "white",
    },
    container: {
        paddingVertical: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.lightGrey,
    },
    settingContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    title: {
        fontSize: 19,
        paddingBottom: 10,
    },
    label: {
        fontSize: 15,
        paddingLeft: 15,
    },
});

export const screenOptions = (navData) => {
    return {
        headerMode: 'none',
    };
};

export default connectActionSheet(SettingsScreen);
