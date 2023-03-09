import react, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Input } from "react-native";
import RepunchAppDialog from "./RepunchAppDialog";
import {
  ListItem,
  Text,
  TextInput,
  IconButton,
  Button,
  HStack,
  Divider,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function RepunchList({ userData }) {

  const [applications, setApplications] = useState([]);
  const [appData, setAppData] = useState("")

  const fetchApplications = async (e) => {
    await axios
      .get("https://lals.hibiscus.rudrayati.in/getPunchInRequest")
      .then((res) => {
        setApplications(res.data?.data);
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="h5" style={{ margin: 10 }}>
        Re-Punch Request List
      </Text>
      {applications?.map((e, i) => {
        return(
            <View key={e?.id}>
                <Divider />
         <Text variant="h6" onPress={()=>{setAppData(e)}}>{i+1}. {e?.employee_name}</Text>
         <Text color="gray" style={{marginLeft:20, width:280}}>{e?.reason}</Text>
         <Divider style={{ marginBottom: 10 }} />
        </View>);
      })}
      <RepunchAppDialog data={appData} setData={setAppData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal:20
  },
});
