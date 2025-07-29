import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';

interface Recipe {
  id: number;
  name: string;
}
// plain logic without regex
const RenderItem = ({item, input}: {item: Recipe; input: string}) => {
  const lowerName = item.name.toLowerCase();
  const lowerInput = input.toLowerCase();
  const matchIndex = lowerName.indexOf(lowerInput);

  if (input === '' || matchIndex === -1) {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    );
  }

  const before = item.name.substring(0, matchIndex);
  const match = item.name.substring(matchIndex, matchIndex + input.length);
  const after = item.name.substring(matchIndex + input.length);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>
        {before}
        <Text style={styles.highlight}>{match}</Text>
        {after}
      </Text>
    </View>
  );
};

// const RenderItem = ({item, input}: {item: Recipe; input: string}) => {
//   const regex = new RegExp(`(${input})`, 'i');
//   const parts = item.name.split(regex);

//   return (
//     <View style={styles.itemContainer}>
//       <Text style={styles.text}>
//         {parts.map((part, index) =>
//           part.toLowerCase() === input.toLowerCase() ? (
//             <Text key={index} style={styles.highlight}>
//               {part}
//             </Text>
//           ) : (
//             <Text key={index}>{part}</Text>
//           ),
//         )}
//       </Text>
//     </View>
//   );
// };

export const AutoComplete = () => {
  const [input, setInput] = useState('');
  const [resData, setResData] = useState<Recipe[]>([]);
  const [filteredData, setFilteredData] = useState<Recipe[]>([]);

  const fetchData = async () => {
    try {
      const data = await fetch('https://dummyjson.com/recipes?limit=0');
      const res = await data.json();
      setResData(res.recipes);
      setFilteredData(res.recipes);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // without debouncing
  // const handleChnage = (val: string) => {
  //   setInput(val);
  //   const filtered = resData.filter(item =>
  //     item.name.toLowerCase().includes(input.toLowerCase()),
  //   );
  //   setFilteredData(filtered);
  // };

  // with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim() === '') {
        setFilteredData(resData);
      } else {
        const filtered = resData.filter(item =>
          item.name.toLowerCase().includes(input.toLowerCase()),
        );
        setFilteredData(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, resData]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        placeholder="Type anything here"
        // onChangeText={val => handleChnage(val)}
        onChangeText={setInput}
      />

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <RenderItem item={item} input={input} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.text}>No results found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  highlight: {
    backgroundColor: 'yellow',
  },
});
