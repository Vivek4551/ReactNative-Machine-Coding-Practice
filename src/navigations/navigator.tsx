import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {Location} from '../pages/Location';
import {Accordion} from '../pages/Accordian';
import {HomePage} from '../pages/HomePage';
import {ToDoList} from '../pages/ToDoList';

export type RootStackParamList = {
  Location: undefined;
  Accordian: undefined;
  HomePage: undefined;
  ToDoList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type GlobalNavigationProp = StackNavigationProp<RootStackParamList>;

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'HomePage'}>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false, animation: 'fade_from_bottom'}}
      />

      <Stack.Screen
        name="Accordian"
        component={Accordion}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="Location"
        component={Location}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackVisible: true,
          presentation: 'modal',
        }}
      />

      <Stack.Screen
        name="ToDoList"
        component={ToDoList}
        // options={{headerShown: false, animation: 'fade_from_bottom'}}
      />
    </Stack.Navigator>
  );
};
