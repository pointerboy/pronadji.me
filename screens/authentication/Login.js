import React, {useRef, useState} from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import {CardStyleInterpolators} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {connectActionSheet,} from "@expo/react-native-action-sheet";
import Constants from "expo-constants";

import MyButton from "../../components/UI/MyButton";
import CustomText from "../../components/UI/CustomText";
import CustomTextInput from "../../components/UI/CustomTextInput";
import colors from "../../shared/colors";
import {login} from "../../store/actions/user";
import {showError, showSuccess,} from "../../shared/utils";
import Loader from "../../components/UI/Loader";
import backgroundImage from "../../assets/splash.png";

const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const passwordRef = useRef(null);

    const loginHandler = async (method) => {
        setIsLoading(true);
        if (method === "email") {
            try {
                await dispatch(login(email.trim(), password));
                showSuccess(
                    'Uspješna prijava!',
                    'Dobro došli nazad!'
                );
            } catch (error) {
                showError(error.message);
                setIsLoading(false);
            }
        }
    };

    const switchToSignUpHandler = () => {
        props.navigation.replace("SignUp");
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

                    <ImageBackground source={backgroundImage} style={styles.accCreationHeader}/>

                    <View style={styles.textInputContainer}>
                        <CustomTextInput
                            placeholder="Email adresa"
                            onChangeText={setEmail}
                            value={email}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current.focus()}
                            blurOnSubmit={false}
                        />
                        <CustomTextInput
                            placeholder="Lozinka"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            value={password}
                            ref={passwordRef}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.normalLoginButton}>
                            <MyButton
                                title="Prijava"
                                onPress={() => loginHandler("email")}
                            />
                        </View>
                    </View>

                    <View style={styles.centerContainer}>
                        <CustomText>Nema nalog?</CustomText>
                        <TouchableOpacity
                            onPress={switchToSignUpHandler}
                            activeOpacity={0.6}
                        >
                            <CustomText style={styles.switchToSignUpText}>
                                Kreirajte ga odmah!
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
        paddingHorizontal: 35,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "white",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    accCreationHeader: {
        width: '100%',
        height: 300
    },
    normalLoginButton: {
        flex: 1,
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
    switchToSignUpText: {
        color: colors.grey,
        fontSize: 20,
    },
});

export const screenOptions = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(LoginScreen);