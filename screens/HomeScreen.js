import { View, Text, StyleSheet, SafeAreaView, Image, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import opencage from 'opencage-api-client';
import { OPENCAGE_API_KEY } from '@env';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { POSITIONSTACK_API_KEY } from '@env'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [origine, setOrigine] = useState('');
  const [destinatione, setDestinatione] = useState('');
  const [location, setLocation] = useState([]);  
  
  const geoCode = () => {
    if(!origine || !destinatione) return Alert.alert("Warning", "Data is required !");
    const requestOne = axios.get(`http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_API_KEY}&query=${destinatione}&limit=01`)
    const requestTwo = axios.get(`http://api.positionstack.com/v1/forward?access_key=${POSITIONSTACK_API_KEY}&query=${origine}&limit=01`)

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      dispatch(setDestination(responses[0].data.data[0]))
      dispatch(setOrigin(responses[1].data.data[0]))
      console.log("pls wait")
      navigation.navigate("MapScreen")
    })).catch(errors => {
      console.log(errors)
      dispatch(setDestination({}))
      dispatch(setOrigin({}))
    })
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
            style={{
                width: 100, height: 100, resizeMode: 'contain',
            }}
            source={{
                uri: 'https://links.papareact.com/gzs',
            }}
        />
        {/* <GooglePlacesAutocomplete
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
        /> */}
         <TextInput
            label="Origin"
            placeholder = "Enter your Origin Point"
            onChangeText={text => setOrigine(text)}
         />
         <View style={{ marginBottom: 40 }}></View>
         <TextInput
           label="Destination"
           placeholder = "Enter your Destination"
           onChangeText={text => setDestinatione(text)}
         />
        <View style={{ marginBottom: 40 }}></View>
        <NavOptions onTouchablePress = {geoCode}/>
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue",
    },
})