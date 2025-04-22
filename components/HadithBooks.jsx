import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { books } from "../data/books.js";
import { heightPercentageToDP } from "react-native-responsive-screen";

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

export default function HadithBooks({ navigation }) {
  const [numColumns, setNumColumns] = useState(1);

  const renderGridItem = ({ item, index }) => {
    const initial = item.id.charAt(0).toUpperCase();
    const bgColor = colors[index % colors.length];
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: 20,
          margin: 8,
          backgroundColor: "#fff",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: bgColor,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            {initial}
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 8 }}>
          {item.name}
        </Text>
        <Text style={{ color: bgColor, marginTop: 4 }}>
          {item.data.hadiths.length} hadiths
        </Text>
      </TouchableOpacity>
    );
  };

  const renderListItem = ({ item, index }) => {
    const initial = item.id.charAt(0).toUpperCase();
    const bgColor = colors[index % colors.length];
    const author = item.data.metadata.english.author || "Unknown Author";
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("BookDetail", { bookId: item.id })}
        style={{
          flex: 1,
          flexDirection: "row",
          paddingVertical: 10,
          alignItems: "center",
          gap: 10,
          margin: 8,
          borderBottomColor: "#e3e3e3",
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
            {initial}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item.name}{" "}
            <Text
              style={{
                color: "#666",
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              ({item.data.hadiths.length} hadiths)
            </Text>
          </Text>
          <Text style={{ color: "#666", marginTop: 4 }}>From: {author}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        marginTop: heightPercentageToDP(11),
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 10,
        backgroundColor: "#F5F5F8",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => setNumColumns(1)}
          style={{
            padding: 8,
            backgroundColor: numColumns === 1 ? "#ccc" : "#fff",
            borderRadius: 4,
            marginRight: 8,
          }}
        >
          <Text style={{ fontWeight: numColumns === 1 ? "bold" : "normal" }}>
            📃
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setNumColumns(2)}
          style={{
            padding: 8,
            backgroundColor: numColumns === 2 ? "#ccc" : "#fff",
            borderRadius: 4,
          }}
        >
          <Text style={{ fontWeight: numColumns === 2 ? "bold" : "normal" }}>
            🔲
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
        />
      ) : (
        <FlatList
          key="list"
          data={books}
          keyExtractor={(item) => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          renderItem={renderListItem}
        />
      )}
    </View>
  );
}
