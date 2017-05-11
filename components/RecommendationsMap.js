import React, { Component } from 'react';

import MapView from 'react-native-maps'
import { Subtitle, Title } from '@shoutem/ui';

import styles from './styles';
import Recommendation from './Recommendation';

const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
                              headerLocation, onRegionChange }) => (

    <MapView.Animated region={mapRegion}
                       style={{width: 400, height: 400}} 
                      onRegionChange={onRegionChange}>

        

        <MapView.Circle center={mapRegion}
                        radius={gpsAccuracy*1.5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 0.2)"
                        />

        <MapView.Circle center={mapRegion}
                        radius={5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 1)"
                        />

         

    </MapView.Animated>
);

export default RecommendationsMap;