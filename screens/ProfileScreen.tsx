import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <Text>Profile details will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
});
