import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Constants from "expo-constants";
import {CardStyleInterpolators} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";

import {changeNickname} from "../../../store/actions/user";
import CustomTextInput from "../../../components/UI/CustomTextInput";
import CustomText from "../../../components/UI/CustomText";
import colors from "../../../shared/colors";
import Loader from "../../../components/UI/Loader";
import {showError} from "../../../shared/utils";

const ChangeNicknameScreen = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [text, setText] = useState(user.nickname);
    const [isLoading, setIsLoading] = useState(false);

    const changeNicknameHandler = async () => {
        setIsLoading(true);
        try {
            await dispatch(changeNickname(text));
        } catch (error) {
            showError(error.message);
        }
        setIsLoading(false);
        props.navigation.navigate("AccountSetting");
    };

    return (
        <View style={styles.screen}>
            <Loader visible={isLoading}/>
            <CustomTextInput onChangeText={setText} value={text}/>
            <TouchableOpacity
                style={{
                    marginTop: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.primary,
                    padding: 10,
                    borderRadius: 10,
                }}
                activeOpacity={0.6}
                onPress={changeNicknameHandler}
            >
                <CustomText
                    style={{
                        color: "white",
                        fontSize: 16,
                    }}
                >
                    Promeni
                </CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 15,
        backgroundColor: "white",
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        fontSize: 12,
        marginBottom: 4,
        flexDirection: "row",
        alignSelf: "flex-end",
    },
});

export const screenOptions = {
    title: 'Promena korisničkog imena',
    headerTitleStyle: {
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export default ChangeNicknameScreen;
