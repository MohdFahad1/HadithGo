import React, { useContext, useEffect, useState } from "react";
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
import { ThemeContext } from "../../../../context/ThemeContext";
import { LanguageContext } from "../../../../context/LanguageContext";

export default function ChapterDetail() {
  const { bookId, chapterId } = useLocalSearchParams();
  const [copiedHadith, setCopiedHadith] = useState(null);
  const b = books.find((b) => b.id === bookId);

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  if (!b) {
    return <Text>Book not found</Text>;
  }

  const { metadata, chapters, hadiths } = b.data;
  const bookTitle = metadata[language].title;
  const chapterName = chapters.find((c) => c.id.toString() === chapterId)?.[
    language
  ];

  if (!chapterName) {
    return <Text>Chapter not found</Text>;
  }

  const hadithsForThisChapter = hadiths.filter(
    (h) => h.chapterId === Number(chapterId)
  );

  const englishHadiths = hadithsForThisChapter.filter(
    (h) => h.english && h.english.text
  );
  const renderData =
    language === "english" ? englishHadiths : hadithsForThisChapter;
  const showLanguageFallback =
    language === "english" && englishHadiths.length === 0;

  const copyToClipboard = async (text, id) => {
    setCopiedHadith(id);
    await Clipboard.setStringAsync(text);
    Alert.alert(
      "Copied to Clipboard",
      "The hadith text has been copied to your clipboard."
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
      <Header heading={bookTitle} subHeading={chapterName} backButton />

      <View
        className="flex-1 px-5 rounded-t-3xl"
        style={{
          marginTop: hp(8),
          backgroundColor: theme === "dark" ? "#1C1C1E" : "#fff",
        }}
      >
        {showLanguageFallback ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: hp(2.4),
                color: theme === "dark" ? "#e3e3e3" : "#333",
                textAlign: "center",
              }}
            >
              Change the language to Arabic —{"\n"}
              these hadiths are only available in Arabic.
            </Text>
          </View>
        ) : (
          <FlatList
            data={renderData}
            keyExtractor={(h, i) => (h.id ?? i).toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const text =
                language === "english" ? item.english.text : item.arabic;
              return (
                <View
                  className="p-3 border-[1px] rounded-xl mt-5"
                  style={{ borderColor: theme === "dark" ? "#444" : "#ccc" }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      className="mb-3"
                      style={{
                        fontSize: hp(2.2),
                        color: theme === "dark" ? "#e3e3e3" : "#666",
                      }}
                    >
                      {text}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-end gap-2">
                    {copiedHadith === item.id ? (
                      <AntDesign name="check" size={24} color="#00AB9A" />
                    ) : (
                      <Pressable onPress={() => copyToClipboard(text, item.id)}>
                        <MaterialIcons
                          name="content-copy"
                          size={22}
                          color="#00AB9A"
                        />
                      </Pressable>
                    )}

                    <Pressable onPress={() => shareHadith(text)}>
                      <MaterialCommunityIcons
                        name="share-outline"
                        size={24}
                        color="#00AB9A"
                      />
                    </Pressable>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}
