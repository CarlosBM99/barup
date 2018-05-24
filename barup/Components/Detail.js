import React, {Component} from 'react';
import { Platform, PixelRatio,StyleSheet, Text, View, StatusBar, ListView, Image,TouchableOpacity, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Card, CardItem, Thumbnail, Body, Left, Right} from 'native-base'
import { Rating } from 'react-native-elements';
import RF from "react-native-responsive-fontsize";

var {width,height} = Dimensions.get('window')

const dartCheck = require('../assets/dart_badge.png');
const footballCheck = require('../assets/football_badge.png');
const billiardsCheck = require('../assets/billiards_badge.png');

class Detail extends Component {

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
  
	render(){

    const { navigation } = this.props;
    const info = navigation.getParam('info', 'NO-ID');

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
          <Text style={{fontSize:RF(3),color:'white'}}>Luxurious</Text>
        </View>

        <View style={styles.barImage}>
          <Image style={styles.img} source={require('../assets/bar1.jpg')}/>
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
              <Text style={{fontSize:RF(3.5)}}>{info.val().beerPrice}€</Text>
            </View>

            <View style={styles.itemPrice}>
              <Text style={{fontSize:RF(3.5)}}>{info.val().beerPrice}€</Text>
            </View>

            <View style={styles.itemPrice}>
              <Text style={{fontSize:RF(3.5)}}>{info.val().beerPrice}€</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.badgeContainer}>
              <View style={styles.badgeStyle}>
                <Image style={styles.bdg} source={dartCheck}/>
              </View>

              <View style={styles.badgeStyle}>
                <Image style={styles.bdg} source={footballCheck}/>
              </View>

              <View style={styles.badgeStyle}>
                <Image style={styles.bdg} source={billiardsCheck}/>
              </View>
            </View>

            <View style={styles.crowdContainer}>
              <Text style={styles.crowd}>Half-Full</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.barMap}>
          <Text>Bar Map</Text>
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
  crowd:{
    borderRadius:20,
    padding:15,
    borderColor:'orange',
    borderWidth:4,
    fontSize:RF(4),
  },
  barMap: {
    width: "100%",
    height: (height)*0.35,
    backgroundColor:'grey',
    alignItems:'center',
    justifyContent:'center',
  },
  img: {
    flex:1,
    resizeMode: 'stretch',
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