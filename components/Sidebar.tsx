import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationScreenProp } from 'react-navigation';

interface SidebarProps {
  navigation: NavigationScreenProp<any, any>;
}

const Sidebar: React.FC<SidebarProps> = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Feed')}>
        <FontAwesome name="home" size={24} color="#333" />
        <Text style={styles.menuText}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CreatePost')}>
        <FontAwesome name="plus" size={24} color="#333" />
        <Text style={styles.menuText}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
        <FontAwesome name="user" size={24} color="#333" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
});

export default Sidebar;
