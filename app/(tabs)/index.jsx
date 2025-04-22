import { View, Text } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import HadithBooks from "../../components/HadithBooks";

const Home = () => {
  return (
    <>
      <StatusBar style="light" />
      <ScreenWrapper>
        <View
          className="bg-[#003B33] justify-center px-5 absolute top-0 left-0 right-0 pt-2"
          style={{ height: heightPercentageToDP(19) }}
        >
          <Text
            className="font-bold text-white"
            style={{ fontSize: heightPercentageToDP(4) }}
          >
            Hadith Go
          </Text>
          <Text className="text-lg text-white">
            Your go to app for daily Hadith
          </Text>
        </View>
        <View>
          <HadithBooks />
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Home;
