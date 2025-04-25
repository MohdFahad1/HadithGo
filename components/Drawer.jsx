import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Switch,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const { width: screenWidth } = Dimensions.get("window");
const DRAWER_WIDTH = screenWidth * 0.7;

const Drawer = ({ visible, onClose, items }) => {
  const anim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(anim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (shouldRender) {
      Animated.timing(anim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <Pressable onPress={onClose} style={styles.overlay} />

      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: anim }] }]}
      >
        <View style={{ height: 130, width: 130, position: "relative" }}>
          <Image
            source={require("../assets/images/hadith-logo.png")}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 65,
              resizeMode: "cover",
            }}
          />
        </View>
        <Text style={{ fontSize: hp(2.1), color: "gray" }}>by Mohd Fahad</Text>

        <View style={{ width: "100%" }}>
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color="black"
            />
            <Text style={{ fontSize: hp(2.2), marginLeft: 8 }}>Theme</Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Switch />
            </View>
          </View>

          <View className="gap-4">
            {items.map((it, i) => (
              <Pressable
                key={i}
                onPress={() => {
                  it.onPress?.();
                  onClose();
                }}
                className="flex-row items-center gap-2"
              >
                {it.icon && <View style={styles.iconWrapper}>{it.icon}</View>}
                <Text style={{ fontSize: hp(2.2) }}>{it.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999,
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    zIndex: 1000,
    alignItems: "center",
    gap: 20,
  },
});

export default Drawer;
