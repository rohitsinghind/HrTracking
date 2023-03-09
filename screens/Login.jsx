import react, { useState } from "react";
import axios from "axios";
import { StyleSheet, View } from "react-native";
import {
  Surface,
  Text,
  TextInput,
  IconButton,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function Login({ setUserData, setScreen }) {
  const [employee_mobile, setEmployee_mobile] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const loginHandler = async (e) => {
    setIsLoading(true)
    setScreen("home")
    await axios
      .post("https://lals.hibiscus.rudrayati.in/login", {
        employee_mobile,
        password,
      })
      .then((res) => {
        setIsLoading(false)
        if(res.data?.message !== "User Logged In"){
            alert(res.data?.message);
        }
        setUserData(res.data?.data);
      });
  };

  return (
    <View style={styles.container}>
      <Surface
        elevation={2}
        category="medium"
        style={{ padding: 4, width: 280, padding: 20 }}
      >
        <Text variant="h4" style={{ margin: 20 }}>
          Login
        </Text>
        <TextInput
          id="Username"
          label={employee_mobile?"":"Username"}
          leading={(props) => <Icon name="account" {...props} />}
          value={employee_mobile}
          onChangeText={(e) => setEmployee_mobile(e)}
        />
        <TextInput
          id="password"
          label={password?"":"Password"}
          variant="outlined"
          style={{ marginVertical: 5 }}
          value={password}
          onChangeText={(e) => setPassword(e)}
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="eye" {...props} />}
              {...props}
            />
          )}
        />
        <Button title="Login" onPress={loginHandler} disabled={isLoading}/>
      </Surface>
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
