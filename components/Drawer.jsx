import React, { useContext, useEffect, useRef, useState } from "react";
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
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";

const { width: screenWidth } = Dimensions.get("window");
const DRAWER_WIDTH = screenWidth * 0.7;

const Drawer = ({ visible, onClose, items }) => {
  const anim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const [shouldRender, setShouldRender] = useState(visible);
  const [langOpen, setLangOpen] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

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
        style={[
          styles.drawer,
          {
            transform: [
              {
                translateX: anim,
              },
            ],
            backgroundColor: theme === "dark" ? "#1C1C1E" : "#FFF",
          },
        ]}
      >
        {/* LOGO IMAGE */}
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
          {/* THEME SWITCH */}
          <View
            style={{ flexDirection: "row", alignItems: "center", padding: 5 }}
          >
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={24}
              color={theme === "dark" ? "#E3E3E3" : "#000"}
            />
            <Text
              style={{
                fontSize: hp(2.2),
                marginLeft: 8,
                color: theme === "dark" ? "#E3E3E3" : "#000",
              }}
            >
              Theme
            </Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Switch
                value={theme === "dark"}
                onValueChange={toggleTheme}
                trackColor={{
                  false: "#767577",
                  true: "#81B0FF",
                }}
                thumbColor={theme === "dark" ? "#4A4A4A" : "#F5DD4B"}
              />
            </View>
          </View>

          {/* DRAWER ITEMS */}
          <View
            style={{
              gap: 22,
            }}
          >
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
                <Text
                  style={{
                    fontSize: hp(2.2),
                    color: theme === "dark" ? "#E3E3E3" : "#000",
                  }}
                >
                  {it.label}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Language selector */}
          <View style={{ gap: 13, marginTop: 22 }}>
            <View style={styles.row} className="flex-row items-center">
              <MaterialCommunityIcons
                name="translate"
                size={24}
                color={theme === "dark" ? "#E3E3E3" : "#000"}
              />
              <Text
                style={[
                  styles.label,
                  { color: theme === "dark" ? "#E3E3E3" : "#000" },
                ]}
              >
                Language
              </Text>
            </View>

            {/* the “select box” */}
            <View>
              <Pressable
                onPress={() => setLangOpen((v) => !v)}
                style={[
                  styles.selectBox,
                  { borderColor: theme === "dark" ? "#555" : "#ccc" },
                ]}
              >
                <Text style={{ color: theme === "dark" ? "#E3E3E3" : "#000" }}>
                  {language === "english" ? "English" : "Arabic"}
                </Text>
                <AntDesign
                  name="down"
                  size={22}
                  color={theme === "dark" ? "#E3E3E3" : "#000"}
                />
              </Pressable>

              {langOpen && (
                <View
                  style={[
                    styles.options,
                    { backgroundColor: theme === "dark" ? "#2A2A2A" : "#FFF" },
                  ]}
                >
                  <Pressable
                    onPress={() => {
                      setLanguage("english");
                      setLangOpen(false);
                    }}
                    style={styles.option}
                  >
                    <Text
                      style={{ color: theme === "dark" ? "#E3E3E3" : "#000" }}
                    >
                      English
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setLanguage("arabic");
                      setLangOpen(false);
                    }}
                    style={styles.option}
                  >
                    <Text
                      style={{ color: theme === "dark" ? "#E3E3E3" : "#000" }}
                    >
                      Arabic
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    zIndex: 1000,
    alignItems: "center",
    gap: 20,
  },
  options: {
    position: "absolute",
    width: "100%",
    top: 40,
    right: 20,
    width: 120,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    zIndex: 1001,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  label: { fontSize: hp(2.2), marginLeft: 8 },
  selectBox: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Drawer;
