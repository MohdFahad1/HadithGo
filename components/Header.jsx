import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import Drawer from "./Drawer";
import { ThemeContext } from "../context/ThemeContext";

const Header = ({ heading, subHeading, backButton = false }) => {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { theme } = useContext(ThemeContext);

  const drawerItems = [
    {
      label: "About Us",
      icon: (
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={theme === "dark" ? "#E3E3E3" : "#000"}
        />
      ),
      onPress: () => console.log("Go About Us"),
    },
    {
      label: "Rate App",
      icon: (
        <FontAwesome6
          name="star"
          size={24}
          color={theme === "dark" ? "#E3E3E3" : "#000"}
        />
      ),
      onPress: () => console.log("Go Rate App"),
    },
    {
      label: "Share App",
      icon: (
        <MaterialIcons
          name="share"
          size={24}
          color={theme === "dark" ? "#E3E3E3" : "#000"}
        />
      ),
      onPress: () => console.log("Go Share App"),
    },
  ];

  return (
    <>
      <View
        className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-5 pt-2"
        style={{
          height: hp(16),
          flexDirection: "row",
          backgroundColor: theme === "dark" ? "#027368" : "#00AB9A",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <View
          className="flex-row items-center gap-4"
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          {backButton === false ? (
            <Pressable onPress={() => setDrawerVisible(true)}>
              <FontAwesome6
                name="bars-staggered"
                size={24}
                color={theme === "dark" ? "#e3e3e3" : "white"}
              />
            </Pressable>
          ) : (
            <Pressable onPress={() => router.back()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme === "dark" ? "#e3e3e3" : "white"}
              />
            </Pressable>
          )}
          <View>
            <Text
              className="font-bold"
              style={{
                fontSize: hp(3),
                color: theme === "dark" ? "#e3e3e3" : "white",
              }}
            >
              {heading}
            </Text>
            {subHeading && (
              <Text
                style={{
                  color: theme === "dark" ? "#e3e3e3" : "white",
                }}
              >
                {subHeading}
              </Text>
            )}
          </View>
        </View>
        <Pressable>
          <MaterialIcons name="favorite-border" size={28} color="white" />
        </Pressable>
      </View>
      {
        <Drawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          items={drawerItems}
        />
      }
    </>
  );
};

export default Header;
