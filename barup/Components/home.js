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
  Switch
} from 'react-native';
import {Button} from 'react-native-elements'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon,Input,Item,CheckBox,Body,ListItem, Content, Container, Toast, Root} from 'native-base'
import { TabNavigator}  from 'react-navigation'
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RF from "react-native-responsive-fontsize";


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

const initialState = {
  showDarts: false,
  showFootball: false,
  showBilliards: false,
  familiar: false,
  youthful: false,
  luxurious: false,
  sport: false,
  beerPrice: false,
  rating: false,
  crowdness: false,
  loading: false,
  st: 0,
  places: false,
  showToast: false,
}
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState
    this.params = {
      badgets: {
        billards: this.state.showBilliards ? 1: 0,
        darts: this.state.showDarts ? 1: 0,
        table_football: this.state.showFootball ? 1: 0
      },
      order: {
        beer_prace: this.state.beerPrice ? 1: 0,
        crowdness: this.state.crowdness ? 1: 0,
        rating: this.state.rating ? 1: 0
      },
      atmosphere: this.state.sport ? 0 : this.state.youthful ? 1 : this.state.luxurious ? 2 : this.state.familiar ? 3 : -1,
      location: {
        latitude: 1,
        longitude: 1
      }
    }
  }
  getParams(){
    return ({
      badgets: {
        billards: this.state.showBilliards ? 1: 0,
        darts: this.state.showDarts ? 1: 0,
        table_football: this.state.showFootball ? 1: 0
      },
      order: {
        beer_prace: this.state.beerPrice ? 1: 0,
        crowdness: this.state.crowdness ? 1: 0,
        rating: this.state.rating ? 1: 0
      },
      atmosphere: this.state.sport ? 0 : this.state.youthful ? 1 : this.state.luxurious ? 2 : this.state.familiar ? 3 : -1,
      location: {
        latitude: 1,
        longitude: 1
      }
    })
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
    if(params.location.latitude === 0 || params.location.longitude === 0){
      Toast.show({
        text: 'You have to specify the location',
        buttonText: 'Okay'
      })
    } else {
      this.setState({
        loading: true
      });
      var key = firebase.database().ref('/status_search').push().key
      params = this.getParams()      
      console.log(params)
      firebase.database().ref('/status_search').child(key).set({ id: key, it: params, state: 1 })
      fetch('https://d93d62eb.ngrok.io/barup/results.php?name='+key+'&run=true');
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
            that.setState(initialState) 
            firebase.database().ref('status_search/' + key).set(null)
            clearInterval(int);
          }
        
      }, 500);
      
      //key = firebase.database().ref('/status_search').push().key
      //firebase.database().ref('/status_search').child(key).set({ name: "AAAAAA" })
    }
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
  changeVal = (value,name) =>{
    if(value === true){
      if(this.state.youthful || this.state.sport || this.state.luxurious || this.state.familiar){
        Toast.show({
          text: 'You can only select one!',
          buttonText: 'Okay'
        })
        
      } else {
        if(name === 'youthful'){
          this.setState({youthful: value})
        } else if (name === 'sport'){
          this.setState({sport: value})
        } else if (name === 'luxurious'){
          this.setState({luxurious: value})
        } else {
          this.setState({familiar: value})
        }
      }
    } else {
      if(name === 'youthful'){
        this.setState({youthful: value})
      } else if (name === 'sport'){
        this.setState({sport: value})
      } else if (name === 'luxurious'){
        this.setState({luxurious: value})
      } else {
        this.setState({familiar: value})
      }
    }
  }
  rest(){
    return (
      <View style={styles.container}>
        <View style={styles.searcher}>
          <Item style={{backgroundColor:'white', paddingHorizontal: 10, borderRadius:10}}
                onPress = { () => {this.setState({places: true})}}>
              <Icon name="search" style={{fontSize: 30, paddingTop: 5}}/>
              <Text>Search for your city</Text>
              {/* <Icon name="locate" style={{fontSize: 30, paddingTop: 5}}/> */}  
          </Item>
        </View>
        <View style={styles.barStyle}>
          <View style={styles.nameBarStyle}>
            <Text style={{color: '#888889'}}>Bar Style</Text>
          </View>
          <View style={styles.barStyles}>
            <View style={styles.barStyles1}>
              <View style={styles.barStyles11}>
                <Text style={styles.textitem}>Familiar</Text><Switch  onValueChange={(value) => {this.changeVal(value,'familiar')}} 
                                                                      value={this.state.familiar}
                                                                      onTintColor="#fed849"/> 
                </View>
              <View style={styles.barStyles12}>
                <Text style={styles.textitem} >Youthful</Text><Switch onValueChange={(value) => {this.changeVal(value,'youthful')}} 
                                                                      value={this.state.youthful}
                                                                      onTintColor="#fed849"/> 
              </View>
            </View>
            <View style={styles.barStyles2}>
              <View style={styles.barStyles11}>
                <Text style={styles.textitem}>Luxurious</Text><Switch onValueChange={(value) => {this.changeVal(value,'luxurious')}} 
                                                                      value={this.state.luxurious}
                                                                      onTintColor="#fed849"/>
                </View>
              <View style={styles.barStyles12}>
                <Text style={styles.textitem} >Sport</Text><Switch onValueChange={(value) => {this.changeVal(value,'sport')}} 
                                                                      value={this.state.sport}
                                                                      onTintColor="#fed849"/>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.orderby}>
          <View style={styles.nameOrderBy}>
            <Text style={{color: '#888889'}}>Order By</Text>
          </View>
          <View style={styles.orderbys}>
            <View style={styles.orderby1}>
              <View style={styles.orderby11}>
                <Text style={styles.textitem}>Beer Price</Text><Switch onValueChange={(value) => {this.setState({beerPrice: value})}} 
                                                                      value={this.state.beerPrice}
                                                                      onTintColor="#fed849"/> 
              </View>
              <View style={styles.orderby12}>
                <Text style={styles.textitem} >Rating</Text><Switch onValueChange={(value) => {this.setState({rating: value})}} 
                                                                      value={this.state.rating}
                                                                      onTintColor="#fed849"/>
              </View>
            </View>
            <View style={styles.orderby2}>
              <View style={styles.orderby21}>
                <Text style={styles.textitem}>Crowdness</Text><Switch onValueChange={(value) => {this.setState({crowdness: value})}} 
                                                                      value={this.state.crowdness}
                                                                      onTintColor="#fed849"/> 
              </View>
            </View>
          </View>
        </View>
        <View style={styles.badges}>
          <View style={styles.bdg1}>
            <TouchableOpacity
              onPress={ () => this.setState({ showDarts: !this.state.showDarts }) } 
            >
              {this.renderDarts()}
            </TouchableOpacity>
          </View>

          <View style={styles.bdg2}>
            <TouchableOpacity
              onPress={ () => this.setState({ showFootball: !this.state.showFootball }) } 
            >
              {this.renderFootball()}

            </TouchableOpacity>
          </View>
          

          <View style={styles.bdg3}>
            <TouchableOpacity
              onPress={ () => this.setState({ showBilliards: !this.state.showBilliards }) } 
            >
              {this.renderBilliards()}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonSearch}>
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
      <Root>
      <View style={{flex:1}}>
      { this.state.places ? this.Places() :  this.rest()
          
      }
        </View>
      </Root>
        
    );
  }
}


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searcher: {
    width: "100%",
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barStyle: {
    width: "100%",
    height: '25%',  
  },
  barStyles: {
    width: "100%",
    height: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  barStyles1: {
    width: "50%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  barStyles11: {
    width: "100%",
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,    
  },
  barStyles12: {
    width: "100%",
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,    
  },
  barStyles2: {
    width: "50%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    
  },
  nameBarStyle: {
    width: "20%",
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderby: {
    width: "100%",
    height: '25%', 
  },
  orderbys: {
    width: "100%",
    height: '87%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nameOrderBy: {
    width: "20%",
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  orderby1: {
    width: "50%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  orderby11: {
    width: "100%",
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,    
  },
  orderby12: {
    width: "100%",
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 15,
  },
  orderby2: {
    width: "50%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  orderby21: {
    width: "100%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',    
    
  },
  badges: {
    width: "100%",
    height: '25%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  buttonSearch: {
    width: "100%",
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textitem:{
    paddingRight: 5, 
    fontSize:RF(3)
  },
  badge: {
    padding: "5%",
    height:100,
    width:100,
    alignSelf:'center',
  },
  bdg1:{
    width: "33%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bdg2:{
    width: "33%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  bdg3:{
    width: "33%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
  button: {
    backgroundColor: "black",
    borderColor: "#f49f44",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  
  
});