import React from "react";
import { Stack } from "expo-router/stack";
import "../global.css";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* splash screen */}
      <Stack.Screen name="(splash)/index" />

      {/* main flow */}
      <Stack.Screen name="(main)/index" />
      <Stack.Screen name="(main)/BookDetail/[bookId]/index" />
      <Stack.Screen name="(main)/BookDetail/[bookId]/[chapterId]" />
    </Stack>
  );
};

export default Layout;
