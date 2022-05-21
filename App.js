import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Pseudo Code todo

// add screens and navigation
// screen styling
// create dummy expense data
// core components for displaying data
//    displaying lists
//    displaying dates
// adding/deleting expense functions
// modals? confirm, etc?
// update expenses
// state mgmt
