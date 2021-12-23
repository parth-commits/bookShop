import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../assets/values/colors';

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const NavBarItem = (props) => {
    return (
        <TouchableOpacity style={styles.navBarButton} activeOpacity={0.7} onPress={() => props.navbarFunction(props.name)}>
            <View style={styles.navBarButtonIcon}>
                <Image style={styles.navBarButtonIconImage} source={props.icon}></Image>
            </View>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.navBarText}>{props.name}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    navBarButton: {
      textAlignVertical: 'bottom',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: (width-40-20)/4,
      height: 60,
      marginTop: 5,
      margin: 5,
      fontSize: 10,
    },
    navBarButtonIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    navBarButtonIconImage: {
      width: 40,
      height: 40,
    },
    navBarText: {
      fontSize: 20,
      fontFamily: 'PS-bold',
      color: colors.lightModeText,
      height: 20,
    },
});


export default NavBarItem;