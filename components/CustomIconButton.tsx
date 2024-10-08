import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomIconButton = ({
  onPress,
  icon,
  heightPercent,
  widthPercent,
}: {
  onPress?: () => void;
  icon: any;
  heightPercent: string;
  widthPercent: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: hp(heightPercent),
          height: hp(widthPercent),
        }}
      />
    </TouchableOpacity>
  );
};

export default CustomIconButton;
