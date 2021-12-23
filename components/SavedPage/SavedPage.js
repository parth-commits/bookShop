import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { colors } from '../../assets/values/colors';
import ListingItem from "../ListingItem/ListingItem";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const SavedPage = (props) => {
    
    return (
        <View style={styles.SavedPageWrapper}>
            <Text style={styles.appTitle}>{props.name}</Text>
            <ListingItem></ListingItem>
        </View>
    );
}


const styles = StyleSheet.create({
    SavedPageWrapper: {
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


export default SavedPage;