import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar, ListView, Image, TouchableOpacity, FlatList, Dimensions, TouchableHighlight, ActivityIndicator, Platform, PixelRatio  } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'
import RF from "react-native-responsive-fontsize";
import { Rating } from 'react-native-elements';

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
beerImages = [
  require('../assets/beer/beer1.png'),
  require('../assets/beer/beer2.png'),
  require('../assets/beer/beer3.png'),
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
      firstKnownKey: null,
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

  renderDartsBadge(info)  {
    showDartBadge = info.val().darts;
    var tempDartBadge = showDartBadge? dartBadge : dartUnbadge;
    return (
      <Image
        style={styles.bdg} 
        source={ tempDartBadge }
      />
    );
  }

  renderFootballBadge(info)  {
    showFootballBadge = info.val().football;
    var tempFootballBadge = showFootballBadge? footballBadge : footballUnbadge;
    return (
      <Image
        style={styles.bdg} 
        source={ tempFootballBadge }
      />
    );
  }

  renderBilliardsBadge(info)  {
    showBilliardsBadge = info.val().billiards;
    var tempBilliardsBadge = showBilliardsBadge? billiardsBadge : billiardsUnbadge;
    return (
      <Image
        style={styles.bdg} 
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
    ref.orderByKey().limitToFirst(6).on('child_added', function(childSnapshot, prevChildKey) {
      //console.log(childSnapshot.val())
      that.state.firstKnownKey = childSnapshot.key;
      //console.log("KEY:",that.state.firstKnownKey)
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
    ref.orderByKey().startAt(that.state.firstKnownKey).limitToFirst(7).on('child_added', function(childSnapshot, prevChildKey) {
      that.state.firstKnownKey = childSnapshot.key;
      if(f !== that.state.firstKnownKey){
        //console.log("CHILD: ", childSnapshot.key)
        newData.push(childSnapshot)
      } else {
        that.setState({ listViewData: newData, refreshing: false, loading: false})
      }
    },
    that.setState({ listViewData: newData, refreshing: false, loading: false}));
    console.log(this.state.refreshing)
  }
  
  componentDidMount() {
      this.makeRemoteRequest() 
  }

  handleLoadMore = () => {
    var that = this 
    that.setState({
      refreshing: true
    }, () => {
      setTimeout(function(){that.makeRemoteRequest2()},2000)
    })
  }

  getCrowd(pred){
    if(pred === 0){
      return beerImages[0]
    } else if (pred === 1){
      return beerImages[1]      
    } else {
      return beerImages[2]      
    }
  }
  renderItem = ({ item }) => {
    var listAmbient = ["Familiar", "Youthful", "Luxurious", "Sport"];
    var nAmbient = item.val().atmosphere - 1;
    return (
      <TouchableHighlight onPress={() => this.goToNextScreen(item)}>
        <View style={[{ width: (width) }, { height: (height) / 4 }, { marginBottom: 0 }, { paddingVertical: 0 }]}>
          <Card style={styles.card}>
            <View style={styles.first}>
              <View style={styles.barFoto}>
                <Image style={styles.imgBar} source={{uri:"https://firebasestorage.googleapis.com/v0/b/barup-ca0f9.appspot.com/o/images%2Fbar2.jpg?alt=media&token=bc93eb25-83e3-4ad1-8e09-a586d33a8fc1"}}/>
              </View>
              <View style={styles.barStyle}>
                <Text style={{fontSize:RF(3.3),color:'black'}}>{listAmbient[nAmbient]}</Text>
              </View>
              <View style={styles.barBadge}>
                {this.renderDartsBadge(item)}
                {this.renderFootballBadge(item)}
                {this.renderBilliardsBadge(item)}
              </View>
            </View>
            <View style={styles.second}>
              <View style={styles.name}>
                <Text style={{fontSize:RF(3)}}>{item.val().name}</Text>                
              </View>
              <View style={styles.location}>
                <Text style={{fontSize:RF(2.5)}}>Marina</Text>                
              </View>
              <View style={styles.rating}>
                <Rating
                  fractions={1}
                  startingValue={item.val().rating}
                  readonly
                  imageSize={25}
                  onFinishRating={this.ratingCompleted}
                  style={{backgroundColor:'#000'}} 
                />               
              </View>
              <View style={styles.price}>
                <Text style={{fontSize:RF(4)}}>{item.val().beerPrice}€
                  <Text style={{fontSize:RF(3.1)}}>/Beer</Text> 
                </Text> 
                               
                
              </View>
            </View>
            <View style={styles.third}>
              <View style={styles.fav}>
                <Icon style={{fontSize:RF(6)}} name="ios-star"/>
              </View >
              <View style={styles.textCrowd}>
                <Text style={{fontSize:RF(1.5)}}>Crowd level</Text>
              </View >
              <View style={styles.crowd}>
                <Image style={styles.icobeer} source={this.getCrowd(item.val().prediction)}/>
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
        onEndReachedThreshold={0}
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
    backgroundColor: '#ded4d4',
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
    backgroundColor: 'white'
  },
  first: {
    width: "30%",
    height: '100%',
    
  },
  second: {
    width: "50%",
    height: '100%',   
  },
  third: {
    width: "20%",
    height: '100%',
  },
  barFoto:{
    width: "100%",
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barStyle: {
    width: "100%",
    height: '20%',
    backgroundColor: "orange",
    alignItems: 'center',
    justifyContent: 'center',
  },
  barBadge: {
    width: "100%",
    height: '30%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fav: {
    width: "100%",
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCrowd: {
    width: "100%",
    height: '10%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  crowd: {
    width: "100%",
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7
  },
  icobeer: {
    flex:1,
    resizeMode: 'contain',
  },
  imgBar: {
    flex: 1,
    width: "100%",
    height: '50%',
    resizeMode: 'cover',
  },
  name: {
    width: "100%",
    height: '30%', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    width: "100%",
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    width: "100%",
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    width: "100%",
    height: '30%', 
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  bdg:{
    flex:1,
    resizeMode: 'contain',
  }

});