import React from "react";
import {FlatList, Platform, StyleSheet, View} from "react-native";

import PostItem from "./PostItem";
import CustomText from "../../UI/CustomText";
import {Ionicons} from "@expo/vector-icons";
import colors from "../../../shared/colors";

const PostList = (props) => {
    const emptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Ionicons
                name={
                    Platform.OS === "android" ? "md-close-circle" : "ios-close-circle"
                }
                color="black"
                size={80}
            />
            <CustomText style={styles.text}>Nema skorašnjih objava</CustomText>
        </View>
    );

    const renderItem = (itemData) => (
        <PostItem
            id={itemData.item.id}
            title={itemData.item.title}
            categoryId={itemData.item.categoryId}
            imageUrl={itemData.item.imageUrl}
            postDate={itemData.item.postDate}
            distance={itemData.item.distance}
            uid = {itemData.item.uid}
            onPress={() => {
                props.navigation.navigate("PostDetail", {
                    id: itemData.item.id,
                    categoryId: itemData.item.categoryId,
                    title: itemData.item.title,
                    description: itemData.item.description,
                    imageUrl: itemData.item.imageUrl,
                    mapUrl: itemData.item.mapUrl,
                    postDate: itemData.item.postDate,
                    location: {
                        lat: itemData.item.lat,
                        lng: itemData.item.lng,
                    },
                    address: itemData.item.address,
                    distance: itemData.item.distance,
                    uid: itemData.item.uid
                });
            }}
        />
    );

    return (
        <FlatList
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            ListHeaderComponent={props.header}
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={emptyComponent}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: "white",
    },
    emptyContainer: {
        alignItems: "center",
        paddingVertical: 45,
        marginHorizontal: 10,
        backgroundColor: colors.lightGrey,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 15,
    },
});

export default PostList;
