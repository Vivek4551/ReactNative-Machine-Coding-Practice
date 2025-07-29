/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GlobalNavigationProp} from '../navigations/navigator';
import {buttons} from '../constants/Button';

const {width} = Dimensions.get('window');

export const HomePage = () => {
  const navigation = useNavigation<GlobalNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {buttons.map(btn => (
          <TouchableWithoutFeedback
            key={btn.title}
            onPress={() => {
              navigation.navigate(btn.navigateTo as any);
            }}>
            <View style={styles.buttonNav}>
              <Text style={{color: 'white'}}>{btn.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  buttonNav: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: (width - 60) / 2,
    marginBottom: 10,
  },
});
