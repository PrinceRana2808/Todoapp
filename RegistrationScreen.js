import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { insertUser } from './database';
import { createTable } from './database';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createTable();
  }, []);

  const handleRegister = () => {
    if (username && password) {
      insertUser(username, password, (success) => {
        if (success) {
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Failed to register user');
        }
      });
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>TODO LIST</Text>
      <Text style={styles.title}>Create your account</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} color="#6200ee" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Login" onPress={() => navigation.navigate('Login')} color="#03dac6" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200ee', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default RegistrationScreen;