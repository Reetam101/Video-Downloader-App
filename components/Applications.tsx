import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants/index";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Item = ({ icon, name }: { icon: any; name: string }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "column",
        alignItems: "center",
        gap: hp("1%"),
      }}
    >
      <Image
        source={icon}
        style={{
          width: hp("6%"),
          height: hp("6%"),
        }}
      />
      <Text
        style={{
          fontSize: hp("1.6%"),
          color: "grey",
        }}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const data = [
  {
    id: 1,
    icon: icons.facebookIcon,
    name: "Facebook",
  },
  {
    id: 2,
    icon: icons.instagramIcon,
    name: "Instagram",
  },
  {
    id: 3,
    icon: icons.twitterIcon,
    name: "X",
  },
  {
    id: 4,
    icon: icons.whatsappIcon,
    name: "Whatsapp",
  },
];

const Applications = () => {
  return (
    <View
      style={{
        marginTop: hp("3%"),
        marginBottom: hp("3%"),
      }}
    >
      <Text
        style={{
          fontSize: hp("3%"),
          fontWeight: "bold",
          marginBottom: hp("3%"),
        }}
      >
        Applications
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: wp("8%"),
        }}
      >
        {data.map((item) => (
          <Item key={item.id} icon={item.icon} name={item.name} />
        ))}
      </View>
    </View>
  );
};

export default Applications;
