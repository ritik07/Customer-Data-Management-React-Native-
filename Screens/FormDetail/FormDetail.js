import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { Icon, Card, Button } from "react-native-elements";

export default function FormDetail({ navigation }) {
  const getRavanaNo = navigation.getParam("ravanano");
  const msg = "Text Copied to ClipBoard!";

  // SECTION FUNCTIONS
  const copyToClipBoard = () => {
    Clipboard.setString(getRavanaNo);
    notifyMessage();
  };

  const notifyMessage = () => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  return (
    <View>
      <Card>
        <Card.Title>{navigation.getParam("name")}</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>
          Bill No.: {navigation.getParam("billno")}
        </Text>
        <TouchableOpacity onPress={copyToClipBoard}>
          <Text style={{ marginBottom: 10 }}>
            Battery Type.: {navigation.getParam("batterytype")}
          </Text>
        </TouchableOpacity>
        <Text style={{ marginBottom: 10 }}>
          Date: {navigation.getParam("date")}
        </Text>
      </Card>
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
