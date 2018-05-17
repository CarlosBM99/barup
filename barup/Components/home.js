import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon,Input,Item,CheckBox,Body,ListItem, Content, Container} from 'native-base'
import { TabNavigator}  from 'react-navigation'
import SegmentedControlTab from 'react-native-segmented-control-tab';

const dartCheck = require('../assets/dart_check.png');
const dartUncheck = require('../assets/dart.png');
const footballCheck = require('../assets/football_check.png');
const footballUncheck = require('../assets/football.png');
const billiardsCheck = require('../assets/billiards_check.png');
const billiardsUncheck = require('../assets/billiards.png');

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

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showDarts: false,
        showFootball: false,
        showBilliards: false,
        familiar: false,
        youthful: false,
        luxurious: false,
        beerPrice: false,
        rating: false,
        crowdness: false,
        loading: false,
        st: 0
    }
    this.params = {
      badgets: {
        billards: 0,
        darts: 0,
        table_football: 0
      },
      order: {
        beer_prace: 0,
        crowdness: 0,
        rating: 0
      },
      style: {
        familiar: 0,
        luxurious: 0,
        youthful: 0
      }
    }
  }
  renderDarts()  {
    var tempDarts = this.state.showDarts? dartCheck : dartUncheck;
    return (
      <Image
        style={ styles.badge }
        source={ tempDarts }
      />
    );
  }

  renderFootball()  {
    var tempFootball = this.state.showFootball? footballCheck : footballUncheck;
    return (
      <Image
        style={ styles.badge }
        source={ tempFootball }
      />
    );
  }

  renderBilliards()  {
    var tempBilliards = this.state.showBilliards? billiardsCheck : billiardsUncheck;
    return (
      <Image
        style={ styles.badge }
        source={ tempBilliards }
      />
    );
  }
  
/****TEMP****/
  onPressButton() {
    Alert.alert('You tapped the button!')
  }
/************/

  static navigationOptions = {
    title: "BarUp",
    headerRight: <Icon style={{ paddingRight: 10, color: "#fed849" }} name="ios-star"/>,
    headerStyle : { backgroundColor: 'black' },
    headerTitleStyle: { color: '#fed849' },
    headerBackTitle: null,
  }
  a(props,params){
    this.setState({
      loading: true
    });
    console.log(params,"AAAAAAA")
    var key = firebase.database().ref('/status_search').push().key
    firebase.database().ref('/status_search').child(key).set({ id: key, it: params, state: 1 })
    var that = this
    var int = setInterval(() => {
      //console.log("a")
      var ref = firebase.database().ref('/status_search/')
      ref.once("value")
        .then(function(snapshot) {
          var childKey = snapshot.child(key+'/state').val(); // "last"
          console.log(childKey)
          if(childKey === 1){
            that.setState({
              st: childKey,
          })
        }
        });
        if(this.state.st === 1){
          props.navigation.navigate('listBars',{listViewData: ["A"]})
          that.setState({
            loading: false,
            st: 0
          }) 
          firebase.database().ref('status_search/' + key).set(null)
          clearInterval(int);
        }
      
    }, 500);
    
    console.log("IN")
    //key = firebase.database().ref('/status_search').push().key
    //firebase.database().ref('/status_search').child(key).set({ name: "AAAAAA" })
  }
  b(){
    console.log("OUT")
    console.log(key)
    firebase.database().ref('status_search/' + key).set(null)
  }
  render() {

    return (
      <View style={{flex:1, padding:50}}>
      <StatusBar barStyle="light-content"/>
          <View style={{flex:1, marginLeft:5}}>
            <Item style={{backgroundColor:'white', paddingHorizontal: 10, borderRadius:10}}>
              <Icon name="search" style={{fontSize: 20, paddingTop: 5}}/>
              <Input placeholder="Search for your city"/>
              <Icon name="locate" style={{fontSize: 30, paddingTop: 5}}/>
            </Item>  
            

        <ListItem style={{marginLeft:"-5%", marginTop:"10%"}}>
          <Text style={{fontWeight:"bold",fontSize:15}}>Bar Style</Text>
        </ListItem>
        <Content style={{width:"130%", marginLeft:"-15%"}}>
          <ListItem>
            <CheckBox checked={this.state.familiar} color="black" onPress={ () => this.setState({ familiar: !this.state.familiar })}/>
            <Body>
              <Text>   Familiar</Text>
            </Body>

            <CheckBox checked={this.state.youthful} color="black" onPress={ () => {this.setState({ youthful: !this.state.youthful 
                                                                                  })
                                                                                  this.params.style.youthful = 1}}/>
            <Body>
              <Text>   Youthful</Text>
            </Body>

            <CheckBox checked={this.state.luxurious} color="black" onPress={ () => this.setState({ luxurious: !this.state.luxurious })}/>
            <Body>
              <Text>   Luxurious</Text>
            </Body>
          </ListItem>
        </Content>

      <Container style={{marginTop:"-30%"}}>
        <ListItem style={{marginLeft:"-5%"}}>
          <Text style={{fontWeight:"bold",fontSize:15}}>Order by</Text>
        </ListItem>
        <Content style={{width:"130%", marginLeft:"-15%"}}>
          <ListItem>
            <CheckBox checked={this.state.beerPrice} color="black" onPress={ () => this.setState({ beerPrice: !this.state.beerPrice })}/>
            <Body>
              <Text>   Beer Price</Text>
            </Body>

            <CheckBox checked={this.state.rating} color="black" onPress={ () => this.setState({ rating: !this.state.rating })}/>
            <Body>
              <Text>   Rating</Text>
            </Body>

            <CheckBox checked={this.state.crowdness} color="black" onPress={ () => this.setState({ crowdness: !this.state.crowdness })}/>
            <Body>
              <Text>   Crowdness</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>

    <View style={{flexDirection:'row', justifyContent: 'center',
    alignItems: 'center', paddingVertical:"10%"}}>
          <TouchableOpacity
            onPress={ () => this.setState({ showDarts: !this.state.showDarts }) } 
          >
            {this.renderDarts()}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => this.setState({ showFootball: !this.state.showFootball }) } 
          >
            {this.renderFootball()}

          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => this.setState({ showBilliards: !this.state.showBilliards }) } 
          >
            {this.renderBilliards()}
          </TouchableOpacity>
    </View>
        {
          this.state.loading === false ? 
          <Button
            large
            onPress={() => this.a(this.props,this.params) }            
            //onPress={() => this.props.navigation.navigate('listBars',{listViewData: ["A"], st:true})  }
            title="Search Bars"
            buttonStyle={styles.button}
            
          /> :
              <View style={styles.loader}>
                <Text>Loading</Text>
                <ActivityIndicator
                  animating={this.state.loading} />
              </View>
        }
        </View>
        </View>
    );
  }
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: "black",
    borderColor: "#f49f44",
    borderWidth: 1,
    borderRadius: 10,
  },
  headerText: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
  badge: {
    padding: 50,
    marginBottom: "10%",
    height:100,
    width:100,
    alignSelf:'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#000',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  loader:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    height:100,
    width:100,
    borderRadius: 10,
    backgroundColor: '#5555'

  }
});