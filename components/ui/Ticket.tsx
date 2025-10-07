import { danger, dark, success, warning } from "@/constants/Colors";
import { TicketType } from "@/interfaces/ticket.interface";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function Ticket({
  ticket,
  onStateChange,
  onDelete,
  onRatingChange,
}: {
  ticket: TicketType;
  onStateChange: (newState: "created" | "ongoing" | "completed") => void;
  onDelete: () => void;
  onRatingChange: (rating: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState("");

  function ratingStars(rating: number) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i <= Number(rating) ? "star" : "star-border"}
          size={16}
          color={i <= Number(rating) ? warning : "#ccc"}
        />
      );
    }
    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  }

  return (
    <>
      <View style={{ ...styles.ticket, height: expanded ? 220 : 80 }}>
        <View style={styles.ticketHeader}>
          <View
            style={{
              ...styles.numberCircle,
              backgroundColor:
                ticket.status === "created"
                  ? danger + "44"
                  : ticket.status === "ongoing"
                  ? warning + "44"
                  : success + "44",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#999" }}>
              #{ticket.id}
            </Text>
          </View>
          <View
            onTouchStart={() => setExpanded(!expanded)}
            style={styles.ticketText}
          >
            <View style={styles.timeInfo}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                <MaterialIcons
                  name="calendar-month"
                  size={16}
                  color={styles.timeText.color}
                />
                <Text style={styles.timeText}>
                  {" " +
                    ticket.date.toLocaleDateString([], {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "28%",
                }}
              >
                <MaterialIcons
                  name="access-time"
                  size={16}
                  color={styles.timeText.color}
                />
                <Text style={styles.timeText}>
                  {" " +
                    ticket.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </Text>
              </View>
            </View>
            <Text style={styles.contentText}>
              {ticket.title || "Untitled ticket"}
            </Text>
            {!expanded && (
              <>
                {ticket.status === "completed" ? (
                  ratingStars(ticket.rating || 0)
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontStyle: "italic",
                      color: "#999",
                      marginBottom: -20,
                      marginTop: 10,
                    }}
                  >
                    touch to view details
                  </Text>
                )}
              </>
            )}
          </View>
          <Pressable style={styles.cancelCircle} onPress={onDelete}>
            <MaterialIcons name="trash" size={28} color={danger} />
          </Pressable>
        </View>
        {expanded && (
          <View style={styles.ticketDetails}>
            <Text>{ticket.text}</Text>
            {ticket.status === "created" ? (
              <View style={styles.ticketActions}>
                <Pressable
                  style={{ width: "50%" }}
                  onPress={() => onStateChange("ongoing")}
                >
                  <Text
                    style={{
                      ...styles.action,
                      color: warning,
                      backgroundColor: warning + "22",
                    }}
                  >
                    Mark Under Assistance
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.ticketActions}>
                <Pressable
                  style={{ width: "50%" }}
                  onPress={() => onStateChange("created")}
                >
                  <Text
                    style={{
                      ...styles.action,
                      color: danger,
                      backgroundColor: danger + "22",
                    }}
                  >
                    Revert
                  </Text>
                </Pressable>
                {ticket.status !== "completed" && (
                  <Pressable
                    style={{ width: "50%" }}
                    onPress={() => onStateChange("completed")}
                  >
                    <Text
                      style={{
                        ...styles.action,
                        color: success,
                        backgroundColor: success + "22",
                      }}
                    >
                      Mark Complete
                    </Text>
                  </Pressable>
                )}
              </View>
            )}
            {ticket.status === "completed" && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Enter rating..."
                  value={rating}
                  onChangeText={onRatingChange}
                />
                {ratingStars(ticket.rating || 0)}
              </View>
            )}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ticket: {
    borderRadius: 40,
    width: "100%",
    marginTop: 8,
    backgroundColor: "#f4f9ffff",
  },
  ticketHeader: {
    height: 80,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  numberCircle: {
    height: 60,
    width: 60,
    borderRadius: 40,
    backgroundColor: "white",
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ticketText: {
    marginLeft: 10,
    marginRight: -16,
  },
  cancelCircle: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: "white",
    marginLeft: "auto",
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  timeInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 4,
  },
  timeText: {
    color: "#999",
    fontSize: 14,
    width: "100%",
  },
  contentText: {
    color: dark,
    fontSize: 16,
    fontWeight: "500",
  },
  ticketDetails: {
    paddingInline: 12,
    width: "100%",
    height: "100%",
  },
  ticketActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    marginTop: 20,
  },
  action: {
    borderRadius: 40,
    height: 28,
    textAlign: "center",
    paddingBlock: 4,
    paddingInline: 12,
    width: "100%",
    fontWeight: 500,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 4,
    marginBlock: 15,
    width: 160,
  },
});
