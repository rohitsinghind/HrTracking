import React from "react";
import { AppBar, Button, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";


let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear()

const Navbar = ({ userData, setUserData,setScreen }) => (
  <AppBar
    style={{ paddingTop: 25 }}
    title="HR Tracking"
    subtitle={date+"/"+month+"/"+year}
    leading={props => 
        userData?.employee_name ? (
        <IconButton
            onPress={()=>{setScreen("home")}}
          icon={props => <Icon name="home" {...props} />}
          {...props}
        />
      ):""}

    trailing={(props) =>
      userData?.employee_name ? (
        <Button
          variant="outlined"
          title="Logout"
          compact
          style={{ marginEnd: 4 }}
          onPress={() => setUserData("")}
          {...props}
        />
      ) : (
        ""
      )
    }
  />
);

export default Navbar;
