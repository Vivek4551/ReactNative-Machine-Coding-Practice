/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  ListRenderItem,
} from 'react-native';

interface JobItem {
  id: number;
  title: string;
  [key: string]: any;
}

interface RenderItemProps {
  item: JobItem;
}

const RenderItem: React.FC<RenderItemProps> = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
};

export const JobBoard: React.FC = () => {
  const [data, setData] = useState<JobItem[]>([]);
  const [filteredData, setFilteredData] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [retryCount, setRetryCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`,
      );
      const json = await response.json();
      const results: JobItem[] = json.results;

      if (!results || results.length === 0) {
        setHasMore(false);
        return;
      }

      if (page === 1) {
        setData(results);
        setFilteredData(results);
      } else {
        setData(prev => [...prev, ...results]);
        setFilteredData(prev => [...prev, ...results]);
      }

      setError('');
    } catch (e: any) {
      console.error(e);
      setRetryCount(prev => prev + 1);
      setError('Failed to fetch jobs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (retryCount > 0 && retryCount < 5) {
      fetchData();
    }
  }, [retryCount]);

  const handleSearch = (value: string) => {
    setText(value);
    const filtered = data.filter(item =>
      item?.title?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  const loadMoreData = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const renderItem: ListRenderItem<JobItem> = ({item}) => (
    <RenderItem item={item} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={handleSearch}
        style={styles.input}
        placeholder="Search jobs..."
        placeholderTextColor="#aaa"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading && page === 1 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size="small" />
            ) : !hasMore ? (
              <Text style={styles.footerText}>No more jobs to show.</Text>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  footerText: {
    textAlign: 'center',
    padding: 10,
    color: '#999',
    fontSize: 14,
  },
});
