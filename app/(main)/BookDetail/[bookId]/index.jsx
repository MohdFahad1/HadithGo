import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { books } from "../../../../data/books";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import { heightPercentageToDP } from "react-native-responsive-screen";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams();
  const router = useRouter();

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return (
      <View>
        <Text>Book not found: {book}</Text>
      </View>
    );
  }

  const { chapters } = book.data;

  return (
    <ScreenWrapper>
      <Header heading={book.data.metadata.english.title} backButton={true} />
      <View
        style={{
          marginTop: heightPercentageToDP(8),
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 1,
          paddingHorizontal: 5,
        }}
      >
        <FlatList
          data={chapters}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) =>
            (item.id != null ? item.id : index).toString()
          }
          renderItem={({ item }) => (
            <Pressable
              className="flex-row items-center gap-4 p-3"
              onPress={() => {
                router.push({
                  pathname: "/(main)/BookDetail/[bookId]/[chapterId]",
                  params: {
                    bookId: bookId,
                    chapterId: item.id,
                  },
                });
              }}
            >
              <View className="bg-[#00AB9A] items-center justify-center rounded-lg size-10">
                <Text
                  className="text-white "
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {item.id}
                </Text>
              </View>
              <Text className="flex-1 text-[16px]">{item.english}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View className="h-[1px] bg-[#eee]" />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default BookDetail;
