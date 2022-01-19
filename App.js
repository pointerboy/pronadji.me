import React, {Suspense} from "react";
import { LogBox } from 'react-native';
import * as Font from "expo-font";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ReduxThunk from "redux-thunk";

import "firebase/firestore";
import i18n from "i18n-js";
import "react-native-gesture-handler";

import * as Sentry from 'sentry-expo';

Sentry.init({
    dsn: "https://e020fe0c33744f6bb5f12d723e38d8c6@o1120985.ingest.sentry.io/6157116",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    enableInExpoDevelopment: true,
    debug: true,
});

import userReducer from "./store/reducers/user";
import postsReducer from "./store/reducers/posts";
import categoriesReducer from "./store/reducers/categories";
import Loader from "./components/UI/Loader";

import StartupScreen from "./screens/StartupScreen";

import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBBOAs3WcB8pipkcnF1Ng6Ztk3e0fBVMfs",
    authDomain: "lostandfound-859a8.firebaseapp.com",
    databaseURL: "https://lostandfound-859a8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lostandfound-859a8",
    storageBucket: "lostandfound-859a8.appspot.com",
    messagingSenderId: "604456261194",
    appId: "1:604456261194:web:78a9f55795aaaa891778b3",
    measurementId: "G-S4QGCWS6Y7"
};

LogBox.ignoreLogs(["Setting a timer"]);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

i18n.translations = {
    en: require("./locales/en.json"),
};

const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
    categories: categoriesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        kanit: require("./assets/fonts/Kanit-Regular.ttf"),
        "kanit-light": require("./assets/fonts/Kanit-Light.ttf"),
        "kanit-bold": require("./assets/fonts/Kanit-Bold.ttf"),
    });
};

export default function App() {
    return (
        <Provider store={store}>
            <Suspense fallback={<Loader visible={true} alpha={1}/>}>
                <StartupScreen/>
            </Suspense>
        </Provider>
    );
}
