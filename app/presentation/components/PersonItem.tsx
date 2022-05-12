
import React, { Component, ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import Image from 'react-native-image-progress';
import PersonEntity from "../../domain/entities/PersonEntity";

type PersonItemProps = {
    isLoading: boolean,
    item: PersonEntity
}

export const PersonItem = (props: PersonItemProps): ReactElement => {
    const {isLoading, item} = props
    return (
        <View style={styles.listContainer}>
        <View style={styles.personItemContainer}>
        <Image style={styles.image} indicator={Progress.Circle} source={{uri: item.image }} ></Image>
        <View style={styles.personItemInfoContainer}>
          <Text style={styles.pesonName}>{item.name}</Text> 
          <View style={styles.featureContainer}>
            <Text style={styles.personFeatureText}>{'Status:'}</Text> 
            <View style={ item.status == 'Alive' ? styles.statusIconAlive : styles.statusIconDead }/>
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
      {isLoading ?  
      <View style={styles.itemLoader}>
        <Progress.Circle indeterminate={true}/>
      </View> : 
      <View></View>}
      </View>
  )
}

// export class PersonItem extends React.Component<PersonItemProps> {
    
//     isLoading: boolean
//     item: PersonEntity

//     constructor(props: PersonItemProps) {
//         super(props);
//         this.isLoading = props.isLoading,
//         this.item = props.item
//     }
    
//     render() {
//         return (
//                     <View style={styles.listContainer}>
//                     <View style={styles.personItemContainer}>
//                     <Image style={styles.image} source={{uri: this.item.image }} ></Image>
//                     <View style={styles.personItemInfoContainer}>
//                       <Text style={styles.pesonName}>{this.item.name}</Text> 
//                       <View style={styles.featureContainer}>
//                         <Text style={styles.personFeatureText}>{'Status:'}</Text> 
//                         <Text style={styles.personFeatureValue}>{this.item.status}</Text> 
//                       </View>  
//                       <View style={styles.featureContainer}>
//                         <Text style={styles.personFeatureText}>{'Species:'}</Text> 
//                         <Text style={styles.personFeatureValue}>{this.item.species}</Text> 
//                       </View> 
//                       <View style={styles.featureContainer}>
//                         <Text style={styles.personFeatureText}>{'Last known location:'}</Text> 
//                         <Text style={styles.personFeatureValue}>{this.item.location?.name}</Text> 
//                       </View> 
//                       <View style={styles.featureContainer}>
//                         <Text style={styles.personFeatureText}>{'Origin:'}</Text> 
//                         <Text style={styles.personFeatureValue}>{this.item.origin?.name}</Text> 
//                       </View> 
//                     </View>
//                   </View>
//                   {this.isLoading ?  
//                   <View style={styles.itemLoader}>
//                     <Progress.Circle size={50} indeterminate={true}/>
//                   </View> : 
//                   <View></View>}
//                   </View>
//               )
//     }
        
// }

const styles = StyleSheet.create({
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
    },
  });