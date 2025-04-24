import { View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import HadithBooks from "../../components/HadithBooks";
import Header from "../../components/Header";

const Home = () => {
  return (
    <>
      <StatusBar style="light" />
      <ScreenWrapper>
        <Header heading={"Hadith Go"} />
        <View>
          <HadithBooks />
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Home;
