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
      <Stack.Screen name="(splash)/index" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
};

export default Layout;
