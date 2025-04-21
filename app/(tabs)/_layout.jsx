import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarItemStyle: {
          borderRadius: 30,
          marginHorizontal: 10,
          marginVertical: 10,
          overflow: "hidden",
        },

        // ICON COLORS
        tabBarActiveTintColor: "#003B33",
        tabBarInactiveTintColor: "white",

        // PILL BACKGROUND COLORS
        tabBarActiveBackgroundColor: "white",
        tabBarInactiveBackgroundColor: "transparent",

        tabBarStyle: {
          position: "absolute",
          height: 60,
          borderTopWidth: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 5, // Android shadow
          shadowOpacity: 0.1, // iOS shadow
          backgroundColor: "#003B33",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
