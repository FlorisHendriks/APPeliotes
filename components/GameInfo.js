import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Image, View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//this component is for basic info display on home screen

export default function GameInfo({
  title,
  description,
  participants,
  slots,
  image,
  place,
  time,
  date,
  navigation,
  mode,
  id,
  isInvite
}) {
  return (
    <TouchableOpacity
      key={title + "_" + place + "_" + date + "_" + time}
      style={isInvite ? styles.containerInvites : styles.container}
      onPress={() => {
        navigation.navigate(
          "Event",
          {
            title: title,
            description: description,
            participants: participants,
            slots: slots,
            image: image,
            place: place,
            time: time,
            date: date,
            id: id,
            // navigation: navigation,
          },
          (navigation = navigation)
        );
      }}
    >
      <Image
        style={styles.eventImage}
        source={{ uri: image }}
        resizeMode="cover"
      />
      <View style={styles.eventInformation}>
        <View style={styles.basicInfo}>
          <View style={styles.basicInfoLeft}>
            <View style={styles.topHorizontal}>
              <Text style={styles.eventName}>{title}</Text>
            </View>
              <Text numberOfLines={2} >{description}</Text>
            <View style={styles.eventDifficulty}>
              <Text style={{ paddingRight: 5 }}>
                Available slots: {participants}/{slots}
              </Text>
            </View>
            <Text style={{ paddingRight: 5 }}>
                mode: {mode}
              </Text>
          </View>
          {isInvite ? <View style={styles.basicInfoRight}>
            <View style={styles.topHorizontal}>
              <Text style={styles.invite}>INVITED</Text>
            </View>
          </View>: null}
        </View>
        <View style={styles.eventTimeInfo}>
          <TouchableOpacity style={styles.eventTimeContainer}>
            <MaterialCommunityIcons
              name="map-marker"
              color={theme.colors.main}
              size={25}
            />
            <Text style={styles.eventTimeName}>{place}</Text>
          </TouchableOpacity>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateText}>{date}</Text>
            <Text style={styles.eventDateText}>{time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "lightgray",
    flexDirection: "row",
    width: 100 + "%",
    overflow: "hidden",
    marginBottom: 10,
    maxHeight: 170,
  },
  containerInvites: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "orange",
    flexDirection: "row",
    width: 100 + "%",
    overflow: "hidden",
    marginBottom: 10,
    maxHeight: 170,
    // backgroundColor: "#FFD580"
  },
  eventImage: {
    flex: 3,
    maxHeight: 170,
    maxWidth: 150,
  },
  eventInformation: {
    flex: 7,
    justifyContent: "space-between",
  },
  basicInfo: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  basicInfoRight: {
    // justifyContent: "space-between",
    // flexDirection: "row",
    // alignItems: "flex-end",
    // borderColor: "orange",
    // borderWidth: 1,
    maxHeight: 30
  },
  basicInfoLeft: {
    flex: 2,
  },
  eventTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eventTimeName: {
    marginLeft: 5,
    fontWeight: "300",
    fontSize: 12,
  },
  eventTimeInfo: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventDateText: {
    fontWeight: "200",
    fontSize: 12,
    color: "gray",
    alignSelf: "center",
  },
  eventName: {
    fontWeight: "500",
    fontSize: 21,
  },
  eventDifficulty: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionsButton: {
    transform: [{ rotate: "90deg" }],
  },
  topHorizontal: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItem: {
    borderWidth: 1,
    borderColor: "lightgray",
  },
  invite: {
    color: "orange",
    borderColor: "orange",
    borderWidth: 1,
    padding: 3,
    borderRadius: 10
  },
});