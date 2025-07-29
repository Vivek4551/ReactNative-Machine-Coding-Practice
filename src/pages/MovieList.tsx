/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {Movies, MoviesData} from '../constants/types';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface RenderFlatListUIProps {
  item: Movies;
}

export const RenderFlatListUI = ({item}: RenderFlatListUIProps) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.poster}} style={styles.poster} />
      <Text style={styles.moviesText}>{item.title}</Text>
    </View>
  );
};

export const MovieList = () => {
  const [movieData, setMovieData] = useState<MoviesData>();
  const [filteredMovieList, setFilteredMovieList] = useState<MoviesData>();
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://moviesapi.ir/api/v1/movies');
      const data = await response.json();
      setFilteredMovieList(data);
      setMovieData(data);
    } catch (e) {
      console.error('error is ', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!inputText.trim()) {
      setFilteredMovieList(movieData);
    } else {
      const filtered = movieData?.data.filter(
        movie =>
          movie.title.toLowerCase().includes(inputText.toLowerCase()) ||
          movie.genres?.some(genre =>
            genre.toLowerCase().includes(inputText.toLowerCase()),
          ),
      );
      if (movieData) {
        setFilteredMovieList({
          data: filtered ?? [],
        });
      }
    }
  }, [inputText, movieData]);

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movies List</Text>

      {/* text input */}
      <View style={styles.inputText}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type movie name here"
        />
      </View>

      {/* for movies list  */}
      {isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={'red'} size={'large'} />
        </View>
      ) : movieData && movieData?.data.length > 0 ? (
        <FlatList
          data={filteredMovieList?.data}
          numColumns={2}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => <RenderFlatListUI item={item} />}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          <Text>No records found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  heading: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  card: {
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  poster: {
    width: CARD_WIDTH * 0.85,
    height: CARD_WIDTH * 1.2,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  moviesText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginTop: 6,
  },
  inputText: {
    height: 40,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 15,
    outlineWidth: 0,
    marginBottom: 20,
  },
});
