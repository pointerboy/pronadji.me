import React from "react";
import {useSelector} from "react-redux";
import {Image, StyleSheet, TouchableOpacity, View,} from "react-native";
import {Feather} from "@expo/vector-icons"
import i18n from "i18n-js";
import MyText from "../../UI/MyText";

const PostItem = (props) => {
    const categories = useSelector((state) => state.categories.categories);

    const dateDiff = props.expirationDate.getTime() - new Date();

    const bgColor = categories.find(
        (category) => category.id === props.categoryId
    ).color;

    const totalMinutes = dateDiff / 1000 / 60;

    const day = Math.floor(totalMinutes / 60 / 24);
    const hours = Math.floor((totalMinutes / 60) % 24);
    const minutes = Math.floor(totalMinutes % 60);

    const countdownText = `${
        day !== 0 ? day + i18n.t("postItem.day") + " " : ""
    }${hours !== 0 ? hours + i18n.t("postItem.hour") : ""}${
        hours === 0 ? minutes + i18n.t("postItem.minute") : ""
    }`;

    const km = props.distance;
    let distanceText;
    if (km >= 1) {
        distanceText = `Udaljeno ${km.toFixed(0)} kilometara`;
    } else {
        distanceText = `Udaljeno ${(km * 1000).toFixed(0)} metara`;
    }

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.6}
            onPress={props.onPress}
        >
            <Image
                style={styles.cardImage}
                source={{
                    uri: props.imageUrl,
                }}
            />

            <View style={{...styles.cardInfo, backgroundColor: bgColor}}>
                <MyText style={styles.title} numberOfLines={1}>
                    {props.title}
                </MyText>

                <View style={styles.cardStatus}>
                    <View style={styles.leftStatusContainer}>
                        <Feather
                            name="map"
                            size={18}
                            color="white"
                        />
                        <MyText style={styles.statusText}>{distanceText}</MyText>
                    </View>

                    <View style={styles.rightStatusContainer}>
                        <Feather
                            size={18}
                            name="clock"
                            color="white"
                        />
                        <MyText style={styles.statusText}>{countdownText}</MyText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    cardImage: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 150,
    },
    cardInfo: {
        padding: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    colorContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    cardStatus: {
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    leftStatusContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    rightStatusContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 17,
        paddingVertical: 5,
    },
    statusText: {
        color: "white",
    },
});

export default PostItem;