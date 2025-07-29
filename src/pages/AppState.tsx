/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {AppState, View, Text, StyleSheet, AppStateStatus} from 'react-native';
import axios, {CancelTokenSource} from 'axios';

export const AppStateComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);

  const delayedGet = (url: string, config: any) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url, config).then(resolve).catch(reject);
      }, 3000);
    });

  const fetchData = useCallback(async () => {
    cancelTokenRef.current = axios.CancelToken.source();
    setIsLoading(true);
    try {
      const response: any = await delayedGet(
        'https://jsonplaceholder.typicode.com/posts',
        {
          cancelToken: cancelTokenRef.current.token,
        },
      );
      console.log('again called');
      setData(response.data);
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('API error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelRequest = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Cancelled due to app going to background');
    }
  };

  useEffect(() => {
    fetchData();

    const subscription = AppState.addEventListener('change', nextAppState => {
      const prevAppState = appStateRef.current;

      if (
        prevAppState.match(/active/) &&
        nextAppState.match(/inactive|background/)
      ) {
        console.log('App going to background, cancelling API...');
        cancelRequest();
      }

      if (
        prevAppState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App came to foreground, restarting API...');
        fetchData();
      }

      appStateRef.current = nextAppState;
    });

    return () => {
      subscription.remove();
      cancelRequest();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isLoading
          ? 'Fetching or waiting'
          : data
          ? 'Data fetched successfully'
          : 'No data found'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 18, padding: 20},
});
