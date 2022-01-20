import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    Image,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {connectActionSheet, useActionSheet,} from "@expo/react-native-action-sheet";
import {useDispatch, useSelector} from "react-redux";

import HeaderButton from "../../../components/UI/HeaderButton";
import CustomText from "../../../components/UI/CustomText";
import CustomTextInput from "../../../components/UI/CustomTextInput";
import CategoryList from "../../../components/app/main/CategoryList";
import colors from "../../../shared/colors";
import {handleImagePicker, showError, showSuccess,} from "../../../shared/utils";
import {createPost} from "../../../store/actions/posts";
import Loader from "../../../components/UI/Loader";

const CreatePostScreen = (props) => {
    const {params} = props.route;

    const dispatch = useDispatch();
    const initialCategoryId = useSelector(
        (state) => state.categories.categories[0].id
    );

    const {showActionSheetWithOptions} = useActionSheet();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState(initialCategoryId);
    const [selectedImage, setSelectedImage] = useState();
    const currentLocation = useSelector((state) => state.user.location);
    const [selectedLocation, setSelectedLocation] = useState(currentLocation);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const descriptionRef = useRef(null);

    const getLocation = async () => {
        setIsLoadingLocation(true);
        let location;
        if (params) {
            location = params.location;
        } else {
            location = selectedLocation;
        }

        const response = await fetch(
            `http://api.positionstack.com/v1/reverse?access_key=5753cc2417c0b67c9bd29f8ad915078a&query=${location.lat},${location.lng}&limit=1`
        );
        setSelectedLocation({
            ...location,
            address: response.street,
            mapUrl: `https://www.mapquestapi.com/staticmap/v5/map?key=wEf3wbr6d4rCkKnWqUEt15eSqDxXbMok&zoom=15&center=${location.lat},${location.lng}&size=400,200@2x&defaultMarker=circle-3B5998-sm&`,
        });

        setIsLoadingLocation(false);
    };

    useEffect(() => {
        getLocation();
    }, [params]);

    const takeImageHandler = async () => {
        let result = await handleImagePicker();

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    const pickLocationHandler = () => {
        props.navigation.navigate("Map", {
            readonly: false,
            initialLocation: {
                lat: selectedLocation.lat,
                lng: selectedLocation.lng,
            },
            from: "CreatePost",
        });
    };

    const createPostHandler = useCallback(async () => {
        Keyboard.dismiss();
        setIsLoading(true);
        if (title !== "" && description !== "") {
            try {
                await dispatch(
                    createPost(
                        title,
                        description,
                        categoryId,
                        selectedImage,
                        selectedLocation,
                        new Date(Date.now())
                    )
                );
                showSuccess('Objava je uspješno postavljena!', title);
                props.navigation.goBack();
            } catch (error) {
                showError("Došlo je do greške. Pokušajte ponovo.");
            }
        } else {
            showError("Morate popuniti polje za unos imena i opisa predmeta!");
        }
        setIsLoading(false);
    }, [
        dispatch,
        title,
        description,
        categoryId,
        selectedImage,
        selectedLocation,
    ]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        iconName="md-checkmark"
                        color="black"
                        onPress={createPostHandler}
                    />
                </HeaderButtons>
            ),
        });
    }, [createPostHandler]);

    return (
        <ScrollView style={styles.screen}>
            <Loader visible={isLoading}/>

            <View style={{...styles.titleContainer, paddingTop: 25}}>
                <CustomText style={styles.title}>
                    Osnovne informacije
                </CustomText>
            </View>

            <View style={styles.textInputContainer}>
                <CustomTextInput
                    placeholder="Naziv predmeta"
                    value={title}
                    onChangeText={setTitle}
                    blurOnSubmit={false}
                    returnKeyType="next"
                    onSubmitEditing={() => descriptionRef.current.focus()}
                />
                <CustomTextInput
                    placeholder="Opis predmeta"
                    value={description}
                    onChangeText={setDescription}
                    ref={descriptionRef}
                />
            </View>

            <CategoryList inputMode onChange={setCategoryId} value={categoryId}/>

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Ako je moguće, priložite fotografiju
                </CustomText>
            </View>

            <TouchableOpacity
                style={styles.inputContainer}
                activeOpacity={0.6}
                onPress={takeImageHandler}
            >
                {selectedImage ? (
                    <Image style={styles.image} source={{uri: selectedImage}}/>
                ) : (
                    <View style={styles.center}>
                        <Ionicons
                            name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
                            size={80}
                            color="black"
                        />
                        <CustomText style={styles.imageText}>
                            Kliknite da dodate fotografiju
                        </CustomText>
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>
                    Lokacija
                </CustomText>
            </View>

            {isLoadingLocation ? (
                <View style={styles.inputContainer}>
                    <ActivityIndicator size="large" color={colors.primary}/>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.inputContainer}
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

            <View style={styles.addressContainer}>
                <CustomText style={styles.text}>{selectedLocation.address}</CustomText>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
    titleContainer: {
        paddingVertical: 25,
    },
    textInputContainer: {
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 5,
        height: 200,
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    addressContainer: {
        paddingTop: 25,
        paddingHorizontal: 10,
        paddingBottom: 40,
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
    imageText: {
        fontSize: 16,
    },
    title: {
        fontSize: 19,
    },
    text: {
        fontSize: 15,
    },
});

export const screenOptions = {
    headerTitle: 'Kreiranje objave',

};

export default connectActionSheet(CreatePostScreen);
