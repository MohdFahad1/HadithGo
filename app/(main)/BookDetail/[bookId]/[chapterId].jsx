import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const ChapterHadiths = () => {
  const { bookId, chapterId } = useLocalSearchParams();

  console.log("Book ID:", bookId);
  console.log("Chapter ID:", chapterId);

  return (
    <View>
      <Text>ChapterHadiths</Text>
    </View>
  );
};

export default ChapterHadiths;
