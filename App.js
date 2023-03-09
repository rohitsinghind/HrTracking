import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";
import UserDashboard from "./screens/UserDashboard";
import LeaveApplication from "./screens/LeaveApplication";
import RePunchInRequest from "./screens/RePunchInRequest";
import AdminDashboard from "./screens/AdminDashboard";
import LeaveApplicationList from "./screens/LeaveApplicationList";
import RepunchList from "./screens/RepunchList";

export default function App() {
  const [screen, setScreen] = useState("home");

  const [userData, setUserData] = useState("");
  const [isPunchedIn, setIsPunchedIn] = useState(false);
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

  const activeHandler = async () => {
    fetchLocation();
    var timestamp = new Date().getTime();
    await axios
      .post("https://lals.hibiscus.rudrayati.in/createStamp", {
        employee_id: userData?.employee_id,
        latitude: location.latitude,
        longitude: location.latitude,
        timestamp: timestamp,
        flag_value: "ACTIVE",
      })
      .then((res) => {
        console.log(res.data?.message);
      });
  };

  useEffect(() => {
    const timerRef = setInterval(() => {
      if (isPunchedIn) activeHandler();
    }, 900000);

    return () => clearInterval(timerRef);
  }, [isPunchedIn]);

  return (
    <>
      <Navbar
        setUserData={setUserData}
        userData={userData}
        setScreen={setScreen}
      />
      {userData?.role === "user" ? (
        screen === "home" ? (
          <UserDashboard
            userData={userData}
            isPunchedIn={isPunchedIn}
            setIsPunchedIn={setIsPunchedIn}
            setScreen={setScreen}
          />
        ) : screen === "rePunchReq" ? (
          <RePunchInRequest userData={userData} />
        ) : (
          <LeaveApplication userData={userData} />
        )
      ) : userData?.role === "admin" ? (
        screen === "home" ? (
          <AdminDashboard userData={userData} setScreen={setScreen} />
        ) : screen === "rePunchReqList" ? (
          <RepunchList userData={userData} />
        ) : (
          <LeaveApplicationList userData={userData} />
        )
      ) : (
        <Login setUserData={setUserData} setScreen={setScreen} />
      )}
    </>
  );
}
