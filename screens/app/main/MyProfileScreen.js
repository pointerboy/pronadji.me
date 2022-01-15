import React, {useCallback, useEffect, useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useIsFocused} from "@react-navigation/native";

import PostList from "../../../components/app/main/PostList";
import {fetchMyPosts} from "../../../store/actions/posts";
import CText from "../../../components/UI/CustomText";
import {showError} from "../../../shared/utils";
import colors from "../../../shared/colors";
import {Feather} from "@expo/vector-icons";

const MyProfileScreen = (props) => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const currentLocation = useSelector((state) => state.user.location);
    const initialCategories = useSelector((state) =>
        state.categories.categories.map((category) => category.id)
    );
    const [selectedCategories, setSelectedCategories] = useState(
        initialCategories
    );
    const myPosts = useSelector((state) => state.posts.myPosts);
    const [showPosts, setShowPosts] = useState(myPosts);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const loadMyPosts = useCallback(async () => {
        try {
            await dispatch(fetchMyPosts(currentLocation));
        } catch (error) {
            showError(error.message);
        }
    }, [dispatch, currentLocation]);

    useEffect(() => {
        loadMyPosts();
    }, [loadMyPosts, isFocused]);

    const onRefresh = async () => {
        setIsRefreshing(true);
        await loadMyPosts();
        setIsRefreshing(false);
    };

    useEffect(() => {
        setShowPosts(
            myPosts.filter((post) => selectedCategories.includes(post.categoryId))
        );
    }, [selectedCategories, myPosts]);


    return (
        <View style={styles.screen}>
            <View style={styles.accountView}>
                <View
                    style={styles.background}
                    resizeMode={'cover'}/>
                <Image
                    style={[styles.profilepic, {borderRadius: 7}]}
                    resizeMode={'cover'}
                    source={{uri: user.imageUrl}}
                />
                <CText style={styles.title}>{user.nickname}</CText>

                <CText style={styles.title}>
                    <Feather name={"mail"} size={20}/> {user.email}
                </CText>

                <CText style={styles.title}>
                    <Feather name={"phone"} size={20}/> {user.phoneNumber}
                </CText>

            </View>

            <View style={styles.titleContainer}>
                <CText style={styles.title}>Vaše objave</CText>
            </View>
            <PostList
                data={showPosts}
                navigation={props.navigation}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        width: '150%',
        height: 150,
        backgroundColor: colors.postLightBlue
    },
    profilepic: {
        width: 100,
        height: 100,
        marginTop: -50,
    },
    accountView: {
        alignItems: 'center',
    },
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
    titleContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
    },
    title: {
        fontSize: 19,
    },
    userContainer: {
        flexDirection: "row",
        marginTop: 25,
        paddingHorizontal: 15,
    },
    userImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    userInfoContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        paddingLeft: 25,
    },
});

export const screenOptions = {
    headerShown: false,
};

export default MyProfileScreen;
