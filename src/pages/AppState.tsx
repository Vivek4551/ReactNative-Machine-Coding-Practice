/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState, useCallback} from 'react';
import {AppState, View, Text, StyleSheet, AppStateStatus} from 'react-native';
import axios from 'axios';

export const AppStateComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const abortControllerRef = useRef<AbortController | null>(null);

  const delayedGet = (url: string, signal: AbortSignal) =>
    new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        axios.get(url, {signal}).then(resolve).catch(reject);
      }, 3000);

      // In case the fetch is aborted before timeout
      signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        reject(new DOMException('Aborted due to app state change', 'AbortError'));
      });
    });

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    try {
      const response: any = await delayedGet(
        'https://jsonplaceholder.typicode.com/posts',
        controller.signal,
      );
      console.log('again called');
      setData(response.data);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted:', error.message);
      } else {
        console.error('API error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    padding: 20,
  },
});
