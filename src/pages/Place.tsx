/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface props {
  name: string;
  location: string;
  image: string;
}

export const PlaceComponent = ({name, location, image}: props) => {
  return (
    <View
      style={styles.container}
      onResponderStart={() => {
        console.log(name);
      }}>
      {/* Imgae */}
      <Image
        source={{uri: image}}
        style={{width: 50, height: 50, borderRadius: 10}}
      />

      {/* name and location */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{name}</Text>
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    margin: 15,
  },
  locationContainer: {
    gap: 5,
  },
  locationText: {
    fontSize: 12,
    color: 'black',
    fontWeight: '400',
  },
});
