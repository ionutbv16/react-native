/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
import { Screen, Spinner, Examples } from '@shoutem/ui';
import { stringify as queryString } from 'query-string';


const CLIENT_ID = '4VMVDF0DJLP4DKSFNW210VFMEL1OJ3P5HAAQJGOC4YFYIOJ2';
const CLIENT_SECRET = 'ZXA5FEE4GJY4S525PBWUDM22R3FTNTOHKQ0FMJNV0GGBTYBU';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;



export default class myapp extends Component {

 constructor () {
     super();

     let regionInit = {
                latitude: 51.519308,
                longitude: -0.155993,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5 
            }

     this.state = { 
         region : regionInit, 
         recommendations:[]
     
     }



 }


 componentWillMount() {
        console.log("componentWillMount",this.watchID); 
        this.watchID = navigator.geolocation.watchPosition((position) => {
            console.log("position",position);
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }
            this.setState ({region : region });
             
            
        }
        , (error) => {
                console.log(error)
            }, {   timeout: 20000, maximumAge: 1000});
        
        this.fetchVenues(this.state.region,"food");  
        console.log("this.watchID",this.watchID); 
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


 fetchVenues(region, lookingFor) {
        
        const query = this.venuesQuery(region, lookingFor);

        console.log("fetchVenues query ",`${FOURSQUARE_ENDPOINT}?${query}`);

        fetch(`${FOURSQUARE_ENDPOINT}?${query}`)
            .then(fetch.throwErrors)
            .then(res => res.json())
            .then(json => {
                if (json.response.groups) {
                    this.setState({
                        recommendations: json.response.groups.reduce(
                            (all, g) => all.concat(g ? g.items : []), []
                        ),
                        headerLocation: json.response.headerLocation,
                        last4sqCall: new Date()
                    });
                     
                }
            })
            .catch(err => console.log(err));
    }

    

    venuesQuery({ latitude, longitude }, lookingFor) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170305,
            ll: `${latitude}, ${longitude}`,
            llAcc: this.state.gpsAccuracy,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }



  render() {

  console.log("render ",this.state); 

    return (
      <View style={styles.container}>
        <Text>Map</Text>
         <MapView.Animated  style={styles.map}
          region = {{ 
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: 0.02, longitudeDelta: 0.02
            }}
         >
         <MapView.Circle center={this.state.region}
                        radius={50*1.5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 0.2)"
                        />

        <MapView.Circle center={this.state.region}
                        radius={5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 1)"
                        />
         <MapView.Marker title={`My Marker ${this.state.region.latitude}`} coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}></MapView.Marker>
        </MapView.Animated>

          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    left:0, right: 0, top:0, bottom:0,
    position: 'absolute'
  },
});

AppRegistry.registerComponent('myapp', () => myapp);
