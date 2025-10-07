import React, { useState } from "react";

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AddTicketModal } from "@/components/ui/AddTicketModal";
import { Ticket } from "@/components/ui/Ticket";
import { danger, dark, primary, success } from "@/constants/Colors";
import { TicketType } from "@/interfaces/ticket.interface";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";

export default function Page() {
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: 0,
      text: "This is the description of the ticket.\n The issue is very serious!",
      date: new Date(),
      status: "created",
      title: "Untitled ticked",
    },
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const done = tickets.filter((t) => t.status === "completed").length;
  const remaining = tickets.length - done;

  return (
    <>
      <SafeAreaView style={styles.page}>
        <Text style={styles.mainTitle}>Ticket List</Text>
        <Text style={styles.subTitle}>
          You have {tickets.length} Issues remaining
        </Text>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <MaterialIcons name="checklist" size={24} color={success} />
            <Text> {done} Issues resolved</Text>
          </View>
          <View style={styles.summaryItem}>
            <MaterialIcons name="pending-actions" size={24} color={danger} />
            <Text> {remaining} Issues remaining</Text>
          </View>
        </View>
        <FlatList
          data={tickets}
          keyExtractor={(item) => (item.id + 1).toString()}
          renderItem={({ item }) => (
            <>
              <Ticket
                onStateChange={(
                  newState: "created" | "ongoing" | "completed"
                ) => {
                  item.status = newState;
                  setTickets([...tickets]);
                }}
                onRatingChange={(rating: string) => {
                  item.rating = Number(rating);
                  setTickets([...tickets]);
                }}
                onDelete={() => {
                  setTickets(tickets.filter((t) => t.id !== item.id));
                }}
                ticket={item}
              ></Ticket>
            </>
          )}
          style={styles.ticketList}
        ></FlatList>
      </SafeAreaView>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.addButtonContainer}>
          <MaterialIcons name="add" size={48} color="white" />
        </View>
      </Pressable>
      <AddTicketModal
        visible={modalVisible}
        onAdd={(title: string, description: string) => {
          setTickets([
            {
              id: tickets.length,
              text: description,
              date: new Date(),
              status: "created",
              title: title,
            },
            ...tickets,
          ]);
        }}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingInline: 8,
    width: "auto",
    height: "100%",
    backgroundColor: "#fff",
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: dark,
  },
  subTitle: {
    color: "#808080",
    fontSize: 16,
    fontStyle: "italic",
  },
  summaryContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: 16,
    marginInline: 32,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  ticketList: {},
  bottomPadding: {
    height: 100,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: -4,
    backgroundColor: primary,
    borderRadius: 60,
    padding: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: dark + "33",
  },
  modalContainer: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    width: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,

    // iOS shadow
    shadowColor: dark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
