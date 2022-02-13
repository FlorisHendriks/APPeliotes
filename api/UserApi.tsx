import { firebase } from "./Firebaseinit";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { getAuth, prodErrorMap } from "firebase/auth";
import { arrayRemove, arrayUnion } from "firebase/firestore";

  var _userLocation = "";
  var _userType = "";
  export var userJoinedEvents = [];
  var _friends = [];
  var _displayNames = [];
  var _displayNamesDocs = [];
  
  export async function getUserData()
  {
    const currentUser = getAuth().currentUser;
    console.log("user: " + currentUser.uid);
      const userEmail = currentUser.email;
      const doc = await firebase.firestore().collection("users").doc(userEmail).get();
      const docData = doc.data();
      _userLocation = docData.location;
      _userType = docData.userType;
      _friends = docData.friends;
      
      await firebase.firestore().collection("events")
      .where("participantsUIDs", "array-contains", currentUser.uid)
      .get()
      .then((docs) => {
        docs.forEach((d) => {
          if(!userJoinedEvents.includes(d.id))
            userJoinedEvents.push(d.id)
        })
      })
      .catch((error) => console.log(error))
  }
  
  export async function getUserLocation()
  {
    if(_userLocation == "")
      await getUserData();
    return _userLocation;
  }
  
  export async function getUserType()
  {
    if(_userType == "")
      await getUserData();
    return _userType;
  }
  
  export async function createUser(email, displayName, uid)
  {
    return await firebase.firestore().collection("users").doc(email.toLowerCase()).set({
      location: "Nijmegen",
      userType: "free",
      displayName: displayName,
      uid: uid,
      friends: []
    });
  }

  export async function userLogout()
  {
    _userLocation = "";
    _userType = "";
    userJoinedEvents = [];
    _friends = [];
    _displayNames = [];
    _displayNamesDocs = [];
    await getAuth().signOut();
  }
  
  export async function changeUserType(type)
  {
      return await firebase.firestore().collection("users").doc(getAuth().currentUser.email).update({
          userType: type
      }).then(() => _userType = type);
  }
  
  export async function changeLocation(location)
  {
      return await firebase.firestore().collection("users").doc(getAuth().currentUser.email).update({
          location: location
      }).then(() => _userLocation = location);
  }
  
  export async function changePassword(newPassword)
  {
    return await firebase.auth().currentUser.updatePassword(newPassword);
  }

  export async function isUserJoined(event)
  {
    await getUserData();
    return userJoinedEvents.includes(event);
  }

  export function removeEvent(event)
  {
    const events = userJoinedEvents.filter((e) => e != event);
    userJoinedEvents = events;
  }

  export function addEvent(event)
  {
    userJoinedEvents.push(event);
  }

  export async function getMyEventsCount()
  {
    if(userJoinedEvents.length == 0)
    {
      await getUserData()
    }
    return userJoinedEvents.length;
  }
    export async function getFriends(){
    await getUserData();
    console.log(_friends);
    return _friends;
  }

  /*export async function getDisplayNames(friends){
    _displayNames= [];
    _displayNamesDocs=[];

    var results: namesOrdered[] = await Promise.all(friends.map(async (friend): Promise<namesOrdered> => 
    await firebase
    .firestore()
    .collection("users")
    .where("uid", "==", friend)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        console.log("friend");
        _displayNamesDocs.push({ id: documentSnapshot.id, ...documentSnapshot.data()});
      });
    })))
    _displayNamesDocs.map((doc) => {
      _displayNames.push(doc.displayName);
    })
    console.log(_displayNames);
    return _displayNames;
}*/

  export async function getFriendSearch(query) {
    var newEvents = [];
    
    const _userLocation = await getUserLocation();
    const ref = firebase
    .firestore()
    .collection("events")
    .where("place", "==", _userLocation);
      await ref
      .where("title", ">=", query)
      .where("title", "<=", query + "~")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          newEvents.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      })
      //.catch((text) => console.log(text));
  
    return newEvents;
  
  }

  export async function getDisplayNames2(){
    _displayNames= [];
    _displayNamesDocs=[];
    await firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        _displayNamesDocs.push({ id: documentSnapshot.id, ...documentSnapshot.data()});
      });
    })
    _displayNamesDocs.map((doc) => {
      _displayNames.push(doc.displayName);
    })
    console.log(_displayNames);
    return _displayNames;
  }

  export async function deleteFriend(uid){
    const currentUser = getAuth().currentUser.email;
    const docToUpdate = firebase.firestore().collection("users").doc(currentUser);
    const res = await docToUpdate.update({
      friends: arrayRemove(uid)
    })
    return;
  }

  export async function addFriend2(uid){
    const currentUser = getAuth().currentUser.email;
    const docToUpdate = firebase.firestore().collection("users").doc(currentUser);
    const res = await docToUpdate.update({
      friends: arrayUnion(uid)
    })
    return;
  }

  export async function getUid(_name){
    _displayNames= [];
    _displayNamesDocs=[];
    await firebase
    .firestore()
    .collection("users")
    .where("displayName", "==", _name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        console.log("friend");
        _displayNamesDocs.push({ id: documentSnapshot.id, ...documentSnapshot.data()});
      });
    })
    return _displayNamesDocs[0];
  }