import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { insertUser } from './database';
import { createTable } from './database';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(()=>{
    createTable();
  },[])

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
    <View style={{ padding: 20 }}>
      
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default RegistrationScreen;