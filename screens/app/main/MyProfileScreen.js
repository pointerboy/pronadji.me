import React, { useState, useEffect, useCallback } from "react";
import {View, StyleSheet, Image} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import i18n from "i18n-js";

import PostList from "../../../components/app/main/PostList";
import { fetchMyPosts } from "../../../store/actions/posts";
import MyText from "../../../components/UI/MyText";
import CategoryList from "../../../components/app/main/CategoryList";
import { showError } from "../../../shared/utils";

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

  const header = (
      <View>
      <View style={styles.userContainer}>
        <Image
            style={styles.userImage}
            source={
              user.imageUrl
                  ? {
                    uri: user.imageUrl,
                  }
                  : null
            }
        />
        <View style={styles.userInfoContainer}>
          <MyText style={styles.nickname} numberOfLines={1}>
            {user.nickname}
          </MyText>
          <MyText style={styles.email}>{user.email}</MyText>
        </View>
      </View>

      <View style={{ marginTop: 25 }}>
        <CategoryList
          inputMode
          many
          value={selectedCategories}
          onChange={setSelectedCategories}
        />
      </View>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>{i18n.t("myPostsScreen.subtitle")}</MyText>
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
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    fontFamily: "kanit",
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
