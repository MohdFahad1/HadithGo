import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { books } from "../../../data/books";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { heightPercentageToDP } from "react-native-responsive-screen";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams();

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
            <Pressable className="flex-row items-start gap-4 p-3">
              <View className="bg-[#00AB9A] items-center justify-center rounded-lg size-10">
                <Text
                  className="text-white "
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {item.id}
                </Text>
              </View>
              <Text style={styles.label}>{item.english}</Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScreenWrapper>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  number: { width: 24, fontSize: 16, fontWeight: "600" },
  label: { flex: 1, fontSize: 16 },
  separator: { height: 1, backgroundColor: "#eee" },
});
