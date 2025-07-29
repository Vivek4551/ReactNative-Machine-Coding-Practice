import {AppState, View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

export const AppStateComponent = () => {
  const [counter, setCounter] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const appState = useRef(AppState.currentState);

  const startCounter = () => {
    if (timer.current === null) {
      timer.current = setInterval(() => {
        setCounter(prev => prev + 1);
      }, 1000);
    }
  };

  const stopCounter = () => {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  useEffect(() => {
    // Start counter on mount if app is active
    if (appState.current === 'active') {
      startCounter();
    }

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        startCounter(); // resume counter
      } else if (nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background!');
        stopCounter(); // pause counter
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
      stopCounter(); // cleanup on unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
  },
});
