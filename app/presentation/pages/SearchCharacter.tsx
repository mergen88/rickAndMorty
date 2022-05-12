
import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import PersonEntity from '../../domain/entities/PersonEntity';
import { blocStateSearch, PersonSearchCubit } from '../bloc/personSearchCubit/PersonSearchCubit';
import { PersonSearchEmpty, PersonSearchError, PersonSearchLoaded, PersonSearchLoading } from '../bloc/personSearchCubit/PersonSearchState';
import { PersonItem } from '../components/PersonItem';
 
export default function SearchCharacters(props: any) {

  useEffect(()=> {
    navigation = props.navigation
    props.navigation.setOptions({
      title: 'Search Characters', headerTitleAlign: 'center',
    })
  })

  return (
    <PersonSearchList/>
  )
}

var navigation: any
var persons = Array<PersonEntity>()
var isLoading = false

const PersonSearchList = (): ReactElement => {
  
  const [data, { loadPersons }] = blocStateSearch.useBloc(PersonSearchCubit);
  var isFirstFetch = false
  var flatList: any

  if(data instanceof PersonSearchError) {
    Alert.alert('Ошибка', data.message.toString())
  } else if (data instanceof PersonSearchLoaded) {
    isLoading = false
    persons = data.persons
  } else if (data instanceof PersonSearchLoading) {
    isFirstFetch = data.isFirstFetch
    isLoading = true
  } else if (data instanceof PersonSearchEmpty) {
    console.log('isEmpty')
  }
  const [text, onChangeText] = React.useState('');
  return <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            onSubmitEditing={(_) => {
              loadPersons(true, text)
              flatList.scrollToOffset({ animated: true, offset: 0 })
            }}/>
          <FlatList style={styles.personlist}
            ref={list => flatList = list }
            onEndReached={(info) => loadPersons(false, text)}
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
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white'
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 20,
  },
  personlist: {
    width: '100%',
    height: '90%',
    marginTop: 15,
  },
});
