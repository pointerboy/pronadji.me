import React, {useState} from "react";
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {CardStyleInterpolators} from "@react-navigation/stack";

import CustomText from "../../../components/UI/CustomText";
import colors from "../../../shared/colors";
import CategoryList from "../../../components/app/main/CategoryList";
import {Feather} from "@expo/vector-icons";
import moment from "moment";
import {useDispatch} from "react-redux";
import {getCurrentUserId} from "../../../store/actions/user";
import {deletePost} from "../../../store/actions/posts";
import {showError, showSuccess} from "../../../shared/utils";

const PostDetailScreen = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        id,
        description,
        imageUrl,
        mapUrl,
        location,
        categoryId,
        distance,
        postDate,
        uid,
        userPhoneNumber
    } = props.route.params;

    const pressLocationHandler = () => {
        props.navigation.navigate("Map", {
            readonly: true,
            initialLocation: {
                lat: location.lat,
                lng: location.lng,
            },
        });
    };

    let distanceText;
    distanceText = `${(distance * 1000).toFixed(0)}m`;

    let userPostId = uid;
    let loggedUserId = getCurrentUserId();

    moment.locale('sr');
    let date = moment(postDate).calendar();

    const deleteThiPost = async () => {
        setIsLoading(true);
        try {
            await dispatch(deletePost(id));
        } catch (error) {
            showError(error.message);
        }
        setIsLoading(false);
        showSuccess("Objava je obrisana!");
        props.navigation.navigate("Home");
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Kategorija
                </CustomText>
            </View>

            <CategoryList selectedMode categoryId={categoryId}/>

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Prilo??ena fotografija
                </CustomText>
            </View>

            <View style={styles.container}>
                <Image style={styles.image} source={{uri: imageUrl}}/>
            </View>

            <View style={styles.distanceContainer}>
                <Feather size={30} name={"navigation"}/>
                <CustomText style={styles.title}>
                    {distanceText}
                </CustomText>
            </View>

            <View style={styles.clockContainer}>
                <Feather size={30} name={"clock"}/>
                <CustomText style={styles.title}>
                    {date}
                </CustomText>
            </View>

            <View style={styles.contactContainer}>
                <Feather size={30} name={"phone"}/>
                <CustomText style={styles.title}>
                    {userPhoneNumber}
                </CustomText>
            </View>

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Opis
                </CustomText>
            </View>

            <View style={{paddingHorizontal: 10}}>
                <CustomText style={styles.text}>{description}</CustomText>
            </View>

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Lokacija
                </CustomText>
            </View>

            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.6}
                onPress={pressLocationHandler}
            >
                <Image style={styles.image} source={{uri: mapUrl}}/>
            </TouchableOpacity>

            {userPostId === loggedUserId && (
                <View style={styles.deleteContainer}>
                    <TouchableOpacity onPress={() => deleteThiPost(uid)}>
                        <Feather size={35} name={"trash-2"}/>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
    },
    titleContainer: {
        paddingVertical: 25,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 5,
        height: 200,
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    distanceContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 5,
        height: 90,
        borderRadius: 10,
        backgroundColor: colors.postLightBlue,
    },
    contactContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 5,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#7dc775',
    },
    deleteContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 10,
        height: 80,
        borderRadius: 5,
        backgroundColor: '#ed4c28',
    },
    clockContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 5,
        height: 70,
        borderRadius: 10,
        backgroundColor: colors.clockWhite,
    },
    addressContainer: {
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingBottom: 40,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    title: {
        fontSize: 19,
    },
    text: {
        fontSize: 15,
    },
});

export const screenOptions = (navData) => {
    const {title} = navData.route.params;
    return {
        headerTitle: title,
        headerTitleStyle: {},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    };
};

export default PostDetailScreen;
