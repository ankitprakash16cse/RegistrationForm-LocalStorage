import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserForm from './component/UserForm';
export default function App() {
  return (
    <View style={styles.container}>
      <UserForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'#36485f',
    paddingLeft:60,
    paddingRight:60
    
    
  },
});
