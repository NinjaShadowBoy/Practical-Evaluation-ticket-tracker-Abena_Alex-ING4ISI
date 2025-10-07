import { danger, dark, success } from "@/constants/Colors";
import { TicketType } from "@/interfaces/ticket.interface";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function AddTicketModal({
  onAdd,
  onClose,
  visible,
}: {
  onAdd: (title: string, description: string) => void;
  onClose: () => void;
  visible: boolean;
}) {
  let [titleText, setTitleText] = useState<string>("");
  let [description, setDescriptionText] = useState<string>("");
  //   let [visible, setVisible] = useState<boolean>(visible);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setTitleText("");
        // setVisible(false);
        onClose();
      }}
    >
      {/* Dim background */}
      <Pressable
        style={styles.overlay}
        onPress={() => {
          //   setVisible(false);
          onClose();
        }}
      />

      {/* Modal content */}
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>New Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter the title..."
          value={titleText}
          onChangeText={(text) => {
            setTitleText(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter the description..."
          value={description}
          onChangeText={(text) => {
            setDescriptionText(text);
          }}
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              setTitleText("");
              setDescriptionText("");
              //   setVisible(false);
              onClose();
            }}
          >
            <MaterialIcons
              style={styles.buttonText}
              size={40}
              color={danger}
              name={"cancel"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => {
              onAdd(titleText, description);
            }}
          >
            <MaterialIcons
              style={styles.buttonText}
              size={40}
              color={success}
              name={"check-circle"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export function EditTicketModal({
  onEdit,
  onClose,
  visible,
  ticket
}: {
  onEdit: (id: number, title: string, description: string) => void;
  onClose: () => void;
  visible: boolean;
  ticket: TicketType
}) {
  let [titleText, setTitleText] = useState<string>("");
  let [description, setDescriptionText] = useState<string>("");
  //   let [visible, setVisible] = useState<boolean>(visible);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setTitleText("");
        // setVisible(false);
        onClose();
      }}
    >
      {/* Dim background */}
      <Pressable
        style={styles.overlay}
        onPress={() => {
          //   setVisible(false);
          onClose();
        }}
      />

      {/* Modal content */}
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>New Task</Text>

        <TextInput
          style={styles.input}
          placeholder={ticket.title}
          value={titleText}
          onChangeText={(text) => {
            setTitleText(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder={ticket.text || "Enter description..."}
          value={description}
          onChangeText={(text) => {
            setDescriptionText(text);
          }}
        />

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => {
              setTitleText("");
              setDescriptionText("");
              //   setVisible(false);
              onClose();
            }}
          >
            <MaterialIcons
              style={styles.buttonText}
              size={40}
              color={danger}
              name={"cancel"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={() => {
              onEdit(ticket.id, titleText, description);
            }}
          >
            <MaterialIcons
              style={styles.buttonText}
              size={40}
              color={success}
              name={"check-circle"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    shadowColor: "#000",
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
    paddingVertical: 2,
    borderRadius: 100,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: danger + "22",
    color: danger,
  },
  addButton: {
    backgroundColor: success + "22",
    color: success,
  },
  buttonText: {
    fontWeight: "bold",
  },
});
