import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { books } from "../../../../data/books";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ChapterDetail() {
  const { bookId, chapterId } = useLocalSearchParams();
  const [copiedHadith, setCopiedHadith] = useState(null);
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

  const copyToClipboard = async (text, id) => {
    setCopiedHadith(id);
    await Clipboard.setStringAsync(text);
    Alert.alert(
      "Copied to Clipboard",
      "The hadith text has been copied to you clipboard."
    );
    setTimeout(() => {
      setCopiedHadith(null);
    }, 1200);
  };

  const shareHadith = async (text) => {
    try {
      const result = await Share.share({
        message: text,
        title: "Share Hadith from HadithGo App",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to share the hadith.");
    }
  };

  return (
    <ScreenWrapper>
      <Header
        heading={b.data.metadata.english.title}
        subHeading={chap.english}
        backButton
      />

      <View
        className="px-5 bg-[#fff] rounded-t-3xl flex-1"
        style={{ marginTop: hp(8) }}
      >
        <FlatList
          data={hadithsForThisChapter}
          keyExtractor={(h, i) => (h.id ?? i).toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="p-3 border-[1px] rounded-xl border-[#ccc] mt-5">
              <View style={{ flex: 1 }}>
                <Text className="mb-3" style={{ fontSize: hp(2.2) }}>
                  {item.english.text}
                </Text>
              </View>
              <View className="flex-row items-center justify-end gap-2">
                {copiedHadith === item.id ? (
                  <AntDesign name="check" size={24} color="#00AB9A" />
                ) : (
                  <Pressable
                    onPress={() => copyToClipboard(item.english.text, item.id)}
                  >
                    <MaterialIcons
                      name="content-copy"
                      size={22}
                      color="#00AB9A"
                    />
                  </Pressable>
                )}

                <Pressable onPress={() => shareHadith(item.english.text)}>
                  <MaterialCommunityIcons
                    name="share-outline"
                    size={24}
                    color="#00AB9A"
                  />
                </Pressable>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}
