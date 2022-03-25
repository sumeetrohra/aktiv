import React from "react";
import { StatusBar, StyleSheet, SafeAreaView, Platform } from "react-native";
import Input from "./components/Input";
import { Provider } from "react-redux";
import { store } from "./state";
import ImageList from "./components/ImageList";

export default function App() {
  StatusBar.setBarStyle("dark-content");
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <ImageList />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
