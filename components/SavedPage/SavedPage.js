import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { colors } from '../../assets/values/colors';
import ListingItem from "../ListingItem/ListingItem";
import { img } from "../../assets/values/tempImage";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const SavedPage = (props) => {
    const item = {
        userid: 'adfbnfikhbjn',
        sellerEmail: 'parthsamsungdev@gmail.com',
        sellerName: 'Parth Patel',
        price: 15,
        isbn: 9782896465217,
        image: img,
        uploadTimeStamp: 1630300183000,
        courseCode: 'ENV100',
        author: 'Steven Scharper & Simon Appoloni',
        title: 'For Earth\'s Sake - Towards a Passionate Ecology',
    }
    return (
        <View style={styles.SavedPageWrapper}>
            <Text style={styles.appTitle}>{props.name}</Text>
            <ListingItem item={item} isBookmarked={true}></ListingItem>
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