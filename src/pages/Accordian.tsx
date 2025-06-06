import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
} from 'react-native';

const data = [
  {
    id: 1,
    question: 'What is React Native?',
    answer: 'React Native is a JavaScript framework for building native apps.',
  },
  {
    id: 2,
    question: 'Why use React Native?',
    answer: 'It allows code reuse across iOS and Android platforms.',
  },
  {
    id: 3,
    question: 'Is React Native free?',
    answer: 'Yes, it is open source and free to use.',
  },
];

export const Accordion = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId(openId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {data.map(item => {
        const isOpen = openId === item.id;

        return (
          <View
            key={item.id}
            style={[styles.item, isOpen ? styles.itemOpen : styles.itemClosed]}>
            <TouchableOpacity
              onPress={() => toggle(item.id)}
              style={styles.questionContainer}
              activeOpacity={0.7}>
              <Text style={[styles.question, isOpen && styles.questionOpen]}>
                {item.question}
              </Text>
            </TouchableOpacity>
            {isOpen && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,

    borderWidth: 1,
  },
  itemClosed: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  itemOpen: {
    backgroundColor: '#e0e0e0',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  questionContainer: {
    paddingVertical: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  questionOpen: {
    color: '#007AFF',
  },
  answerContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  answer: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
