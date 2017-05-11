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

export default class myapp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Map</Text>
         <MapView.Animated  style={styles.map}
          initialRegion = {{ 
            latitude: 51.519308,
            longitude: -0.155993,
            latitudeDelta: 0.02, longitudeDelta: 0.02
            }}
         >
         <MapView.Marker title="My Marker" coordinate={{latitude: 51.519308, longitude: -0.155993}}></MapView.Marker>
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
