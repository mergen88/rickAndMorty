
import { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Button } from 'react-native';
import axios, { Axios } from 'axios';
import { PageStyles } from '../../core/Styles';
 
export default function SearchCharacters(props: any) {

  useEffect(()=> {
    console.log(props);
    props.navigation.setOptions({
      title: 'Search Characters', headerTitleAlign: 'center',
    })
  })

  return (
    <View style={styles.container}>
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white'
  }
});
