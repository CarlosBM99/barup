import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'

var {height, width} = Dimensions.get('window');

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
      refreshing: false,
      loaging: false,
      firstKnownKey: null
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

  goToNextScreen(item){
    const { navigate } = this.props.navigation;
    return navigate('Detail',{ info: item});
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
  makeRemoteRequest = () => {
    var that = this
    that.setState({loading: true})
    //console.log(that.state.firstKnownKey)    
    var newData = [...that.state.listViewData]
    var ref = firebase.database().ref('/bars')
    ref.orderByKey().limitToFirst(4).on('child_added', function(childSnapshot, prevChildKey) {
      //console.log(childSnapshot.val())
      that.state.firstKnownKey = childSnapshot.key;
      console.log("KEY:",that.state.firstKnownKey)
      newData.push(childSnapshot)
    },
    that.setState({ listViewData: newData, refreshing: false, loading: false}));
  }
  makeRemoteRequest2 = () => {
    var that = this
    that.setState({loading: true})
    //console.log(that.state.firstKnownKey) 
    var f = that.state.firstKnownKey   
    var newData = [...that.state.listViewData]
    var ref = firebase.database().ref('/bars')
    ref.orderByKey().startAt(that.state.firstKnownKey).limitToFirst(5).on('child_added', function(childSnapshot, prevChildKey) {
      that.state.firstKnownKey = childSnapshot.key;
      if(f !== that.state.firstKnownKey){
        console.log("CHILD: ", childSnapshot.key)
        newData.push(childSnapshot)
      } else {
        that.setState({ listViewData: newData, refreshing: false, loading: false})
      }
    },
    that.setState({ listViewData: newData, refreshing: false, loading: false}));
    console.log(this.state.refreshing)
  }
  
  componentDidMount() {
    var that = this
    that.makeRemoteRequest()
  }

  handleLoadMore = () => {
    var that = this 
    that.setState({
      refreshing: true
    }, () => {
      setTimeout(function(){that.makeRemoteRequest2()},2000)
    })
  }
  renderItem = ({ item }) => {
    return (
      <TouchableHighlight onPress={() => this.goToNextScreen(item)}>
        <View style={[{ width: (width) }, { height: (height) / 5 }, { marginBottom: 0 }, { paddingVertical: 0 }]}>
          <Card style={styles.card}>
            <View style={styles.ib}>
              <Image style={styles.listImg} source={ barImages[2] } />
              <View style={styles.badges}>
                {this.renderDartsBadge(item)}
                {this.renderFootballBadge(item)}
                {this.renderBilliardsBadge(item)}
              </View>
            </View>
            <View style={styles.info}>
              <Text style={{flex:1,fontSize:20}}>{item.val().name}</Text>
              <Text style={{flex:1,fontSize:20}}>{item.val().location}</Text>
              <Item style={{flex:1}}>
                <Icon style={{fontSize:(((width)/100)+10)}} name="beer"/>
                <Icon style={{fontSize:(((width)/100)+10)}} name="beer"/>
                <Icon style={{fontSize:(((width)/100)+10)}} name="beer"/>
                <Icon style={{fontSize:(((width)/100)+10)}} name="beer"/>
              </Item>
              <Text style={{flex:1,fontSize:(((width)/100)+10)}}>{item.val().beerPrice}€</Text>

            </View>
            <View styles={styles.more}>
              <Icon style={{flex:1,fontSize: 40, color: 'black'}} name="star"/>
              <Text style={{flex:1}}>{item.val().crowd}</Text> 
            </View>
          </Card>
        </View> 
      </TouchableHighlight>
      
    );
  };
  render() { 
    return (
      <View style={styles.container}>
      <FlatList
        backgroundColor="white"
        data={this.state.listViewData}
        
        renderItem={this.renderItem}
        refreshing={this.state.refreshing}
        //onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={1}
        ListFooterComponent={() => { // replaces renderFooter={() => {
          if(this.state.refreshing){
            return (
            <View style={{ flex: 1, padding: 10 }}>
              <ActivityIndicator size="large" />
            </View> 
            );
          }
          else {
            return null
          }
        }}
      />
      </View>
    )
  }
}
export default listBars;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    height:100,
    width:100,
  },
  listImg: {
    width: '100%',
    height: '70%',
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: 'black',
  },
  ib: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',    
    alignItems: 'center',
    padding: 2,
    margin: 2
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  badges: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  info:{
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',    
    alignItems: 'flex-start',
  },
  more: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',    
    alignItems: 'flex-end',
  }
});