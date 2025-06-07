import React, {useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {placeData} from '../MockedData/mockData';
import {FlatListComponent} from '../components/FlatListComponent';

let debounceTimer: NodeJS.Timeout;

export const Location = () => {
  const [text, setText] = useState('');
  const [filteredData, setFilteredData] = useState(placeData);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      console.log(text, 'text');
      if (!text.trim()) {
        setFilteredData(placeData);
        return;
      }

      const foundData = placeData.filter(place =>
        [place.name, place.location].some(field =>
          field.toLowerCase().includes(text.toLowerCase()),
        ),
      );

      setFilteredData(foundData);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [text]);

  return (
    <View style={style.container}>
      <TextInput
        onChangeText={setText}
        value={text}
        style={style.inputBox}
        placeholder="Type city name here"
      />
      <FlatListComponent data={filteredData} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  inputBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
  },
});
