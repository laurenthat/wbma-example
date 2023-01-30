import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MainContext} from '../contexts/MainContext';
import Login from '../views/Login';
import Upload from '../views/Upload';
import {Icon} from '@rneui/base';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
    // screenOptions={({route}) => {
    //   return {
    //     tabBarIcon: ({focused, color, size}) => {
    //       let iconName;
    //       if (route.name === 'Home') {
    //         iconName = 'home';
    //       } else if (route.name === 'Profile') {
    //         iconName = 'person';
    //       }

    //       return <Ionicons name={iconName} />;
    //     },
    //   };
    // }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({color}) => <Icon name="cloud-upload" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={TabScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Single" component={Single} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
