import React, {Component} from 'react';
import { Platform, PixelRatio,StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'
import { Rating } from 'react-native-elements';
import RF from "react-native-responsive-fontsize";
import MapView from "react-native-maps";
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyAWOG03GylQLc2J8fKA_v5rVjRW1KlRPU8'); 

var {width,height} = Dimensions.get('window')
var addressComponent = null
dartBadge = require('../assets/dart_badge.png');
footballBadge = require('../assets/football_badge.png');
billiardsBadge = require('../assets/billiards_badge.png');
dartUnbadge = require('../assets/dart_unbadge.png');
footballUnbadge = require('../assets/football_unbadge.png');
billiardsUnbadge = require('../assets/billiards_unbadge.png');

class Detail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      add:"null",
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

  renderCrowd(info) {
    var crowd = info.val().prediction;
    if(crowd == 0)
    {
      return(
        <Text style={styles.crowd0}>Empty</Text>
      );
    }else if(crowd == 1)
    {
      return(
        <Text style={styles.crowd1}>Half-Full</Text>
      );
    }else if(crowd == 2)
    {
      return(
        <Text style={styles.crowd2}>Full</Text>
      );
    }
  }
  componentDidMount(){
    const { navigation } = this.props;
    const info = navigation.getParam('info', 'NO-ID');
    Geocoder.from(info.val().latitude, info.val().longitude)
        .then(json => {
        	addressComponent = json.results[0].formatted_address;
            this.setState({add:addressComponent});
        })
        .catch(error => console.warn(error));
  }
	render(){

    const { navigation } = this.props;
    const info = navigation.getParam('info', 'NO-ID');

    var listAmbient = ["Youthful", "Sport", "Luxurious", "Familiar"];
    var nAmbient = info.val().atmosphere;

		return(
		  <View style={styles.container}>
      
        <View style={{flexDirection: 'row'}}>
          <View style={styles.name}>
            <Text style={{fontSize:RF(3)}}>{info.val().name}</Text>
          </View>

          <View style={styles.rating}>
            <Rating
              fractions={1}
              startingValue={info.val().rating}
              readonly
              imageSize={25}
              onFinishRating={this.ratingCompleted}
              style={{ padding: 20 }}
            />
          </View>

          <View style={styles.fav}>
            <Icon style={{fontSize: RF(7), color: 'black'}} name="star"/>
          </View>
        </View>

        <View style={styles.ambient}>
          <Text style={{fontSize:RF(3),color:'white'}}>{listAmbient[nAmbient]}</Text>
        </View>

        <View style={styles.barImage}>
          <Image style={styles.img} source={{uri: info.val().url}}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.itemContainer}>
            <View style={styles.details}>
              <Text style={{fontSize:RF(2.5)}}>Beer</Text>
            </View>

            <View style={styles.details}>
              <Text style={{fontSize:RF(2.5)}}>CocaCola</Text>  
            </View>

            <View style={styles.details}>
              <Text style={{fontSize:RF(2.5)}}>Coffee</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.itemPrice}>
              <Text style={{fontSize:RF(3.5)}}>{Number(info.val().beerPrice).toFixed(2)}€</Text>
            </View>

            <View style={styles.itemPrice}>
              <Text style={{fontSize:RF(3.5)}}>{Number(info.val().sodaPrice).toFixed(2)}€</Text>
            </View>

            <View style={styles.itemPrice}>
              <Text style={{fontSize:RF(3.5)}}>{Number(info.val().coffeePrice).toFixed(2)}€</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.badgeContainer}>
              <View style={styles.badgeStyle}>
                {this.renderDartsBadge(info)}
              </View>

              <View style={styles.badgeStyle}>
                {this.renderFootballBadge(info)}
              </View>

              <View style={styles.badgeStyle}>
                {this.renderBilliardsBadge(info)}
              </View>
            </View>

            <View style={styles.crowdContainer}>
              {this.renderCrowd(info)}
            </View>
          </View>
        </View>
        
        <View style={styles.barMap}>
          <MapView
            style={{width:"100%", height:"100%"}}
            region={{
              longitude: info.val().longitude,
              latitude: info.val().latitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }}
          >
            
            <MapView.Marker
              coordinate={{
                longitude: info.val().longitude,
                latitude: info.val().latitude,
              }}

              title={info.val().name}
              description={this.state.add}
            />

          </MapView>
        </View>
        

      </View>
		)
	}
}

export default Detail;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor:'white',
  },
  name: {
    width: "45%",
    height: (height)*0.1,
    alignItems:'flex-start',
    padding: 10,
    justifyContent:'center',
  },
  rating: {
    width: "40%",
    height: (height)*0.1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection: 'row',
  },
  fav: {
    width: "15%",
    height: (height)*0.1,
    alignItems:'center',
    justifyContent:'center',
  },
  ambient: {
    width: "100%",
    height: (height)*0.05,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  barImage: {
    width: "100%",
    height: (height)*0.25,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },
  itemContainer: {
    width: "30%",
    height: (height)*0.25,
  },
  details:{
    marginRight:"10%",
    height:"33%",
    padding:10,
    alignItems:'center',
    justifyContent:'center',
  },
  infoContainer: {
    width: "50%",
    height: (height)*0.25,
  },
  badgeContainer:{
    width: "100%",
    height: "50%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  badgeStyle:{
    width: "33%",
    height: "50%",
    alignItems:'center',
    justifyContent:'center',
  },
  crowdContainer:{
    flex:1,
    width: "100%",
    height: "50%",
    justifyContent:'center',
    alignItems:'center',
  },
  crowd0:{
    borderRadius:20,
    padding:15,
    borderColor:'green',
    borderWidth:4,
    fontSize:RF(4),
  },
  crowd1:{
    borderRadius:20,
    padding:15,
    borderColor:'orange',
    borderWidth:4,
    fontSize:RF(4),
  },
  crowd2:{
    borderRadius:20,
    padding:15,
    borderColor:'red',
    borderWidth:4,
    fontSize:RF(4),
  },
  barMap: {
    width: "100%",
    height: (height)*0.35,
    alignItems:'center',
    justifyContent:'center',
  },
  img: {
    flex: 1,
    width: "100%",
    height: (height)*0.25,
    resizeMode: 'cover',
  },
  bdg:{
    flex:1,
    resizeMode: 'contain',
  },
  priceContainer: {
    width: "20%",
    height: (height)*0.25,
    alignItems:'center',
    justifyContent:'center',
  },
  itemPrice:{
    width: "100%",
    height: "33%",
    alignItems:'center',
    justifyContent:'center',
  },
});