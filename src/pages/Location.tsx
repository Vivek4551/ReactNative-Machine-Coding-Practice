import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {placeData} from '../MockedData/mockData';

export const Location = () => {
  console.log('place data', placeData);
  return (
    <View style={style.container}>
      <Text>Hello</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
