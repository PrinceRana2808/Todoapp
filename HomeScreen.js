import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native';
import { createTabletodo, insertTask, getTasks, updateTask, deleteTask } from './database';

const HomeScreen = ({ route }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [userId, setUserId] = useState(route.params.userId); 

  useEffect(() => {
    createTabletodo();
    if (userId) {
      fetchTasks(userId);
    }
  }, [userId]);

  const fetchTasks = (userId) => {
    getTasks(userId, data => setTasks(data));
  };

  const handleAddTask = () => {
    if (!task.trim()) return Alert.alert('Error', 'Task cannot be empty');

    if (editingId !== null) {
      updateTask(editingId, task, userId, () => {
        fetchTasks(userId);
        setTask('');
        setEditingId(null);
      });
    } else {
      insertTask(task, userId, () => {
        fetchTasks(userId);
        setTask('');
      });
    }
  };

  const handleEditTask = (id, existingTask) => {
    setTask(existingTask);
    setEditingId(id);
  };

  const handleDeleteTask = id => {
    deleteTask(id, userId, () => fetchTasks(userId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      
      <TextInput
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <Button title={editingId !== null ? "Update Task" : "Add Task"} onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEditTask(item.id, item.task)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 ,color:'purple'},
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginVertical: 5, backgroundColor: '#fff', borderRadius: 5, elevation: 2},
  taskText: { fontSize: 30},
  buttonContainer: { flexDirection: 'row' },
  editButton: { color: 'blue', marginRight: 10 },
  deleteButton: { color: 'red' }
});

export default HomeScreen;