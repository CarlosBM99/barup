import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    // ADD YOUR FIREBASE CREDENTIALS
    apiKey: "AIzaSyASl36A_6t0BQkhrZ22bu0Gu7v1xWj5jlM",
    authDomain: "barup-ca0f9.firebaseapp.com",
    databaseURL: "https://barup-ca0f9.firebaseio.com",
    projectId: "barup-ca0f9",
    storageBucket: "barup-ca0f9.appspot.com",
    messagingSenderId: "1060030692240"
  };

firebase.initializeApp(firebaseConfig);

const data = [
  /* { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
  // { key: 'K' },
  // { key: 'L' }, */
];

const numColumns = 3;
class listBars extends Component {
  
  constructor(props) {
    super(props);
    
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      st: false,
    }
  }
  static navigationOptions = { 
    headerTitle: "BarUp", 
    headerTintColor:"#fed849", 
    headerRight: <Icon style={{color: "#fed849" }} name="ios-star"/>, 
    headerTitleStyle: { color: '#fed849' }, 
    headerStyle:{ 
      paddingRight: 10, 
      paddingLeft: 5, 
      backgroundColor: 'black'
    }
  }

  renderItem = ({ item, index }) => {
    //console.log(item)
    //console.log("IN")
    //console.log(item.val().name)

    return (
      <View
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.val().name} <Icon name="beer"></Icon></Text>
      </View>
    );
  };
  componentDidMount() {

    var that = this

    firebase.database().ref('/bars').on('child_added', function (data) {

      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData,  st: true })

    })

  }
  
  /* getdata() {
    console.log("AAAAAAA")
    var a = []
    var count = 0
    var recentPostsRef = firebase.database().ref('/bars');
    //console.log(recentPostsRef)
    recentPostsRef.on("child_added", function(snapshot) {
      //count++;
      //console.log(snapshot.val(),count);
      //console.log("EEEE")
      a.push(snapshot.val())
      //console.log(a)
      return a
      //this.setState({ listViewData: snapshot.val() })
    })
    //console.log(this.state.stores)
    
    //console.log("OUTTTTTTTT")
    //console.log(a)
    
    //return data
  } */
  render() { 
    return (
      <FlatList
        data={this.state.listViewData}
        style={styles.container}
        renderItem={this.renderItem}
      />
    );
  }
}
export default listBars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginVertical: 20,
  },
  item: {
    backgroundColor: '#dce3ef',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'black',
  },
});