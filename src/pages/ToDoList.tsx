/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {TODO} from './types';

const RenderListUI = ({
  item,
  editableId,
  setEditableId,
  deleteTodo,
  updateTodoText,
}: {
  item: TODO;
  editableId: number | null;
  setEditableId: (id: number | null) => void;
  deleteTodo: (id: number) => void;
  updateTodoText: (id: number, text: string) => void;
}) => {
  const isEditable = editableId === item.id;

  return (
    <View style={styles.todoContainer}>
      <Text style={styles.todoNumber}>{item.id}.</Text>

      <TextInput
        style={[
          styles.todoText,
          isEditable && {borderWidth: 1, borderColor: 'blue', borderRadius: 6},
        ]}
        value={item.text}
        editable={isEditable}
        onChangeText={text => updateTodoText(item.id, text)}
      />

      <View style={styles.iconContainer}>
        <TouchableHighlight
          style={styles.edit}
          onPress={() => setEditableId(isEditable ? null : item.id)}
          underlayColor="darkgrey">
          <Text style={{color: 'white'}}>{isEditable ? 'S' : 'E'}</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.delete}
          onPress={() => deleteTodo(item.id)}
          underlayColor="darkred">
          <Text style={{color: 'white'}}>D</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export const ToDoList = () => {
  const [todo, setTodo] = useState<TODO[]>([]);
  const [text, setText] = useState('');
  const [count, setCount] = useState(1);
  const [editableId, setEditableId] = useState<number | null>(null);

  const inputRef = useRef<TextInput>(null);

  const addTodo = () => {
    if (text.trim()) {
      const newTodo: TODO = {
        id: count,
        text: text.trim(),
      };
      setTodo(prev => [...prev, newTodo]);
      setCount(prev => prev + 1);
      setText('');
      inputRef.current?.blur();
    }
  };

  const deleteTodo = (id: number) => {
    setTodo(prev => prev.filter(todo => todo.id !== id));
    if (editableId === id) {
      setEditableId(null);
    }
  };

  const updateTodoText = (id: number, newText: string) => {
    setTodo(prev =>
      prev.map(todo => (todo.id === id ? {...todo, text: newText} : todo)),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To Do List</Text>

      <View style={styles.buttonAndInput}>
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder="Type todo name here"
          style={styles.inputText}
        />

        <TouchableHighlight style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>

      <FlatList
        data={todo}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <RenderListUI
            item={item}
            editableId={editableId}
            setEditableId={setEditableId}
            deleteTodo={deleteTodo}
            updateTodoText={updateTodoText}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    color: 'red',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  inputText: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 15,
  },
  buttonAndInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  todoNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  edit: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  delete: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 4,
  },
});
