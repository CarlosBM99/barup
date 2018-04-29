import React, {Component} from 'react';
import { 
  Platform,
  StyleSheet, 
  Text, 
  View,
  Picker,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import {Button} from 'react-native-elements'
import {Dropdown} from 'react-native-material-dropdown'
import {Icon,Input,Item,} from 'native-base'
import { TabNavigator}  from 'react-navigation'
import SegmentedControlTab from 'react-native-segmented-control-tab';

const dartCheck = require('../assets/darts_checked.png');
const dartUncheck = require('../assets/darts_unchecked.png');
const footballCheck = require('../assets/football_checked.png');
const footballUncheck = require('../assets/football_unchecked.png');
const billiardsCheck = require('../assets/billiards_checked.png');
const billiardsUncheck = require('../assets/billiards_unchecked.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        atmIndex: -1,
        filterIndex: -1,
        showDarts: false,
        showFootball: false,
        showBilliards: false,
    }
  }

  handleAtmIndex = (index) => {
    this.setState({
        ...this.state,
        atmIndex: index,
    });
  }

  handleFilterIndex = (index) => {
    this.setState({
        ...this.state,
        filterIndex: index,
    });
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
/******+*****/

  static navigationOptions = {
    title: "BarUp",
    headerRight: <Icon style={{ paddingRight: 20, color: "#fed849" }} name="ios-star"/>,
    headerStyle : { backgroundColor: 'black' },
    headerTitleStyle: { color: '#fed849' },
  }

  render() {

    const atmposhpere = ['Luxurius','Youthful','Familiar','Hardcore'];
    const filter = ["Beer Price","Rating","Crowd Level"];

    return (
      
      <View style={{flex:1, padding:50, backgroundColor:"#4d4d4d"}}>
      <StatusBar barStyle="light-content"/>
          <View style={{flex:1, marginLeft:5}}>
            <Item style={{backgroundColor:'white', paddingHorizontal: 10, borderRadius:10,marginBottom:15}}>
              <Icon name="search" style={{fontSize: 20, paddingTop: 5}}/>
              <Input placeholder="Search for your city"/>
            </Item>
          
          
          

          <Button
            onPress={this.onPressButton}
            title="Get your Location"
            buttonStyle = {styles.button}
            style={{paddingBottom:20}}
          />

          <Text style={styles.headerText}>Atmosphere</Text>
          <SegmentedControlTab

                    values={atmposhpere}
                    selectedIndex={this.state.atmIndex}
                    onTabPress={this.handleAtmIndex}
                    borderRadius={10}
                    tabsContainerStyle={{ height: 50, backgroundColor: 'transparent'}}
                    tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 2, borderColor: '#f49f44',width:"120%"}}
                    activeTabStyle={{ backgroundColor: 'black', marginTop: 2 }}
                    tabTextStyle={{ color: 'black',fontWeight:'bold'}}
                    activeTabTextStyle={{ color: '#f49f44' }} />
          <Text></Text>

          <Text style={styles.headerText}>Filter by</Text>
          <SegmentedControlTab

                    values={filter}
                    selectedIndex={this.state.filterIndex}
                    onTabPress={this.handleFilterIndex}
                    borderRadius={10}
                    tabsContainerStyle={{ height: 50, backgroundColor: 'transparent'}}
                    tabStyle={{ backgroundColor: '#F2F2F2', borderWidth: 2, borderColor: '#f49f44',width:"120%"}}
                    activeTabStyle={{ backgroundColor: 'black', marginTop: 2 }}
                    tabTextStyle={{ color: 'black',fontWeight:'bold'}}
                    activeTabTextStyle={{ color: '#f49f44' }} />
          <Text></Text>

    <View style={{flexDirection:'row', marginTop:30, marginBottom:30}}>
          <TouchableOpacity
            onPress={ () => this.setState({ showDarts: !this.state.showDarts }) } 
          >
            {this.renderDarts()}
            <Text style={styles.headerTextBadge}>Darts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => this.setState({ showFootball: !this.state.showFootball }) } 
          >
            {this.renderFootball()}
            <Text style={styles.headerTextBadge}>Table Football</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ () => this.setState({ showBilliards: !this.state.showBilliards }) } 
          >
            {this.renderBilliards()}
            <Text style={styles.headerTextBadge}>Billiards</Text>
          </TouchableOpacity>
    </View>

          <Button
            large
            onPress={this.onPressButton}
            onPress={() => this.props.navigation.navigate('listBars')}
            title="Search Bars"
            buttonStyle={styles.button}
          />
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
  inputBox: {
    height:35,
    width:300,
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:20,
    color:'#ffffff',
    marginBottom: 30,
    textAlign: "center",
    flex: 1,
  },
  headerText: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
  badge: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    height:60,
    width:60,
    alignSelf:'center',
  },
  headerTextBadge: {
    padding: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    alignSelf:'center',
  },
});