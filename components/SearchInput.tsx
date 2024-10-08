import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { EvilIcons } from "@expo/vector-icons";

const SearchInput = () => {
  return (
    <View
      style={{
        width: wp("90%"),
        borderRadius: hp("3%"),
        paddingVertical: hp("2%"),
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        gap: wp("1%"),
        marginTop: hp("2%"),
      }}
    >
      <TouchableOpacity
        style={{
          paddingHorizontal: hp("0.5%"),
        }}
      >
        <EvilIcons name="search" size={wp("6%")} color={"#E8AC41"} />
      </TouchableOpacity>
      <TextInput placeholder="Browse anysite" />
    </View>
  );
};

export default SearchInput;
