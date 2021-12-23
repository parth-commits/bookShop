import React, {useState} from "react";
import { StyleSheet, View, Dimensions } from 'react-native';
import { colors } from '../../assets/values/colors';
import NavBarItem from "./NavBarItem";
import { navBarItems } from "../../assets/values/navBarItems";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const NavBar = (props) => {
    const buttonsListArr = navBarItems.map((item, key) => (
        <NavBarItem key={key} name={item.name} icon={item.icon} navbarFunction={(name) => props.navbarFunction(name)}></NavBarItem>
      ));
    return (
        <View style={styles.navBar}>
            <View style={styles.navBarButtons}>
                {buttonsListArr}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    navBar: {
      width: width,
      height: 90,
      backgroundColor: colors.lightModeBackground,
      elevation: 30,
    },
    navBarButtons: {
      width: width-20,
      marginLeft: 10,
      height: 70,
      marginTop: 10,
      flexDirection: 'row',
    },
});


export default NavBar;