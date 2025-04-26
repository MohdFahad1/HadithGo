import { View, Text, FlatList, Pressable } from "react-native";
import React, { useContext } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { books } from "../../../../data/books";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { ThemeContext } from "../../../../context/ThemeContext";
import { LanguageContext } from "../../../../context/LanguageContext";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams();
  const router = useRouter();

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return (
      <View>
        <Text>Book not found: {book}</Text>
      </View>
    );
  }

  const { chapters, metadata } = book.data;

  const localizedTitle = metadata[language].title;

  return (
    <ScreenWrapper>
      <Header heading={localizedTitle} backButton={true} />
      <View
        style={{
          marginTop: heightPercentageToDP(8),
          backgroundColor: theme === "dark" ? "#1C1C1E" : "#fff",
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
          renderItem={({ item }) => {
            const label = item[language];
            return (
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
                <View
                  className={`
        items-center justify-center rounded-lg size-10
        ${theme === "dark" ? "bg-[#00AB9A]/40" : "bg-[#00AB9A]"}
      `}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      color: theme === "dark" ? "#F2EFEB" : "white",
                    }}
                  >
                    {item.id}
                  </Text>
                </View>
                <Text
                  className="flex-1 text-[16px]"
                  style={{ color: theme === "dark" ? "#F2EFEB" : "#000" }}
                >
                  {label}
                </Text>
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => <View className="h-[1px] bg-[#eee]" />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default BookDetail;
