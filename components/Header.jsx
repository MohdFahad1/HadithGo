import { View, Text, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

const Header = ({ heading, subHeading }) => {
  return (
    <View
      className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5 pt-2"
      style={{ height: heightPercentageToDP(19), backgroundColor: "#00AB9A" }}
    >
      <View className="flex-row items-center gap-4">
        <Pressable>
          <FontAwesome6 name="bars-staggered" size={24} color="white" />
        </Pressable>
        <View>
          <Text
            className="font-bold text-white"
            style={{ fontSize: heightPercentageToDP(3) }}
          >
            {heading}
          </Text>
          <Text className="text-white ">{subHeading}</Text>
        </View>
      </View>
      <Pressable>
        <MaterialIcons name="favorite-border" size={28} color="white" />
      </Pressable>
    </View>
  );
};

export default Header;
