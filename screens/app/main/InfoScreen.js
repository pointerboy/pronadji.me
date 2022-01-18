import React from "react";
import colors from "../../../shared/colors";

import {StyleSheet, View} from 'react-native';
import FAQ from '../../../components/faq/FAQ'
import {Feather} from "@expo/vector-icons";


const InfoScreen = () => {
    const questions = [
        {
            question: "Pitanje",
            reply: "Odgovor",
        },
    ]

    return (
        <View style={styles.screen}>
            <View style={styles.headerTitle}>
                <Feather name={"book"} size={60}/>
            </View>
            <FAQ
                title='INFO CENTAR'
                questions={questions}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        paddingTop: 5,
        textAlign: "center",
        alignItems: "center",
    },
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
    },
    email: {
        color: colors.grey,
    },
});

export const screenOptions = {
    headerShown: false,
};

export default InfoScreen;
