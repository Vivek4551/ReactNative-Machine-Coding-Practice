import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
// import { Accordion } from './src/pages/Accordian';
import {HomePage} from './src/pages/HomePage';
// import {ToDoList} from './src/pages/ToDoList';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <ToDoList /> */}
        <HomePage />
        {/* <Accordion /> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
