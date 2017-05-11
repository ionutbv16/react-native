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

import App from './components/App';

import styles from './components/styles';
import RecommendationsMap from './components/RecommendationsMap';
import { OverlayTopics, BottomTopics } from './components/Topics';

export default class myapp extends Component {
  render() {
    return (

      <View><Text>some here</Text>
      <App />
      </View>

    );
  }
}

 

AppRegistry.registerComponent('myapp', () => myapp);
