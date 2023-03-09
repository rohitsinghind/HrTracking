import react, { useState,useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Input } from "react-native";
import {
  Surface,
  Text,
  TextInput,
  IconButton,
  Button,
  HStack,
  Stack,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function RePunchInRequest({ userData }) {

  const [reason, setReason] = useState("");
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [isLoading, setIsLoading] = useState(false);

  const fetchLocation = async () => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     setLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //     console.log(position)
    //   },
    //   () => {
    //     alert("Unable to retrieve your location");
    //   }
    // );
  };


    var timestamp = new Date().getTime();
  console.log(location)

  const requestHandler = async (e) => {
    setIsLoading(true);
    var timestamp = new Date().getTime();
    await axios
      .post("https://lals.hibiscus.rudrayati.in/punchInRequest", {
        employee_id: userData?.employee_id,
        reason: reason,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp:timestamp
      })
      .then((res) => {
        setIsLoading(false);
        alert(res.data?.message);
        setReason("");
      });
  };

  useEffect(() => {
    fetchLocation();
  }, [])

  return (
    <View style={styles.container}>
      <Text variant="h6" style={{ marginBottom: 40 }}>
        Hello, {userData?.employee_name}
      </Text>
      <TextInput
        variant="outlined"
        label={reason ? "" : "Reason for Re-Punch-In"}
        value={reason}
        onChangeText={(e) => setReason(e)}
        style={{ width: 250 }}
      />
      <Button
        color="secondary"
        style={{
          width: 150,
          height: 50,
          marginVertical: 30,
          justifyContent: "center",
        }}
        title="Request"
        disabled={isLoading}
        onPress={requestHandler}
      />
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
