import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { CardStyleInterpolators } from "@react-navigation/stack";
import i18n from "i18n-js";

import MyText from "../../../components/UI/MyText";
import colors from "../../../shared/colors";
import CategoryList from "../../../components/app/main/CategoryList";
import {Feather} from "@expo/vector-icons";

const PostDetailScreen = (props) => {
  const {
    description,
    imageUrl,
    mapUrl,
    location,
    categoryId,
    distance,
  } = props.route.params;

  const pressLocationHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: {
        lat: location.lat,
        lng: location.lng,
      },
    });
  };

  let distanceText;
  distanceText = `${(distance * 1000).toFixed(0)}m`;

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.titleContainer}>
        <MyText style={styles.title}>
          Kategorija
        </MyText>
      </View>

      <CategoryList selectedMode categoryId={categoryId} />

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>
          Priložena fotografija
        </MyText>
      </View>

      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
      </View>

      <View style={styles.distanceContainer}>
        <Feather size={30} name={"navigation"}/>
        <MyText style={styles.title}>
          {distanceText}
        </MyText>
      </View>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>
          Opis
        </MyText>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <MyText style={styles.text}>{description}</MyText>
      </View>

      <View style={styles.titleContainer}>
        <MyText style={styles.title}>
          Lokacija
        </MyText>
      </View>

      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={pressLocationHandler}
      >
        <Image style={styles.image} source={{ uri: mapUrl }} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  titleContainer: {
    paddingVertical: 25,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 5,
    height: 200,
    borderRadius: 10,
    backgroundColor: colors.lightGrey,
  },
  distanceContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 5,
    height: 90,
    borderRadius: 10,
    backgroundColor: colors.postLightBlue,
  },
  addressContainer: {
    paddingTop: 25,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  title: {
    fontSize: 19,
  },
  text: {
    fontSize: 15,
  },
});

export const screenOptions = (navData) => {
  const { title } = navData.route.params;
  return {
    headerTitle: title,
    headerTitleStyle: {
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default PostDetailScreen;
