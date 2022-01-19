import React, {useRef, useState} from "react";
import {Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {CardStyleInterpolators} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {connectActionSheet, useActionSheet,} from "@expo/react-native-action-sheet";
import {Ionicons} from "@expo/vector-icons";
import i18n from "i18n-js";



import CustomTextInput from "../../components/UI/CustomTextInput";
import MyButton from "../../components/UI/MyButton";
import {showError, showSuccess, takeImage, takeImageActionSheetOptions,} from "../../shared/utils";
import {signUp} from "../../store/actions/user";
import Loader from "../../components/UI/Loader";
import {handleImagePicker} from "../../shared/utils";

const NextSignUpScreen = (props) => {
    const {showActionSheetWithOptions} = useActionSheet();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const takeImageHandler = async () => {
        let result = await handleImagePicker();

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    const signUpHandler = async () => {
        setIsLoading(true);
        try {
            if (password !== confirmPassword) {
                throw new Error('Unete lozinke moraju biti iste!');
            }

            if (phoneNumber.length < 6) {
                throw new Error("Neophodno je da dodate broj telefona!");
            }

            await dispatch(
                signUp(
                    email.trim(),
                    password,
                    props.route.params.nickname,
                    selectedImage, phoneNumber
                )
            );
            showSuccess("Uspšejno registrovani!", "Dobro došli na platformu!");

        } catch (error) {
            showError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView
                    style={styles.contentContainer}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <Loader visible={isLoading}/>

                    <Text style={styles.hintText}>Još samo malo, {props.route.params.nickname}!</Text>
                    <View style={styles.imageInputContainer}>
                        <TouchableOpacity activeOpacity={0.6} onPress={takeImageHandler}>
                            {selectedImage ? (
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: selectedImage,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        ...styles.image,
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Ionicons
                                        size={60}
                                        color="black"
                                        name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
                                    />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.textInputContainer}>
                        <CustomTextInput
                            placeholder="Unesite email adresu"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <CustomTextInput
                            placeholder="Unesite jaku lozinku"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={password}
                            ref={passwordRef}
                            returnKeyType="next"
                            onSubmitEditing={() => confirmPasswordRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <CustomTextInput
                            placeholder="Potvrdite lozinku"
                            secureTextEntry={true}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            ref={confirmPasswordRef}
                        />
                        <CustomTextInput
                            placeholder="Unesite Vaš broj telefona"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType='numeric'
                            maxLength={12}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <MyButton
                            title={"Napravi nalog"}
                            onPress={signUpHandler}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 35,
        backgroundColor: "white",
    },
    hintText:{
        flex:1,
        fontSize: 24,
        textAlign:"center"
    },
    scrollView: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
    },
    headerContainer: {
        flex: 1,
        alignItems: "center",
    },
    imageInputContainer: {
        flex: 1,
        alignItems: "center",
    },
    textInputContainer: {
        flex: 1,
        paddingTop: 30,
    },
    buttonContainer: {
        flex: 1,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "black",
    },
    textInput: {
        textAlign: "center",
    },
});

export const screenOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: "",
    headerStyle: {
        shadowColor: "transparent",
        elevation: 0,
    },
};

export default connectActionSheet(NextSignUpScreen);