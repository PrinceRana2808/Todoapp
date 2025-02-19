import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
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
      <Button title="Login" onPress={handleLogin}/>
      <Button title="Go to Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default LoginScreen;