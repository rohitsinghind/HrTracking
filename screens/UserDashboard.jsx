import react, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";
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

export default function UserDashboard({ userData, isPunchedIn, setIsPunchedIn,setScreen }) {

  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

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

  const punchHandler = async (e) => {
    var timestamp = new Date().getTime();
    setIsLoading(true)
    await axios
      .post("https://lals.hibiscus.rudrayati.in/createStamp", {
        employee_id: userData?.employee_id,
        latitude: location.latitude,
        longitude: location.latitude,
        timestamp: timestamp,
        flag_value: isPunchedIn?"PUNCH-OUT":"PUNCH-IN",
      })
      .then((res) => {
        setIsPunchedIn(!isPunchedIn)
        setIsLoading(false)
        alert(res.data?.message);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, [])

  return (
    <View style={styles.container}>
      <Text variant="h6" style={{ margin: 10 }}>
        Hello, {userData?.employee_name}
      </Text>
      <HStack m={2} spacing={6}>
        <Text color="gray">Last Punch In:</Text>
        <Text color="gray">19-02-2023 11:34 AM</Text>
      </HStack>
      <HStack m={2} spacing={6}>
        <Text color="gray">Last Punch Out:</Text>
        <Text color="gray">19-02-2023 11:34 AM</Text>
      </HStack>
      <HStack m={2} spacing={6}>
        <Text color="gray">Last Month Attendance:</Text>
        <Text color="gray">19 Days</Text>
      </HStack>
      <Button
        color={isPunchedIn?"pink":"secondary"}
        style={{
          width: 200,
          height: 50,
          marginVertical: 50,
          justifyContent: "center",
        }}
        onPress={punchHandler}
        disabled={isLoading}
        title={isPunchedIn?"Punch Out":"Punch In"}
      />
      <Stack spacing={8}>
        <Button variant="outlined" onPress={()=>setScreen("rePunchReq")} title="Re-punch-In Request" />
        <Button variant="outlined" onPress={()=>setScreen("leaveReq")} title="Leave Request" />
        <Button variant="outlined" title="Holiday List" />
        <Button variant="outlined" title="Attendance List" />
        <Button variant="outlined" title="Daywise Working Hours" />
      </Stack>
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
