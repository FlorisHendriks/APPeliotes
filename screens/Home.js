import React, { useState } from "react";
// import { Button, View } from 'react-native'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import Background from "../components/Background";
import GameInfo from "../components/GameInfo";
import Button from "../components/Button";
import TextInput from "../components/TextInput.js";
import { TextInput as Input } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../core/theme";
import { Searchbar } from "react-native-paper";

//we don't yet have firebase connection therefore I created a static var that includes 8 events
const loremDescription =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel sem sem. Integer neque libero, eleifend nec ullamcorper porttitor, porta consectetur urna. Mauris ullamcorper sem in dolor consectetur fermentum. Curabitur at erat eu sapien sodales commodo. Cras tempus, lorem et fermentum tempus, massa quam tristique elit, vel dictum elit urna at tortor. Quisque pharetra quam bibendum maximus ultrices. Pellentesque suscipit lacus ut ex accumsan, a cursus mauris volutpat. Suspendisse at tristique turpis. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Curabitur suscipit at.";
const events = [
  {
    id: 1,
    title: "Monopoly",
    description: "Monopoly Game",
    participants: 2,
    image: require("../assets/monopoly.jpg"),
    place: "Nijmegen",
    time: "13:30",
    date: "11/30/2021",
    slots: 6,
  },
  /*{
    id: 2,
    title: "Gloomhaven",
    description: "Gloomhaven Game",
    participants: 6,
    image: require("../assets/gloomhaven.jpg"),
    place: "Nijmegen",
    time: "18:00",
    date: "11/30/2021",
    slots: 8,
  },
  {
    id: 3,
    title: "Board Game 1",
    description: "Board Game 1 Game",
    participants: 0,
    image: require("../assets/boardGame_2.jpg"),
    place: "Nijmegen",
    time: "08:30",
    date: "11/30/2021",
    slots: 4,
  },
  {
    id: 4,
    title: "Board Game 2",
    description: "Board Game 2 Game",
    participants: 1,
    image: require("../assets/boardGame_3.jpg"),
    place: "Nijmegen",
    time: "13:00",
    date: "11/30/2021",
    slots: 10,
  },
  {
    id: 5,
    title: "Board Game 3",
    description: "Board Game 3 Game",
    participants: 3,
    image: require("../assets/boardGame_1.jpg"),
    place: "Nijmegen",
    time: "13:30",
    date: "11/30/2021",
    slots: 4,
  },
  {
    id: 6,
    title: "Board Game 4",
    description: "Board Game 4 Game",
    participants: 2,
    image: require("../assets/boardGame_4.jpg"),
    place: "Nijmegen",
    time: "13:30",
    date: "11/30/2021",
    slots: 3,
  },
  {
    id: 7,
    title: "Board Game 5",
    description: "Board Game 5 Game",
    participants: 5,
    image: require("../assets/boardGame_3.jpg"),
    place: "Nijmegen",
    time: "13:30",
    date: "11/30/2021",
    slots: 7,
  },
  {
    id: 8,
    title: "Board Game 6",
    description: "Board Game 6 Game",
    participants: 0,
    image: require("../assets/boardGame_2.jpg"),
    place: "Nijmegen",
    time: "13:30",
    date: "11/30/2021",
    slots: 6,
  },*/
];

//this is for Home screen for now this only returns those 8 events manually
export default function Home({ navigation }) {
  const [search, setSearch] = useState("");
  const onChangeSearch = (query) => setSearch(query);
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={search}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {events.map((event) => {
            return (
              <GameInfo
                title={event.title}
                key={event.id}
                description={loremDescription}
                participants={event.participants}
                image={event.image}
                place={event.place}
                time={event.time}
                slots={event.slots}
                date={event.date}
                navigation={navigation}
              ></GameInfo>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "110%",
    paddingTop: StatusBar.currentHeight / 2,
  },
  searchContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    marginBottom: 10,
  },
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 42,
  },
  searchInput: {
    flex: 4,
  },
  searchButton: {
    flex: 1,
    // borderRadius: 10,
  },
});