import React, { useState } from "react";
import axios from "axios";
import {
  Provider,
  HStack,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  TextInput,
} from "@react-native-material/core";

export default function LeaveAppDialog({ setData, data }) {

    const [isLoading, setIsLoading] = useState(false)
  const [remarks, setRemarks] = useState("");

  const acceptHandler = async (e) => {
    setIsLoading(true);
    await axios
      .post("https://lals.hibiscus.rudrayati.in/updateLeaveReq", {
        id: data?.id,
        status: "ACCEPTED",
        remarks: remarks,
      })
      .then((res) => {
        setIsLoading(false);
        setRemarks("")
        alert(res.data?.message);
        setData("");
      });
  };

  const rejectHandler = async (e) => {
    setIsLoading(true);
    await axios
      .post("https://lals.hibiscus.rudrayati.in/updateLeaveReq", {
        id: data?.id,
        status: "REJECT",
        remarks: remarks,
      })
      .then((res) => {
        setIsLoading(false);
        setRemarks("")
        alert(res.data?.message);
        setData("");
      });
  };

  return (
    <>
      <Provider>
        <Dialog visible={data ? true : false} onDismiss={() => setData("")}>
          <DialogHeader title="Leave Application" />
          <DialogContent>
            <HStack spacing={2}>
              <Text>Requested By : </Text>
              <Text>{data?.employee_name}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text>Employee Id : </Text>
              <Text>{data?.employee_id}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text>From : </Text>
              <Text>{data?.from_date?.substring(0, 10)}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text>To : </Text>
              <Text>{data?.to_date?.substring(0, 10)}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text>Reason : </Text>
              <Text>{data?.reason_for_leave}</Text>
            </HStack>
            <TextInput
              style={{ marginTop: 10 }}
              label="Remarks"
              variant="outlined"
              value={remarks}
              onChangeText={(e) => setRemarks(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button title="Accept" disabled={isLoading} onPress={acceptHandler} compact variant="text" />
            <Button color="error" title="Reject" disabled={isLoading} onPress={rejectHandler} compact variant="text" />
          </DialogActions>
        </Dialog>
      </Provider>
    </>
  );
}
