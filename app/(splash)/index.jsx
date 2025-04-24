import { View, Image, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn } from "react-native-reanimated";

const SplashScreen = () => {
  return (
    <View className="flex-1 h-full w-full bg-[#003B33]">
      <StatusBar style="light" />
      <Animated.View
        entering={FadeIn.duration(800)}
        className="relative justify-center flex-1 w-full h-full"
      >
        <Image
          source={require("../../assets/images/hadith-logo.png")}
          style={{
            width: 200,
            height: 200,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2"
          resizeMode="cover"
        />
      </Animated.View>
      <View className="absolute bottom-44 left-0 right-0 flex items-center justify-center bg-[#003B33] h-[100px]">
        <Text className="text-2xl font-bold text-white w-[200px] text-center">
          Carry the Sunnah, wherever you go.
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
