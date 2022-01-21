import React, {useState} from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {CardStyleInterpolators} from "@react-navigation/stack";
import {connectActionSheet,} from "@expo/react-native-action-sheet";
import Constants from "expo-constants";

import MyButton from "../../components/UI/MyButton";
import CustomText from "../../components/UI/CustomText";
import CustomTextInput from "../../components/UI/CustomTextInput";
import colors from "../../shared/colors";
import AuthHeader from "../../components/auth/AuthHeader";
import {showError,} from "../../shared/utils";

const SignUpScreen = (props) => {
    const [nickname, setNickname] = useState("");

    const signUpHandler = () => {
        if (nickname.trim() === "") {
            showError("Morate uneti korisničko ime!");
        } else {
            props.navigation.navigate("NextSignUp", {
                nickname: nickname.trim(),
            });
        }
    };

    const switchToLoginHandler = () => {
        props.navigation.replace("Login");
    };

    const backgroundImage = require("../../assets/images/kreiranje_naloga.jpg");

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
                    <ImageBackground source={backgroundImage} style={styles.accCreationHeader}/>
                    <AuthHeader
                        style={styles.centerContainer}
                        title="pronadji.me"
                        subtitle="Kreiranje naloga"
                    />

                    <View style={styles.textInputContainer}>
                        <CustomTextInput
                            placeholder="Unesite korisničko ime"
                            onChangeText={setNickname}
                            value={nickname}
                        />
                    </View>

                    <MyButton
                        title="Dalje"
                        onPress={signUpHandler}
                    />

                    <View style={styles.centerContainer}>
                        <CustomText>Već imate nalog?</CustomText>

                        <TouchableOpacity
                            onPress={switchToLoginHandler}
                            activeOpacity={0.6}
                        >
                            <CustomText style={styles.switchToLoginText}>
                                Prijavite se
                            </CustomText>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 35,
        backgroundColor: "white",
    },
    languageChangeContainer: {
        position: "absolute",
        right: 20,
        top: Constants.statusBarHeight + 15,
    },
    accCreationHeader: {
        width: '100%',
        height: 300
    },
    scrollView: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    textInputContainer: {
        flex: 1,
        justifyContent: "center",
    },
    centerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    switchToLoginText: {
        color: colors.grey,
        fontSize: 20,
    },
});

export const screenOptions = {
    title: 'Korak do naloga!',
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(SignUpScreen);