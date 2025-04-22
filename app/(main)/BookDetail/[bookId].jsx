import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams();
  console.log("ID: ", bookId);

  return (
    <View>
      <Text>BookDetail</Text>
    </View>
  );
};

export default BookDetail;
