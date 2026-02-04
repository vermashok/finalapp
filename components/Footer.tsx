import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationScreenProp } from 'react-navigation';

interface FooterProps {
  navigation: NavigationScreenProp<any, any>;
}

const Footer: React.FC<FooterProps> = ({ navigation }) => (
  <View style={styles.footer}>
    <TouchableOpacity onPress={() => navigation.navigate('Feed')} style={styles.button}>
      <FontAwesome name="home" size={24} color="#22223b" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('CreatePost')} style={styles.button}>
      <FontAwesome name="plus" size={24} color="#22223b" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
      <FontAwesome name="user" size={24} color="#22223b" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    padding: 10,
  },
});

export default Footer;
