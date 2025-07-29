import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {Accordion} from '../pages/Accordian';
import {HomePage} from '../pages/HomePage';
import {ToDoList} from '../pages/ToDoList';
import {JobBoard} from '../pages/JobBoard';
import {AutoComplete} from '../pages/AutoComplete';
import {Location} from '../pages/Location';
import {MovieList} from '../pages/MovieList';
import {AppStateComponent} from '../pages/AppState';

export type RootStackParamList = {
  Location: undefined;
  Accordian: undefined;
  HomePage: undefined;
  ToDoList: undefined;
  JobBoard: undefined;
  AutoComplete: undefined;
  MovieList: undefined;
  AppStateComponent: undefined;
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
        name="JobBoard"
        component={JobBoard}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="AutoComplete"
        component={AutoComplete}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="MovieList"
        component={MovieList}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="AppStateComponent"
        component={AppStateComponent}
        options={{
          headerShown: true,
          animation: 'fade_from_bottom',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen
        name="ToDoList"
        component={ToDoList}
        options={{headerShown: true, animation: 'fade_from_bottom'}}
      />
    </Stack.Navigator>
  );
};
