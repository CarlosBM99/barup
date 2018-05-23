import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight, ActivityIndicator, Platform, PixelRatio  } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'

var {height, width} = Dimensions.get('window');
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
  }
}

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
        <View style={[{ width: (width) }, { height: (height) / 4 }, { marginBottom: 0 }, { paddingVertical: 0 }]}>
          <Card style={styles.card}>
            <View style={styles.first}>
              <View style={styles.barFoto}>
              </View>
              <View style={styles.barStyle}>
              </View>
              <View style={styles.barBadge}>
              </View>
            </View>
            <View style={styles.second}>
              
            </View>
            <View style={styles.third}>
              <View style={styles.fav}>
              
              </View >
              <View style={styles.crowd}>
                <Image style={styles.img} source={require('../assets/beer/beer1.png')}/>
              </View >
              
            </View >
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
  card: {
    flex: 1,
    flexDirection: 'row',
  },
  first: {
    width: "30%",
    height: '100%',
  },
  second: {
    width: "50%",
    height: '100%',    
    backgroundColor: "blue"
  },
  third: {
    width: "20%",
    height: '100%',
  },
  barFoto:{
    width: "100%",
    height: '50%',
    backgroundColor: "yellow"
  },
  barStyle: {
    width: "100%",
    height: '20%',
    backgroundColor: "blue"
  },
  barBadge: {
    width: "100%",
    height: '30%',
    backgroundColor: "red"
  },
  fav: {
    width: "100%",
    height: '35%',
    backgroundColor: "red"
  },
  crowd: {
    width: "100%",
    height: '65%',
    backgroundColor: "pink",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  img: {
    flex:1,
    resizeMode: 'contain',
  }
});