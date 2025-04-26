import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { books } from "../data/books.js";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { ThemeContext } from "../context/ThemeContext.js";
import { LanguageContext } from "../context/LanguageContext.js";

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#556270",
  "#C7F464",
  "#FFCC5C",
  "#96CEB4",
  "#D95B43",
  "#6A4C93",
];

const AnimatedTouchable = Animated.createAnimatedComponent(
  require("react-native").TouchableOpacity
);

export default function HadithBooks() {
  const [numColumns, setNumColumns] = useState(1);
  const router = useRouter();

  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const renderGridItem = ({ item, index }) => {
    const initial = item.id.charAt(0).toUpperCase();
    const bgColor = colors[index % colors.length];
    const title = item.data.metadata[language].title;
    const count = item.data.hadiths.length;

    return (
      <AnimatedTouchable
        entering={FadeInDown.delay(index * 100)
          .duration(300)
          .springify()}
        onPress={() =>
          router.navigate(`BookDetail/${item.id}`, { bookId: item.id })
        }
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 20,
          margin: 8,
          backgroundColor: theme === "dark" ? "#1C1C1E" : "#fff",
          borderWidth: 0.5,
          borderColor:
            theme === "dark" ? colors[index % colors.length] : "#FFF",
          borderRadius: 10,
        }}
      >
        {/* First Word of the Book */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: bgColor,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "medium", color: "#fff" }}>
            {initial}
          </Text>
        </View>

        {/* Book name & Hadith Count */}
        <Text
          style={{
            fontSize: hp(2.2),
            fontWeight: "600",
            marginTop: 8,
            color: theme === "dark" ? "#e3e3e3" : "#121212",
          }}
        >
          {title}
        </Text>
        <Text style={{ color: bgColor, marginTop: 4, fontWeight: "bold" }}>
          ( {count} ) {language === "arabic" ? "أحاديث" : "hadiths"}
        </Text>
      </AnimatedTouchable>
    );
  };

  const renderListItem = ({ item, index }) => {
    const initial = item.id.charAt(0).toUpperCase();
    const bgColor = colors[index % colors.length];
    const title = item.data.metadata[language].title;
    const author = item.data.metadata[language].author || "Unknown Author";
    const count = item.data.hadiths.length;

    return (
      <AnimatedTouchable
        entering={FadeInDown.delay(index * 100)
          .duration(300)
          .springify()}
        onPress={() =>
          router.navigate(`BookDetail/${item.id}`, { bookId: item.id })
        }
        style={{
          flex: 1,
          flexDirection: "row",
          paddingVertical: 10,
          alignItems: "center",
          gap: 10,
          margin: 8,
          borderBottomColor: theme === "dark" ? "#D9D6D2" : "#e3e3e3",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            backgroundColor: bgColor,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 25, fontWeight: "medium", color: "#fff" }}>
            {initial}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme === "dark" ? "#E3E3E3" : "#000",
            }}
          >
            {title}{" "}
            <Text
              style={{
                color: theme === "dark" ? "#F7F5F2" : "#121212",
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              ( {count} ) {language === "arabic" ? "أحاديث" : "hadiths"}
            </Text>
          </Text>
          <Text
            style={{
              color: theme === "dark" ? "#CCCCCC" : "#666",
              marginTop: 4,
            }}
          >
            {language === "arabic" ? "من:" : "From:"} {author}
          </Text>
        </View>
      </AnimatedTouchable>
    );
  };

  return (
    <View
      style={{
        marginTop: hp(7),
        paddingTop: 10,
        paddingBottom: 50,
        paddingHorizontal: 10,
        backgroundColor:
          theme === "dark"
            ? "#1C1C1E"
            : numColumns === 2
            ? "#F5F5F8"
            : "#FFFFFF",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 15,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity onPress={() => setNumColumns(1)}>
          <Text style={{ fontWeight: numColumns === 1 ? "bold" : "normal" }}>
            <FontAwesome5
              name="list"
              size={20}
              color={numColumns === 1 ? "#00AB9A" : "gray"}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNumColumns(2)}>
          <Text style={{ fontWeight: numColumns === 2 ? "bold" : "normal" }}>
            <Ionicons
              name="grid-outline"
              size={24}
              color={numColumns === 2 ? "#00AB9A" : "gray"}
            />
          </Text>
        </TouchableOpacity>
      </View>

      {numColumns === 2 ? (
        <FlatList
          key="grid"
          data={books}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={renderGridItem}
          router={router}
        />
      ) : (
        <FlatList
          key="list"
          data={books}
          keyExtractor={(item) => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderListItem}
          router={router}
        />
      )}
    </View>
  );
}
