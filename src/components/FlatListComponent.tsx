import React from 'react';
import {FlatList, View} from 'react-native';
import {Place} from '../MockedData/mockData';
import {PlaceComponent} from './Place';

interface props {
  data: Place[];
}

export const FlatListComponent = ({data}: props) => {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <PlaceComponent
            name={item.name}
            location={item.location}
            image={item.image}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
