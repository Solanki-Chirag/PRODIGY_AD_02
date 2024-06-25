import Homepage from '@/components/Homepage';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { IconButton } from 'react-native-paper'; 


const TodoScreen: React.FC = () => {
  
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<{ id: string; title: string }[]>([]);
  const [editedTodo, setEditedTodo] = useState<{ id: string; title: string } | null>(null);

  
  const handleAddTodo = () => {
    if (todo === '') {
      return; 
    }

    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo('');
  };

  // Handle Delete
  const handleDeleteTodo = (id: string) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  // Handle Edit todo
  const handleEditTodo = (todo: { id: string; title: string }) => {
    setEditedTodo(todo);
    setTodo(todo.title);
  };

  // Handle Update
  const handleUpdateTodo = () => {
    if (!editedTodo) return;
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo('');
  };

  // Render todo
  const renderTodos = ({ item }: { item: { id: string; title: string } }) => {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.title}</Text>
        <IconButton icon="pencil" iconColor="#fff" onPress={() => handleEditTodo(item)} />
        <IconButton icon="trash-can" iconColor="#fff" onPress={() => handleDeleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a task"
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={editedTodo ? handleUpdateTodo : handleAddTodo}
      >
        <Text style={styles.buttonText}>{editedTodo ? 'Save' : 'Add'}</Text>
      </TouchableOpacity>

      <FlatList
        data={todoList}
        renderItem={renderTodos}
        keyExtractor={(item) => item.id}
      />

      {todoList.length <= 0 && <Homepage />}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 40,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 6,
    paddingVertical: 12,
    marginVertical: 34,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  todoItem: {
    backgroundColor: '#1e90ff',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5, 
  },
  todoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
  },
});
