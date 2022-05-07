import React, { FC, ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Button, FlatList, Image, Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import { EvilIcons } from '@expo/vector-icons';
import PersonEntity from '../../domain/entities/PersonEntity';
import { blocState, PersonCubit } from '../bloc/personListCubit/PersonListCubit';
import { PersonEmpty, PersonError, PersonLoaded, PersonLoading } from '../bloc/personListCubit/PersonListState';


export function MainCharacters(props: any) {

    useEffect(()=> {
      props.navigation.setOptions({
        title: 'Characters', headerTitleAlign: 'center', headerRight: () => {
          return <EvilIcons name="search" size={24} color="black" onPress={() => {
            props.navigation.navigate('search')
          }} />
        } 
      })
     
    })
        return (<PersonList/>);
      
    
}
var persons = Array<PersonEntity>()
var isLoading = false

const PersonList: FC = (): ReactElement => {
  
  const [data, { loadPersons }] = blocState.useBloc(PersonCubit);
  var isFirstFetch = false
  
  if(data instanceof PersonError) {
    Alert.alert('Ошибка', data.message.toString())
  } else if (data instanceof PersonLoaded) {
    isLoading = false
    persons = data.persons
  } else if (data instanceof PersonLoading) {
    isFirstFetch = data.isFirstFetch
    isLoading = true
  } else if (data instanceof PersonEmpty) {
    console.log('isEmpty')
  }
  
  useState(() => {
    loadPersons(true)
  })

  return <View style={styles.container}>
    <FlatList style={styles.personlist}
      onEndReached={(info) => loadPersons()}
      onEndReachedThreshold={0.7}
      data={persons} 
      renderItem={({item, index}) => (
        <View style={styles.listContainer}>
          <View style={styles.personItemContainer}>
          <Image style={styles.image} source={{uri: item.image }} ></Image>
          <View style={styles.personItemInfoContainer}>
            <Text style={styles.pesonName}>{item.name}</Text> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Status:'}</Text> 
              <Text style={styles.personFeatureValue}>{item.status}</Text> 
            </View>  
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Species:'}</Text> 
              <Text style={styles.personFeatureValue}>{item.species}</Text> 
            </View> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Last known location:'}</Text> 
              <Text style={styles.personFeatureValue}>{item.location?.name}</Text> 
            </View> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Origin:'}</Text> 
              <Text style={styles.personFeatureValue}>{item.origin?.name}</Text> 
            </View> 
          </View>
        </View>
        {index == persons.length-1 && isLoading ?  
        <View style={styles.itemLoader}>
          <Progress.Circle size={50} indeterminate={true}/>
        </View> : 
        <View></View>}
        </View>
      )} />
  </View> 
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    listContainer: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    actionButton: {
        marginTop: 5
    },
    image: {
      width: 150,
      height: 150,
    },
    personItemContainer: {
      width: '100%',
      height: 160,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    personItemInfoContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4
    },
    personlist: {
      width: '100%',
      height: '90%'
    },
    pesonName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'grey'
    },
    personFeatureText: {
      width: '40%',
      fontSize: 12,
      fontWeight: '500',
      color: 'black'
    },
    personFeatureValue: {
      fontSize: 12,
      fontWeight: '300',
      color: 'grey',
      marginStart: 5,
    },
    featureContainer: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    itemLoader: {
      width: '100%',
      height: 80,
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    }
  });


