import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';

// Screens (to be implemented)
import FeedScreen from '../screens/FeedScreen';
import PostDetailsScreen from '../screens/PostDetailsScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Main: undefined;
  PostDetails: { postId: string };
  Login: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: RouteProp<any, any> }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: "home" | "plus" | "user" | undefined;
          if (route.name === 'Feed') iconName = 'home';
          else if (route.name === 'CreatePost') iconName = 'plus';
          else if (route.name === 'Profile') iconName = 'user';
          return <FontAwesome name={iconName as "home" | "plus" | "user"} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#22223b',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

interface AppNavigatorProps {
  isAuthenticated: boolean;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ isAuthenticated }) => {
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator>
          <Stack.Screen name="Main" component={AppTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppNavigator;
