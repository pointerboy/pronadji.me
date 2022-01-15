import {RESET, SET_IMAGE_URL, SET_LOCATION, SET_NICKNAME, SET_PHONE_NUMBER, SET_USER} from "../actions/user";

const initialState = {
    email: "",
    nickname: "",
    imageUrl: null,
    location: null,
    phoneNumber: ""
};

const setUser = (state, action) => {
    const userData = action.userData;
    return {
        ...state,
        email: userData.email,
        nickname: userData.nickname,
        imageUrl: userData.imageUrl,
        phoneNumber: userData.phoneNumber
    };
};

const setLocation = (state, action) => {
    return {
        ...state,
        location: action.location,
    };
};

const setNickname = (state, action) => {
    return {
        ...state,
        nickname: action.nickname,
    };
};

const setImageUrl = (state, action) => {
    return {
        ...state,
        imageUrl: action.imageUrl,
    };
};

const setPhoneNumber = (state, action) => {
    return {
        ...state,
        phoneNumber: action.phoneNumber,
    };
};

const reset = (state, action) => {
    return {
        ...state,
        email: "",
        nickname: "",
        imageUrl: null,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return setUser(state, action);
        case SET_LOCATION:
            return setLocation(state, action);
        case SET_NICKNAME:
            return setNickname(state, action);
        case SET_IMAGE_URL:
            return setImageUrl(state, action);
        case SET_PHONE_NUMBER:
            return setPhoneNumber(state, action);
        case RESET:
            return reset(state, action);
        default:
            return state;
    }
};

export default reducer;
