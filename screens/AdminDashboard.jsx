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
  Badge
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function AdminDashboard({ userData,setScreen }) {
 
    const [leaveCount, setLeaveCount] = useState(0)
    const [rePunchReqCount, setRePunchReqCount] = useState(0)
    const fetchApplications = async (e) => {
        await axios
          .get("https://lals.hibiscus.rudrayati.in/getLeaveApplication")
          .then((res) => {
            setLeaveCount(res.data?.data?.length);
          });
        await axios
          .get("https://lals.hibiscus.rudrayati.in/getPunchInRequest")
          .then((res) => {
            setRePunchReqCount(res.data?.data?.length);
          });
      };
    
      useEffect(() => {
        fetchApplications();
      }, []);

  return (
    <View style={styles.container}>
      <Text variant="h6" style={{ margin: 10 }}>
        Hello, {userData?.employee_name}
      </Text>
      <HStack m={1} spacing={6}>
        <Text color="gray">Today's Attendance : </Text>
        <Text color="gray">23/25</Text>
      </HStack>
      <HStack m={1} spacing={6}>
        <Text color="gray">Employees On Leave : </Text>
        <Text color="gray">2</Text>
      </HStack>
      <HStack m={1} spacing={6}>
        <Text color="gray">Punch In Date : </Text>
        <Text color="gray">19/03/2023</Text>
      </HStack>
      <HStack m={1} spacing={6}>
        <Text color="gray">On Time : </Text>
        <Text color="gray">19</Text>
      </HStack>
      <HStack m={1} spacing={6}>
        <Text color="gray">Delayed : </Text>
        <Text color="gray">12</Text>
      </HStack>
      <HStack m={1} spacing={6}>
        <Text color="gray">Not Yet : </Text>
        <Text color="gray">1</Text>
      </HStack>
      <Stack m={16} spacing={8}>
          <Button variant="outlined" onPress={()=>setScreen("leaveReqList")} title="Leave Application" trailing={props => <Badge label={leaveCount} {...props} />}/>
          <Button variant="outlined" onPress={()=>setScreen("rePunchReqList")} title="Re-Punch-In Request" trailing={props => <Badge label={rePunchReqCount} {...props} />}/>
          <Button variant="outlined" title="Reports" />
          <Button variant="outlined" title="Settings" />
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
