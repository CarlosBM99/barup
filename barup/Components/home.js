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
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-elements'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon,Input,Item,CheckBox,Body,ListItem, Content, Container} from 'native-base'
import { TabNavigator}  from 'react-navigation'
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
var {height, width} = Dimensions.get('window');

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
        st: 0,
        places: false
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
        youthful: 0,
        sport: 0
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
  async a(props,params){
    this.setState({
      loading: true
    });
    var key = firebase.database().ref('/status_search').push().key
    firebase.database().ref('/status_search').child(key).set({ id: key, it: params, state: 1 })
    fetch('https://0c296746.ngrok.io/barup/results.php?name='+key+'&run=true');
    var that = this
    var int = setInterval(() => {
      var ref = firebase.database().ref('/status_search/')
      ref.once("value")
        .then(function(snapshot) {
          var childKey = snapshot.child(key+'/state').val(); // "last"
          if(childKey === 1){
            that.setState({
              st: childKey,
          })
        }
        });
        if(this.state.st === 1){
          props.navigation.navigate('listBars')
          that.setState({
            loading: false,
            st: 0
          }) 
          firebase.database().ref('status_search/' + key).set(null)
          clearInterval(int);
        }
      
    }, 500);
    
    //key = firebase.database().ref('/status_search').push().key
    //firebase.database().ref('/status_search').child(key).set({ name: "AAAAAA" })
  }
  b(){
    firebase.database().ref('status_search/' + key).set(null)
  }
  c(props,params){
    var object = {
      "beer" : 2,
      "beerPrice" : "2.00",
      "billiards" : 1,
      "crowd" : "Medium",
      "darts" : 0,
      "football" : 1,
      "id" : 4,
      "location" : "Marina",
      "name" : "Can sorra",
      "rating" : 4
    }
  
    key = firebase.database().ref('/bars').push().key
    firebase.database().ref('/bars').child(key).set(object)
  }
  Places(){
    
    return (
      
      <View style={styles.box3}>
        <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                
                getDefaultValue={() => ''}
                
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyAWOG03GylQLc2J8fKA_v5rVjRW1KlRPU8',
                  language: 'en', // language of the results
                }}
                
                styles={{
                  textInputContainer: {
                    width: '100%'
                  },
                  description: {
                    fontWeight: 'bold'
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb'
                  }
                }}
                
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
                }}
          
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                predefinedPlaces={[homePlace, workPlace]}
          
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={()  => <Icon name="arrow-back" style={{fontSize:30}}onPress={() => { this.setState({places: false})}}/>}
                renderRightButton={() => <Icon name="ios-star"/>}
              /> 
      </View>
    )
    
  }
  rest(){
    return (
      <View style={styles.container}>

        <StatusBar barStyle="light-content"/>

        <View style={styles.searchCity}>
        <Item style={{backgroundColor:'white', paddingHorizontal: 10, borderRadius:10}}
                  onPress = { () => {this.setState({places: true})}}
                  >
              <Icon name="search" style={{fontSize: 30, paddingTop: 5}}/>
              <Text>Search for your city</Text>
              {/* <Icon name="locate" style={{fontSize: 30, paddingTop: 5}}/> */}
              
            </Item>  
        </View>

        <View style={{height:'25%'}}>
          <ListItem>
            <Text style={{fontWeight:"bold",fontSize:15}}>Bar Style</Text>
          </ListItem>
          
          <Content style={{width:"90%",alignSelf:'center'}}>
            <ListItem>
              <CheckBox checked={this.state.familiar} color="black" onPress={ () => this.setState({ familiar: !this.state.familiar })}/>
              <Body>
                <Text>   Familiar</Text>
              </Body>

              <CheckBox checked={this.state.youthful} color="black" onPress={ () => this.setState({ youthful: !this.state.youthful })}/>
              <Body>
                <Text>   Youthful</Text>
              </Body>
            </ListItem>
      
            <ListItem>
              <CheckBox checked={this.state.luxurious} color="black" onPress={ () => {this.setState({ luxurious: !this.state.luxurious ,
                }),this.params.style.luxurious = (!this.state.luxurious ? 1 : 0)}}/>
              <Body>
                <Text>   Luxurious</Text>
              </Body>

              <CheckBox checked={this.state.sport} color="black" onPress={ () => this.setState({ sport: !this.state.sport })}/>
              <Body>
                <Text>   Sport</Text>
              </Body>
            </ListItem>
          </Content>
        </View>

        <View style={{flex:1}}>
          <ListItem>
            <Text style={{fontWeight:"bold",fontSize:15}}>Order by</Text>
          </ListItem>

          <Content style={{height:'10%',width:"100%", alignSelf:"center"}}>
            <ListItem>
              <CheckBox checked={this.state.beerPrice} color="black" onPress={ () => this.setState({ beerPrice: !this.state.beerPrice })}/>
              <Body>
                <Text> Beer Price</Text>
              </Body>

              <CheckBox checked={this.state.rating} color="black" onPress={ () => this.setState({ rating: !this.state.rating })}/>
              <Body>
                <Text> Rating</Text>
              </Body>

              <CheckBox checked={this.state.crowdness} color="black" onPress={ () => this.setState({ crowdness: !this.state.crowdness })}/>
              <Body>
                <Text> Crowdness</Text>
              </Body>
            </ListItem>
          </Content>
        </View>

        <View style={{flexDirection:'row', justifyContent: 'center',
        alignItems: 'center',paddingVertical:"10%"}}>
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
        
        <View style={{height:"12%", marginTop:-10}}>
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
    )
  }
  render() {

    return (
      <View style={{flex:1}}>
      { this.state.places ? this.Places() :  this.rest()
          
      }
      
        </View>
      
        
    );
  }
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    borderColor: "#f49f44",
    borderWidth: 1,
    borderRadius: 10,
    width:"60%",
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerText: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
  badge: {
    padding: "5%",
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

  },
  box3: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  searchCity: {
    height: '15%',
    width:'70%',
    justifyContent: 'center',
    alignSelf: 'center',
  }
});