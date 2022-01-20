import firebase from "firebase/app";
import {Alert} from "react-native";
import * as Location from "expo-location";
import * as Facebook from "expo-facebook";
import * as Permissions from "expo-permissions";
import * as Updates from "expo-updates";

export const SET_USER = "SET_USER";
export const SET_LOCATION = "SET_LOCATION";
export const SET_NICKNAME = "SET_NICKNAME";
export const SET_IMAGE_URL = "SET_IMAGE_URL";
export const SET_PHONE_NUMBER = "SET_PHONE_NUMBER"
export const RESET = "RESET";

export const getCurrentUserId = () => {
    return firebase.auth().currentUser.uid;
}

export const loginSuccess = () => {
    return async (dispatch) => {
        const uid = firebase.auth().currentUser.uid;
        const ref = await firebase.firestore().collection("users").doc(uid).get();
        const userData = ref.data();

        dispatch({
            type: SET_USER,
            userData: {
                email: userData.email,
                nickname: userData.nickname,
                imageUrl: userData.imageUrl,
                phoneNumber: userData.phoneNumber,
                uid: uid
            },
        });
    };
};

const getCurrentLocation = async () => {
    const {status} =  await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
        Alert.alert(
            "Greška prilikom pokretanja!",
            "Morate dozvoliti ovoj aplikaciji da pristupi Vašoj lokaciji.",
            [{text: "POKUŠAJ PONOVO", onPress: () => Updates.reloadAsync()}]
        );
        return;
    } else {
        try {
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            });

            // TODO: Maci debug posle
            console.log(location.coords.longitude);
            console.log(location.coords.latitude);

            return {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            };
        } catch (err) {
            Alert.alert("Could not fetch location!", "Please try again later.", [
                {text: "Retry", onPress: () => Updates.reloadAsync()},
            ]);
        }
    }
};

export const fetchLocation = () => {
    try {
        return async (dispatch) => {
            const currentLocation = await getCurrentLocation();

            await Location.watchPositionAsync(
                {
                    accuracy: 6,
                    timeInterval: 5000,
                    distanceInterval: 20,
                },
                (location) => {
                    dispatch({
                        type: SET_LOCATION,
                        location: {
                            lat: location.coords.latitude,
                            lng: location.coords.longitude,
                        },
                    });
                }
            );

            dispatch({
                type: SET_LOCATION,
                location: currentLocation,
            });
        };
    } catch(err) {
        throw err;
    }
};

export const changeNickname = (nickname) => {
    return async (dispatch) => {
        const {uid} = firebase.auth().currentUser;
        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set({nickname: nickname}, {merge: true});

        dispatch({
            type: SET_NICKNAME,
            nickname: nickname,
        });
    };
};

export const changeImage = (userImage) => {
    return async (dispatch) => {
        const {uid} = firebase.auth().currentUser;

        let ref = firebase.storage().ref().child("user_image");
        let fileName = userImage;

        if (userImage) {
            const file = await fetch(userImage);
            const fileBlob = await file.blob();
            fileName = uid + ".jpg";
            await ref.child(fileName).put(fileBlob);
        }

        const imageUrl = await ref.child(fileName).getDownloadURL();

        await firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .set({imageUrl: imageUrl}, {merge: true});

        dispatch({
            type: SET_IMAGE_URL,
            imageUrl: imageUrl,
        });
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        dispatch(loginSuccess());
    };
};

export const signUp = (email, password, nickname, image, phoneNumber) => {
    return async (dispatch) => {
        const {user} = await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password);

        let fileName = "user_default.png";
        let ref = firebase.storage().ref().child("user_image");

        if (image) {
            const file = await fetch(image);
            const fileBlob = await file.blob();
            fileName = user.uid + ".jpg";
            await ref.child(fileName).put(fileBlob);
        }

        const imageUrl = await ref.child(fileName).getDownloadURL();
        await firebase.firestore().collection("users").doc(user.uid).set({
            email: email,
            nickname: nickname,
            imageUrl: imageUrl,
            phoneNumber: phoneNumber
        });

        dispatch(loginSuccess());
    };
};

export const logout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch({
            type: RESET,
        });
    };
};
