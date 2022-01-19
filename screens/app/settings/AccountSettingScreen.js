import React, {useState} from "react";
import {Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View,} from "react-native";
import Constants from "expo-constants";
import {CardStyleInterpolators} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import {Ionicons} from "@expo/vector-icons";
import {connectActionSheet, useActionSheet,} from "@expo/react-native-action-sheet";

import SettingItem from "../../../components/app/settings/SettingItem";
import Loader from "../../../components/UI/Loader";
import {handleImagePicker} from "../../../shared/utils";
import {changeImage} from "../../../store/actions/user";

const AccountSettingScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const {showActionSheetWithOptions} = useActionSheet();

    const [selectedImage, setSelectedImage] = useState(user.imageUrl);
    const [isLoading, setIsLoading] = useState(false);

    const takeImageHandler = async () => {
        let result = await handleImagePicker();

        if (!result.cancelled) {
            if(selectedImage) {
                setIsLoading(true);

                await dispatch(changeImage(selectedImage.uri));
                setSelectedImage(result.uri);
            }
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Loader visible={isLoading}/>

            <View style={styles.containerImage}>
                <View style={styles.containerLayoutImage}>
                    <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
                        <Image source={{uri: selectedImage}} style={styles.imageStyle}/>

                        <View style={styles.iconContainer}>
                            <Ionicons
                                name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
                                size={30}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerContents}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SettingItem
                        title='Korisnički mejl'
                        text={user.email}
                    />
                    <SettingItem
                        title='Promena korisničkog imena'
                        text={user.nickname}
                        onPress={() => {
                            props.navigation.navigate("ChangeNickname");
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerImage: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.0)",
    },
    containerLayoutImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerContents: {
        flex: 3,
        backgroundColor: "white",
    },
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
    iconContainer: {
        position: "absolute",
        right: -1,
        bottom: -5,
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
});

export const screenOptions = {
    title: 'Podešavanja naloga',
    headerTitleStyle: {
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default connectActionSheet(AccountSettingScreen);
