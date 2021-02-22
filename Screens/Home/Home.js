import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { FAB } from "react-native-paper";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import Loader from "react-native-easy-content-loader";
import Swipeout from "react-native-swipeout";
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";

export default function Home({ navigation }) {
  //SECTION API-GATEWAY
  const API_GATEWAY = "https://ktcsuprem.herokuapp.com";

  const deleteNote = () => {
    console.log("GOT HIT");
  };

  //SECTION DUMMY DATA

  // SECTION STATES
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  const filteredItems = dataSource.filter(
    (item) => item.billno.includes(search) || item.name.includes(search)
  );

  //SECTION FUNCTIONS
  const updateSearch = (search) => {
    setSearch(search);
  };

  const handleOnClickListItem = (item) => {};

  const fetchData = () => {
    axios.get(API_GATEWAY + "/api/getdata/").then((response) => {
      if (response.data.success) {
        SetIsLoading(false);
      }
      setDataSource(response.data.data);
    });
  };

  useEffect(() => {
    fetchData();
    if (fetchData.length) fetchData();
  }, [fetchData]);

  const handleOnDelete = (uid) => {
    SetIsLoading(true);
    let iRavanaID = uid;
    console.log(API_GATEWAY + `/api/deletedata/` + iRavanaID);
    axios.post(API_GATEWAY + `/api/deletedata/`, { iRavanaID }).then((res) => {
      if (res.data.success) {
        SetIsLoading(false);
      }
      console.log(res.data.success);
    });
  };

  return (
    <View style={styles.mainView}>
      <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../Layouts/Animation/Lottie/loading.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
      <SearchBar
        inputContainerStyle={(styles.searchBar, styles.searchBarHeight)}
        containerStyle={{ backgroundColor: "#fff" }}
        lightTheme={true}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => {
          let swipeBtns = [
            {
              component: (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Icon
                    size={15}
                    name={"delete"}
                    color={"#d92550"}
                    reverse
                    reverseColor={"#fff"}
                  />
                </View>
              ),
              text: "Delete",
              backgroundColor: "#fff",
              underlayColor: "rgba(0, 0, 0, 1, 0.6)",
              onPress: () => {
                Alert.alert("Alert", "Are you sure you want to delete?", [
                  {
                    text: "No",
                    onPress: () => console.log("WEW"),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => handleOnDelete(`${item.id}`),
                    style: "default",
                  },
                ]);
              },
            },
            {
              component: (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Icon
                    size={15}
                    name={"edit"}
                    color={"#32b973"}
                    reverse
                    reverseColor={"#fff"}
                  />
                </View>
              ),
              text: "Edit",
              backgroundColor: "#fff",
              underlayColor: "rgba(0, 0, 0, 1, 0.6)",
              onPress: () => {
                navigation.navigate("AddForm", item);
              },
            },
          ];
          return (
            <Swipeout
              right={swipeBtns}
              autoClose="true"
              backgroundColor="#fff"
              sensitivity={10}
            >
              <View style={styles.FlatList}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("FormDetail", item);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={"info"} color={"#32b973"} />
                    <View style={{ marginLeft: 10 }}>
                      <Text>{item.name}</Text>
                      <Text style={styles.TextTitle}>{item.billno}</Text>
                      <Text style={styles.TextTitle}>{item.batterytype}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </Swipeout>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <StatusBar style="auto" />
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => {
          navigation.navigate("AddForm");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  //List View
  mainView: {
    backgroundColor: "#fff",
    height: "100%",
  },

  FlatItemList: {
    marginLeft: 15,
  },
  TextTitle: {
    color: "#7a7a7a",
  },
  FlatListIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  DeleteIcon: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  FlatList: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: "#9898",
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    marginTop: 10,
    marginLeft: 18,
    marginRight: 18,
    marginBottom: 15,
    borderWidth: 0,
    borderRadius: 15,
    color: "#000",
    backgroundColor: "#fff",
  },
  searchBarHeight: {
    height: 35,
    color: "#000",
    backgroundColor: "#fff",
  },
  listViewMargin: {
    marginTop: 10,
  },
  fab: {
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    color: "#000",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
