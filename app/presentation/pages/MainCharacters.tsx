import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import PersonEntity from '../../domain/entities/PersonEntity';
import { blocState, PersonCubit } from '../bloc/personListCubit/PersonListCubit';
import { PersonEmpty, PersonError, PersonLoaded, PersonLoading } from '../bloc/personListCubit/PersonListState';
import { PersonItem } from '../components/PersonItem';


export function MainCharacters(props: any) {

    useEffect(()=> {
      navigation = props.navigation
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

var navigation: any
var persons = Array<PersonEntity>()
var isLoading = false


const PersonList = (): ReactElement => {
  
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
        <TouchableOpacity onPress={ () => {
          navigateToDetail(item);
        }}>
          <PersonItem isLoading={index == persons.length-1 } item={item}/>
        </TouchableOpacity>
      )} />
  </View> 


  function navigateToDetail(person: PersonEntity) {
    navigation.navigate('detail', {person: person})
  }
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


