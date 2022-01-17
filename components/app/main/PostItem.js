import React from "react";
import {useSelector} from "react-redux";
import {Image, StyleSheet, TouchableOpacity, View,} from "react-native";
import {Feather} from "@expo/vector-icons"
import CustomText from "../../UI/CustomText";
import moment from "moment";
import "moment/locale/sr.js";

const PostItem = (props) => {
    const categories = useSelector((state) => state.categories.categories);

    const bgColor = categories.find(
        (category) => category.id === props.categoryId
    ).color;

    const km = props.distance;
    let distanceText;
    if (km >= 1) {
        distanceText = `${km.toFixed(0)}km`;
    } else {
        distanceText = `${(km * 1000).toFixed(0)}m`;
    }

    moment.locale('sr');
    const date = moment(props.postDate).calendar();

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
                <CustomText style={styles.title} numberOfLines={1}>
                    {props.title}
                </CustomText>

                <View style={styles.cardStatus}>
                    <View style={styles.leftStatusContainer}>
                        <Feather
                            name="map"
                            size={17}
                            color="white"
                        />
                        <CustomText style={styles.statusText}>{distanceText}</CustomText>
                    </View>

                    <View style={styles.rightStatusContainer}>
                        <Feather
                            size={17}
                            name="clock"
                            color="white"
                        />
                        <CustomText style={styles.statusText}>{date}</CustomText>
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
