import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { books } from "../../../../data/books";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";

export default function ChapterDetail() {
  const { bookId, chapterId } = useLocalSearchParams();
  const b = books.find((b) => b.id === bookId);

  if (!b) {
    return <Text>Book not found</Text>;
  }

  const chap = b.data.chapters.find((c) => c.id.toString() === chapterId);
  if (!chap) {
    return <Text>Chapter not found</Text>;
  }

  const hadithsForThisChapter = b.data.hadiths.filter(
    (h) => h.chapterId === Number(chapterId)
  );

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert(
      "Copied to Clipboard",
      "The hadith text has been copied to you clipboard."
    );
  };

  return (
    <ScreenWrapper>
      <Header
        heading={b.data.metadata.english.title}
        subHeading={chap.english}
        backButton
      />

      <View
        style={styles.listContainer}
        className="px-5 bg-[#fff] rounded-t-3xl"
      >
        <FlatList
          data={hadithsForThisChapter}
          keyExtractor={(h, i) => (h.id ?? i).toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="p-3 border-[1px] rounded-xl border-[#ccc] mt-5">
              <View style={{ flex: 1 }}>
                <Text style={styles.hadithEng}>{item.english.text}</Text>
              </View>
              <View className="flex-row items-center justify-end gap-2">
                <Pressable onPress={() => copyToClipboard(item.english.text)}>
                  <MaterialIcons
                    name="content-copy"
                    size={22}
                    color="#00AB9A"
                  />
                </Pressable>
                <MaterialCommunityIcons
                  name="share-outline"
                  size={24}
                  color="#00AB9A"
                />
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: hp(8),
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  hadithEng: { fontSize: 16, marginBottom: 4 },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 8,
  },
});
