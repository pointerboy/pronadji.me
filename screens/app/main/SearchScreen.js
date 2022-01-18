import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, StyleSheet, TouchableOpacity, View,} from "react-native";
import firebase from "firebase/app";
import * as geofirestore from "geofirestore";
import {useSelector} from "react-redux";
import {CardStyleInterpolators} from "@react-navigation/stack";

import CategoryList from "../../../components/app/main/CategoryList";
import PostList from "../../../components/app/main/PostList";
import colors from "../../../shared/colors";
import Post from "../../../models/post";
import CustomText from "../../../components/UI/CustomText";

const SearchScreen = (props) => {
    const initialCategories = useSelector((state) =>
        state.categories.categories.map((category) => category.id)
    );
    const [selectedCategories, setSelectedCategories] = useState(
        initialCategories
    );
    const currentLocation = useSelector((state) => state.user.location);
    const [selectedLocation, setSelectedLocation] = useState(currentLocation);
    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(posts);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const {params} = props.route;

    const getLocation = async () => {
        setIsLoadingLocation(true);
        let location;
        if (params) {
            location = params.location;
        } else {
            location = selectedLocation;
        }
        setSelectedLocation({
            ...location,
            mapUrl: `https://www.mapquestapi.com/staticmap/v5/map?key=wEf3wbr6d4rCkKnWqUEt15eSqDxXbMok&zoom=15&center=${location.lat},${location.lng}&size=400,200@2x`,
        });
        setIsLoadingLocation(false);
    };

    useEffect(() => {
        getLocation();
    }, [params]);

    const pickLocationHandler = () => {
        props.navigation.navigate("Map", {
            readonly: false,
            initialLocation: {
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
            },
            from: "Search",
        });
    };

    const fetchPosts = async () => {
        if (!selectedLocation) {
            return;
        }
        const firestore = firebase.firestore();
        const geoFirestore = geofirestore.initializeApp(firestore);
        const postsCollection = geoFirestore.collection("posts");
        const query = postsCollection.near({
            center: new firebase.firestore.GeoPoint(
                selectedLocation.lat,
                selectedLocation.lng
            ),
            radius: 5,
        });

        const response = await query.get();

        const result = [];

        response.forEach((post) => {
            const id = post.id;
            const data = post.data();

            const postDate = new Date(data.postDate);

            result.push(
                new Post(
                    id,
                    data.title,
                    data.description,
                    data.categoryId,
                    data.imageUrl,
                    data.mapUrl,
                    data.coordinates.latitude,
                    data.coordinates.longitude,
                    postDate,
                    data.uid,
                    post.distance,
                    data.address
                )
            );
        });

        setPosts(result);
    };

    useEffect(() => {
        setShowPosts(
            posts.filter((post) => selectedCategories.includes(post.categoryId))
        );
    }, [selectedCategories, posts]);

    useEffect(() => {
        fetchPosts();
    }, [selectedLocation]);

    const header = (
        <View>
            <CategoryList
                inputMode
                many
                value={selectedCategories}
                onChange={setSelectedCategories}
            />

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>Trenutna lokacija</CustomText>
            </View>

            {isLoadingLocation ? (
                <View style={styles.mapContainer}>
                    <ActivityIndicator size="large" color={colors.primary}/>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.mapContainer}
                    activeOpacity={0.6}
                    onPress={pickLocationHandler}
                >
                    {selectedLocation && (
                        <Image
                            style={styles.image}
                            source={{uri: selectedLocation.mapUrl}}
                        />
                    )}
                </TouchableOpacity>
            )}

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>Objave blizu zadate lokacije (~1km)</CustomText>
            </View>
        </View>
    );

    return (
        <View style={styles.screen}>
            <PostList
                data={showPosts}
                navigation={props.navigation}
                header={header}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
        paddingTop: 25,
    },
    mapContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginHorizontal: 10,
        height: 200,
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    titleContainer: {
        paddingVertical: 25,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    title: {
        fontSize: 19,
    },
});

export const screenOptions = {
    headerTitle: 'Pretraga',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default SearchScreen;
