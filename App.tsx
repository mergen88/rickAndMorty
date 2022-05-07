
import { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Button } from 'react-native';
import axios, { Axios } from 'axios';
import { PageStyles } from './app/core/Styles'
import { Page } from './app/core/widgets/Page';
import { EvilIcons } from '@expo/vector-icons';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainCharacters } from './app/presentation/pages/MainCharacters';
import SearchCharacters from './app/presentation/pages/SearchCharacter';
 
export default function App() {

  useEffect(() => {
    
  })

  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="main"  component={MainCharacters} />
        <Stack.Screen name="search" component={SearchCharacters} />
    </Stack.Navigator>
  );
}


export const Stack = createNativeStackNavigator();
