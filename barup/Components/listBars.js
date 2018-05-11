import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native';
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
      listViewData: data
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
    },
    headerBackTitle: null,
  }
  goToNextScreen = () => {
    const { navigate } = this.props.navigation;
    return navigate('Detail');
  }

  renderItem = ({ item }) => {
    //function to go to next screen
    return (
      //<View style={styles.item}>
      <TouchableHighlight onPress={() => this.goToNextScreen()}>
      <Card style={{flex:1}}>
        <CardItem style={{marginBottom:-20}}>
          <Image source={require('../assets/bar1.jpg')} style={styles.imag}/>
          <Body style={{paddingLeft: 10}}>
            <Text>{item.val().name}</Text>
            <Text style={{marginTop: 10}}>Location</Text>
            <Item style={{marginTop: 10}}>
              <Icon name="beer"/>
              <Icon name="beer"/>
              <Icon name="beer"/>
              <Icon name="beer"/>
            </Item>
          </Body>
          <Right style={{marginTop:-50, marginRight:10}}>
            <Icon style={{fontSize: 40, color: 'black'}} name="star"/>
          </Right>
        </CardItem>
        <CardItem style={{flex:1,marginTop:0, height:45}}>
          <View style={{flex:1,flexDirection:'row', justifyContent: 'center',
      alignItems: 'center'}}>
              <View style={{flexDirection:'row'}}>
                <Item style={{height:36, width:36}} rounded>
                  <Icon style={{fontSize: 20, color: 'red'}} name="pizza"/>
                </Item>
                <Item style={{height:36, width:36}} rounded>
                  <Icon style={{fontSize: 20, color: 'green'}} name="eye"/>
                </Item>
                <Item style={{height:36, width:36}} rounded>
                  <Icon style={{fontSize: 20, color: 'blue'}} name="home"/>
                </Item>
                </View>

            <View style={{flex:1,flexDirection:'row', justifyContent: 'center',
        alignItems: 'center', marginLeft:10}}>
              <Text style={{marginLeft:10,fontSize:20}}> 1,45€ 
              </Text><Text style={{fontSize:13,marginRight:25,marginTop:10}}>/Beer</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'center',
      alignItems: 'center'}}>
              <Text style={{fontSize:20}}>
                Full
              </Text>
              <Icon style={{marginLeft:5}} name="information-circle"/>
            </View>
          </View>
        </CardItem>
      </Card>
      </TouchableHighlight>
    );
  };
  componentDidMount() {
    var that = this
    var newData = [...that.state.listViewData]
    var ref = firebase.database().ref('/bars') 
    ref.on("child_added", function(snapshot) {
      newData.push(snapshot)
      that.setState({ listViewData: newData})
    })
  }
  componentWillUnmount(){
    this.setState({ listViewData: data})
  }
  render() { 
    return (
      <FlatList
        data={this.state.listViewData}
        style={styles.container}
        renderItem={this.renderItem}
      />
    )
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
    //height: (Dimensions.get('window').width / numColumns) + 20, // approximate a square
  },
  imag:{
    flex: 1,
    height: 100, 
    width: 100
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'black',
  },
});