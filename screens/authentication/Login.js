import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  useActionSheet,
  connectActionSheet,
} from "@expo/react-native-action-sheet";
import Constants from "expo-constants";
import i18n from "i18n-js";

import MyButton from "../../components/UI/MyButton";
import MyText from "../../components/UI/MyText";
import MyTextInput from "../../components/UI/MyTextInput";
import colors from "../../shared/colors";
import AuthHeader from "../../components/auth/AuthHeader";
import { login, loginWithFacebook } from "../../store/actions/user";
import {
  showSuccess,
  showError,
} from "../../shared/utils";
import Loader from "../../components/UI/Loader";

const LoginScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef(null);

  const { showActionSheetWithOptions } = useActionSheet();

  const loginHandler = async (method) => {
    setIsLoading(true);
    if (method === "email") {
      try {
        await dispatch(login(email.trim(), password));
        showSuccess(
          i18n.t("loginScreen.loginSuccess"),
          i18n.t("loginScreen.successMsg")
        );
      } catch (error) {
        showError(error.message);
        setIsLoading(false);
      }
    } else if (method === "facebook") {
      try {
        await dispatch(loginWithFacebook());
        showSuccess(
          i18n.t("loginScreen.loginSuccess"),
          i18n.t("loginScreen.loginSuccess")
        );
      } catch (error) {
        setIsLoading(false);
        if (error.message !== "") {
          showError(error.message);
        }
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
          <Loader visible={isLoading} />

          <AuthHeader
            style={styles.centerContainer}
            title="Lost&Found"
            image={require("../../assets/images/logo.png")}
          />

          <View style={styles.textInputContainer}>
            <MyTextInput
              placeholder="Email adresa"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
            />
            <MyTextInput
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
            <MyText>Nema nalog?</MyText>
            <TouchableOpacity
              onPress={switchToSignUpHandler}
              activeOpacity={0.6}
            >
              <MyText style={styles.switchToSignUpText}>
                Kreirajte ga odmah
              </MyText>
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
    fontFamily: "kanit-bold",
    color: colors.grey,
    fontSize: 20,
  },
});

export const screenOptions = {
  headerShown: false,
  cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
};

export default connectActionSheet(LoginScreen);