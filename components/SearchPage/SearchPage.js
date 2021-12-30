import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/values/colors';
import SearchModal from "./SearchModal";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const SearchPage = (props) => {
    
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    return (
        <View style={styles.SearchPageWrapper}>
            {isSearchModalOpen && <SearchModal isSearchModalOpen={isSearchModalOpen} setIsSearchModalOpen={setIsSearchModalOpen}></SearchModal>}
            <Text style={styles.appTitle}>{props.name}</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.searchOptionsWrapper} onPress={() => setIsSearchModalOpen(!isSearchModalOpen)}>
                <Text style={styles.searchOptionText}>Filters</Text>
                <Image style={styles.searchOptionImage} source={require('../../assets/images/filter-icon.png')}></Image>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    SearchPageWrapper: {
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
    searchOptionsWrapper: {
        backgroundColor: colors.lightModeText,
        height: 40,
        maxWidth: width/2,
        marginRight: 10,
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 25,
        elevation: 2,
    },
    searchOptionText: {
        fontSize: 25,
        marginRight: 15,
        fontFamily: 'PS-bold',
        color: colors.lightModeBackground,
    },
    searchOptionImage: {
        width: 20,
        height: 20,
    },
});


export default SearchPage;