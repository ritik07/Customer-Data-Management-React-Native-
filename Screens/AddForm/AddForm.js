import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput as CustomTextInput } from "react-native-paper";
import { Formik } from "formik";
import moment from "moment";
import axios from "axios";
import AnimatedLoader from "react-native-animated-loader";

export default function AddForm({ navigation }) {
  const isEditMode = navigation.getParam("name");
  const id = navigation.getParam("id");

  //SECTION API GATE WAY
  const API_GATEWAY = "https://ktcsuprem.herokuapp.com";

  const [Loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        sName: isEditMode ? navigation.getParam("name") : "",
        iBillNo: isEditMode ? navigation.getParam("billno") : "",
        sDate: isEditMode ? navigation.getParam("date") : "",
        sBatteryType: isEditMode ? navigation.getParam("batterytype") : "",
        sDate: isEditMode
          ? navigation.getParam("date")
          : moment().format("YYYY-MM-DD"),
      }}
      onSubmit={(values) => {
        if (!isEditMode) {
          setLoading(true);
          console.log(values);
          axios
            .post(API_GATEWAY + `/api/insertdata/`, { ...values })
            .then((res) => {
              if (res.data.success) {
                setLoading(false);
                navigation.navigate("Home");
              }
              console.log(res.data);
            });
        } else {
          let formDT = { ...values, id: id };
          setLoading(true);
          console.log("values", formDT);
          axios.post(API_GATEWAY + `/api/updatedata/`, formDT).then((res) => {
            if (res.data.success) {
              setLoading(false);
              navigation.navigate("Home");
            }
            console.log(res.success);
            console.log(res.data);
          });
        }
      }}
    >
      {({ handleSubmit, values, setFieldValue, handleChange, handleBlur }) => (
        <MyForm
          setLoading={setLoading}
          Loading={Loading}
          values={values}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      )}
    </Formik>
  );
}

export const MyForm = (props) => {
  const {
    handleSubmit,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    setLoading,
    Loading,
  } = props;

  //SECTION STATES
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //SECTIONS FUNCTIONS
  const showDatePicker = () => {
    Keyboard.dismiss();
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setFieldValue("sDate", moment(date).format("YYYY-MM-DD"));
  };

  return (
    <ScrollView>
      <AnimatedLoader
        visible={Loading}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../Layouts/Animation/Lottie/loading.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
      <View style={styles.container}>
        <View style={styles.FormView}>
          <View>
            <CustomTextInput
              label="Party Name"
              style={styles.Input}
              placeholder="Enter Party Name"
              onChangeText={handleChange("sName")}
              onBlur={handleBlur("sName")}
              value={values.sName}
            />

            <CustomTextInput
              keyboardType={"numeric"}
              label="Bill No."
              style={styles.Input}
              placeholder="Enter Bill No."
              onChangeText={handleChange("iBillNo")}
              onBlur={handleBlur("iBillNo")}
              value={values.iBillNo}
            />

            <CustomTextInput
              label="Battery Type"
              style={styles.Input}
              placeholder="Enter Battery Type"
              onChangeText={handleChange("sBatteryType")}
              onBlur={handleBlur("sBatteryType")}
              value={values.sBatteryType}
            />

            <CustomTextInput
              onFocus={showDatePicker}
              label="Date"
              style={styles.Input}
              placeholder="Select Date"
              value={moment(values.sDate).format("YYYY-MM-DD")}
            />

            <View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={moment(values.sDate).toDate()}
              />

              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  FormView: {
    margin: 20,
  },
  Input: {
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  Label: {
    marginLeft: 4,
    marginBottom: 2,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
