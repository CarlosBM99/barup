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

const data = [];

dartBadge = require('../assets/dart_badge.png');
footballBadge = require('../assets/football_badge.png');
billiardsBadge = require('../assets/billiards_badge.png');
emptyBadge = null;

barImages = [
  require('../assets/bar1.jpg'),
  require('../assets/bar2.jpg'),
  require('../assets/bar3.jpg'),
  require('../assets/bar4.jpg'),
  require('../assets/bar5.jpg'),
]

const numColumns = 3;
class listBars extends Component {
  
  constructor(props) {
    super(props);
    
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
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

  renderDartsBadge(item)  {
    showDartBadge = item.val().darts;
    var tempDartBadge = showDartBadge? dartBadge : emptyBadge;
    return (
      <Image
        style={{height:34, width:34}} 
        source={ tempDartBadge }
      />
    );
  }

  renderFootballBadge(item)  {
    showFootballBadge = item.val().football;
    var tempFootballBadge = showFootballBadge? footballBadge : emptyBadge;
    return (
      <Image
        style={{height:34, width:34}} 
        source={ tempFootballBadge }
      />
    );
  }

  renderBilliardsBadge(item)  {
    showBilliardsBadge = item.val().billiards;
    var tempBilliardsBadge = showBilliardsBadge? billiardsBadge : emptyBadge;
    return (
      <Image
        style={{height:34, width:34}} 
        source={ tempBilliardsBadge }
      />
    );
  }

  renderBarImage(item)  {
    var barID = item.val().id;
    return (
      <Image source={barImages[barID]} style={styles.imag}/>
    );
  }

  renderItem = ({ item }) => {
    //function to go to next screen
    return (
      //<View style={styles.item}>
      <TouchableHighlight onPress={() => this.goToNextScreen()}>
      <Card style={{flex:1}}>
        <CardItem style={{marginBottom:-20}}>
          {this.renderBarImage(item)}
          <Body style={{paddingLeft: 10}}>
            <Text style={{fontWeight:'bold', fontSize:17}}>{item.val().name}</Text>
            <Text style={{marginTop: 10}}>{item.val().location}</Text>
            <Item style={{marginTop: 10}}>
              <Icon name="beer"/>
              <Icon name="beer"/>
              <Icon name="beer"/>
              <Icon name="beer"/>
            </Item>
          </Body>
          <Right style={{marginTop:-50}}>
            <Icon style={{fontSize: 40, color: 'black'}} name="star"/>
          </Right>
        </CardItem>
        <CardItem style={{flex:1,marginTop:0, height:45}}>
          <View style={{flex:1,flexDirection:'row', justifyContent: 'center',
      alignItems: 'center'}}>
              <View style={{flexDirection:'row', marginHorizontal:"2%"}}>
                {this.renderDartsBadge(item)}
                {this.renderFootballBadge(item)}
                {this.renderBilliardsBadge(item)}
                </View>

            <View style={{flex:1,flexDirection:'row', justifyContent: 'center',
        alignItems: 'center', marginLeft:10}}>
              <Text style={{marginLeft:10,fontSize:20}}> {item.val().beerPrice}€
              </Text><Text style={{fontSize:13,marginRight:25,marginTop:10}}> /Beer</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent: 'center',
      alignItems: 'center'}}>
              <Text style={{fontSize:20}}>
                {item.val().crowd}
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
        backgroundColor="black"
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