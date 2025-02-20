import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getUser } from './database';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      getUser(username, password, (success, userId) => {
        if (success) {
          Alert.alert('Success', 'Login successful');
          navigation.navigate('Home', { userId }); 
        } else {
          Alert.alert('Error', 'Invalid username or password');
        }
      });
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>TODO LIST</Text>
      <Text style={styles.title}>Login to your account</Text>
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
        <Button title="Login" onPress={handleLogin} color="#6200ee"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Register" onPress={() => navigation.navigate('Register')} color="#03dac7"/>
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

export default LoginScreen;