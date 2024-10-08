import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import SearchInput from "@/components/SearchInput";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import UrlInput from "@/components/UrlInput";
import Applications from "@/components/Applications";
import { icons } from "@/constants";
import CustomIconButton from "@/components/CustomIconButton";

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFF9E3",
        paddingHorizontal: wp("4%"),
      }}
    >
      <View
        style={{
          marginTop: hp("3%"),
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            flex: 1 / 2,
            fontSize: wp("6.5%"),
          }}
        >
          Download any video
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: wp("8%"),
            alignItems: "center",
          }}
        >
          {/* saved */}
          <CustomIconButton
            onPress={() => router.push("/saved")}
            icon={icons.folderIcon}
            heightPercent="4%"
            widthPercent="4%"
          />
          {/* settings */}
          <CustomIconButton
            icon={icons.settingsIcon}
            heightPercent="3.5%"
            widthPercent="3.5%"
          />
        </View>
      </View>
      <UrlInput />
      <Applications />
    </SafeAreaView>
  );
};

export default Home;
