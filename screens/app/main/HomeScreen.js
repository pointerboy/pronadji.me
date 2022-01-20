import React, {useCallback, useEffect, useState} from "react";
import {Platform, StyleSheet, TouchableOpacity, View,} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useIsFocused} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";

import CategoryList from "../../../components/app/main/CategoryList";
import CustomText from "../../../components/UI/CustomText";
import PostList from "../../../components/app/main/PostList";
import colors from "../../../shared/colors";
import {fetchAllPosts} from "../../../store/actions/posts";
import {showError} from "../../../shared/utils";

const HomeScreen = (props) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const currentLocation = useSelector((state) => state.user.location);

    const initialCategories = useSelector((state) =>
        state.categories.categories.map((category) => category.id)
    );

    const [selectedCategories, setSelectedCategories] = useState(
        initialCategories
    );

    const [showPosts, setShowPosts] = useState(posts);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const loadPosts = useCallback(async () => {
        try {
            await dispatch(fetchAllPosts(currentLocation, 999));
        } catch (error) {
            showError(error.message);
        }
    }, [dispatch, currentLocation]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts, isFocused]);

    useEffect(() => {
        setShowPosts(
            posts.filter((post) => selectedCategories.includes(post.categoryId))
        );
    }, [selectedCategories, posts]);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await loadPosts();
        setIsRefreshing(false);
    };

    const header = (
        <View>
            <TouchableOpacity
                style={styles.searchContainer}
                onPress={() => {
                    props.navigation.navigate("Search");
                }}
                activeOpacity={0.6}
            >
                <Ionicons
                    name={Platform.OS === "android" ? "md-search" : "ios-search"}
                    size={20}
                    color="black"
                    style={styles.searchIcon}
                />
                <CustomText style={styles.searchText}>Pretraga lokacije</CustomText>
            </TouchableOpacity>

            <CategoryList
                inputMode
                many
                value={selectedCategories}
                onChange={setSelectedCategories}
            />

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>Objave</CustomText>
            </View>
        </View>
    );

    return (
        <View style={styles.screen}>
            <PostList
                data={showPosts}
                navigation={props.navigation}
                header={header}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
            />
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
    },
    email: {
        color: colors.grey,
    },
});

export const screenOptions = {
    headerShown: false,
};

export default HomeScreen;
