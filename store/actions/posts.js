import firebase from "firebase/app";
import * as geofirestore from "geofirestore";
import * as geokit from "geokit";

import Post from "../../models/post";

export const SET_POSTS = "SET_POSTS";
export const SET_MY_POSTS = "SET_MY_POSTS";
export const CREATE_POST = "CREATE_POST";

export const fetchAllPosts = (currentLocation, radius) => {
    return async (dispatch) => {
        const posts = [];

        const firestore = firebase.firestore();
        const geoFirestore = geofirestore.initializeApp(firestore);
        const postsCollection = geoFirestore.collection("posts");
        const query = postsCollection.near({
            center: new firebase.firestore.GeoPoint(
                currentLocation.lat,
                currentLocation.lng
            ),
            radius: radius,
        });

        const response = await query.get();

        response.forEach((post) => {
            const id = post.id;
            const data = post.data();

            const date = new Date(data.postDate);
            posts.push(
                new Post(
                    id,
                    data.title,
                    data.description,
                    data.categoryId,
                    data.imageUrl,
                    data.mapUrl,
                    data.coordinates.latitude,
                    data.coordinates.longitude,
                    date,
                    data.uid,
                    post.distance,
                    data.address
                )
            );
        });

        dispatch({
            type: SET_POSTS,
            posts: posts,
        });
    };
};

export const fetchMyPosts = (currentLocation) => {
    return async (dispatch) => {
        // current user location

        const uid = firebase.auth().currentUser.uid;
        const response = await firebase
            .firestore()
            .collection("posts")
            .where("uid", "==", uid)
            .get();

        const myPosts = [];

        response.forEach((post) => {
            const id = post.id;
            const data = post.data();

            const distance = geokit.distance(currentLocation, {
                lat: data.coordinates.latitude,
                lng: data.coordinates.longitude,
            });

            myPosts.push(
                new Post(
                    id,
                    data.title,
                    data.description,
                    data.categoryId,
                    data.imageUrl,
                    data.mapUrl,
                    data.coordinates.latitude,
                    data.coordinates.longitude,
                    new Date(data.postDate),
                    data.uid,
                    distance,
                    data.address
                )
            );
        });

        dispatch({
            type: SET_MY_POSTS,
            myPosts: myPosts,
        });
    };
};

export const createPost = (
    title,
    description,
    categoryId,
    selectedImage,
    selectedLocation,
    postDate
) => {
    return async (dispatch, getState) => {

        console.log(
            "Title" + title + '\n',
            "Desc: " + description + '\n',
            "Cat:" + categoryId + '\n',
            "Image" + selectedImage + '\n',
            "Location" + selectedLocation + '\n',
            "Date" + postDate + '\n');

        selectedLocation.address = 'proba_123';

        const uid = firebase.auth().currentUser.uid;
        const firestore = firebase.firestore();
        const geoFirestore = geofirestore.initializeApp(firestore);
        const postsCollection = geoFirestore.collection("posts");

        const {id} = await postsCollection.add({
            title,
            description,
            categoryId,
            coordinates: new firebase.firestore.GeoPoint(
                selectedLocation.lat,
                selectedLocation.lng
            ),
            mapUrl: selectedLocation.mapUrl,
            postDate: postDate.toISOString(),
            uid,
            address: selectedLocation.address,
        });

        let fileName = "bez_slike.png";
        const ref = firebase.storage().ref().child("posts");

        if(selectedImage) {
            fileName = id + ".jpg";
            const file = await fetch(selectedImage);
            const fileBlob = await file.blob();
            await ref.child(fileName).put(fileBlob);
        }

        const imageUrl = await ref.child(fileName).getDownloadURL();

        await firebase
            .firestore()
            .collection("posts")
            .doc(id)
            .set({imageUrl}, {merge: true});

        const currentPosition = getState().user.location;

        const distance = geokit.distance(currentPosition, {
            lat: selectedLocation.lat,
            lng: selectedLocation.lng,
        });

        console.log(id,
            title,
            description,
            categoryId,
            imageUrl,
            selectedLocation.mapUrl,
            selectedLocation.lat,
            selectedLocation.lng,
            postDate,
            uid,
            distance,
            selectedLocation.toString());

        dispatch({
            type: CREATE_POST,
            post: new Post(
                id,
                title,
                description,
                categoryId,
                imageUrl,
                selectedLocation.mapUrl,
                selectedLocation.lat,
                selectedLocation.lng,
                postDate,
                uid,
                distance,
                selectedLocation
            ),
        });
    };
};
