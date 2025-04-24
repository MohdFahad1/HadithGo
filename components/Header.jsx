import { View, Text, Pressable } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

const Header = ({ heading, subHeading, backButton = false }) => {
  const router = useRouter();

  return (
    <View
      className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5 pt-2"
      style={{
        height: hp(16),
        backgroundColor: "#00AB9A",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
      }}
    >
      <View
        className="flex-row items-center gap-4"
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        {backButton === false ? (
          <Pressable>
            <FontAwesome6 name="bars-staggered" size={24} color="white" />
          </Pressable>
        ) : (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        )}
        <View>
          <Text className="font-bold text-white" style={{ fontSize: hp(3) }}>
            {heading}
          </Text>
          {subHeading && <Text className="text-white">{subHeading}</Text>}
        </View>
      </View>
      <Pressable>
        <MaterialIcons name="favorite-border" size={28} color="white" />
      </Pressable>
    </View>
  );
};

export default Header;
