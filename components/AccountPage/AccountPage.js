import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { colors } from '../../assets/values/colors';


/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const AccountPage = (props) => {
    
    return (
        <View style={styles.AccountPageWrapper}>
            <Text style={styles.appTitle}>{props.name}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    AccountPageWrapper: {
        width: width,
        height: height - 90 - StatusBar.currentHeight,
    },
    appTitle: {
      paddingLeft: 25,
      color: colors.lightModeText,
      fontFamily: 'PS-bold',
      fontSize: 45,
      marginBottom: 10,
    },
});


export default AccountPage;