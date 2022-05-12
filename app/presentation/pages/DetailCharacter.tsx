import { format } from "date-fns";
import { useEffect } from "react";
import { StyleSheet, View, Image, ScrollView, Text } from "react-native";


export function DetailCharacter(props: any) {
  
  useEffect(()=> {
    props.navigation.setOptions({
      title: 'Person detail', headerTitleAlign: 'center'})
  })

  const person = props.route.params.person
  
  return (
        <ScrollView>
          <View style={styles.container}>
          <Image style={styles.personImage} source={{uri: person.image}} />
          <View style={styles.personItemInfoContainer}>
            <Text style={styles.pesonName}>{person.name}</Text> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Gender:'}</Text> 
              <Text style={styles.personFeatureValue}>{person.gender}</Text> 
            </View> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Status:'}</Text>
              <View style={ person.status == 'Alive' ? styles.statusIconAlive : styles.statusIconDead }/> 
              <Text style={styles.personFeatureValue}>{person.status}</Text> 
            </View>  
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Species:'}</Text> 
              <Text style={styles.personFeatureValue}>{person.species}</Text> 
            </View> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Last known location:'}</Text> 
              <Text style={styles.personFeatureValue}>{person.location?.name}</Text> 
            </View> 
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Origin:'}</Text> 
              <Text style={styles.personFeatureValue}>{person.origin?.name}</Text> 
            </View>
            <View style={styles.featureContainer}>
              <Text style={styles.personFeatureText}>{'Was created:'}</Text> 
              <Text style={styles.personFeatureValue}>{dateFormat(person.created)}</Text> 
            </View> 
        </View>
        </View>
        </ScrollView>
      );
}

const dateFormat = (dateTime: string) => {
    const date = new Date(dateTime);
    return format(date, "dd MMMM, yyyy");
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    personImage: {
      width: '100%',
      aspectRatio: 1
    },
    text: {
      color: 'white'
    },
    personItemInfoContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingVertical: 4,
    },
    pesonName: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: 'grey'
    },
    personFeatureText: {
      width: '40%',
      fontSize: 12,
      fontWeight: '500',
      color: 'black',
      textAlign: "left",
    },
    personFeatureValue: {
      fontSize: 12,
      width: '50%',
      fontWeight: '300',
      color: 'grey',
      marginStart: 5,
    },
    featureContainer: {
      width: '100%',
      marginVertical: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start'
    },
    statusIconAlive: {
      width: 10,
      height: 10,
      marginTop: 3,
      borderRadius: 5,
      backgroundColor: 'green'
    },
    statusIconDead: {
      width: 10,
      height: 10,
      marginTop: 3,
      borderRadius: 5,
      backgroundColor: 'red'
    }
  });