import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'tailwind-react-native-classnames';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setDestination, setDistance, setTravelTimeInformation } from '../slices/navSlice';
import NavigateCard from './NavigateCard';
import { GOOGLE_MAPS_APIKEY, BING_API_KEY } from '@env';
import axios from 'axios';

const Map = ({ location }) => {
  const origin = useSelector(selectOrigin)
  const dispatch = useDispatch()
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  if (!origin && !destination) return Alert.alert("pls wait")
  const coordinates = [
    { 
      latitude: origin?.latitude, 
      longitude: origin?.longitude,
    },
    { 
      latitude: destination?.latitude, 
      longitude: destination?.longitude 
    }
  ];
  if (!coordinates) return Alert.alert("API IS SLOW I'M SORRY")
  const newQuery = `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${origin?.latitude},${origin?.longitude}&destinations=${destination?.latitude},${destination?.longitude}&travelMode=driving&key=${BING_API_KEY}`
  console.log(origin?.latitude, " ", origin?.longitude, " ", destination?.latitude, " ", destination?.longitude)
  useEffect(() => {
    axios.get(newQuery, {}, {} )
      .then((res) => {
        dispatch(setDistance(res.data.resourceSets[0].resources[0].results[0].travelDistance)); 
        dispatch(setTravelTimeInformation(res.data.resourceSets[0].resources[0].results[0].travelDuration));
      })
      .catch(e => { 
        dispatch(setDistance(0));
        dispatch(setTravelTimeInformation(0));
      })
  }, [origin, destination])

  useEffect(() => {
    if( !origin && !destination ) return;
    console.log("Running !!!")
    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left:50 }
      })
    }, 2000)
  }, [origin, destination])

    console.log("running")
    console.log(origin?.name)
    console.log(destination?.name)
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType = "mutedStandard"
      initialRegion={{
        latitude: origin?.latitude,
        longitude: origin?.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }} >
        <Marker
          coordinate={{
            latitude: origin?.latitude,  //hardcoded values, google api missing --fixed
            longitude: origin?.longitude, //hardcoded values, google api missing --fixed
          }}
          title="origin"
          description="Nice"  //hardcoded values, google api missing --fixed
          identifier="origin"
        />
        <Marker
          coordinate={{
            latitude: destination?.latitude,  //hardcoded values, google api missing --fixed
            longitude: destination?.longitude, //hardcoded values, google api missing --fixed
          }}
          title="origin"
          description="Nice"  //hardcoded values, google api missing --fixed
          identifier="destination"
        />
        <Polyline
          coordinates={coordinates}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          strokeWidth={6}
        />
    </MapView>
  );
};

export default Map