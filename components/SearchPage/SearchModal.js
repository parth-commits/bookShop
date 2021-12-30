import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal, Pressable, ScrollView, Linking, StatusBar, TextInput, FlatList } from 'react-native';
import { colors } from '../../assets/values/colors';
import { defaultDimensions } from "../../assets/values/defaultDimensions";
import { coursesData } from "../../assets/values/coursesData";


/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const SearchModal = (props) => {
    
    const [courseData, setCourseData] = useState(coursesData)
    const [searchByCourseCode, setSearchByCourseCode] = useState(true);
    const [searchByISBN, setSearchByISBN] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedISBN, setSelectedISBN] = useState(null);


    // Hide the status bar, probably only for android
    StatusBar.setHidden(true);
    

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            searchByCoursePressed(item.value)
            }}>
            <Text style={styles.courseItem}>{item.label}</Text>
        </TouchableOpacity>
        
    );

    const searchCourses = (value) => {
        const filteredContacts = coursesData.filter(c => {
        
        let courseLowerCase = c.label.toLowerCase();
        let searchTermLowercase = value.toLowerCase();
    
          return courseLowerCase.indexOf(searchTermLowercase) > -1;
        });
        setCourseData(filteredContacts);
      };
    
    const changeSearchBy = () => {
        setSearchByCourseCode(!searchByCourseCode);
        setSearchByISBN(!searchByISBN);
    }

    const searchByISBNPressed = () => {
        console.log('searchby isbn pressed');
        console.log(selectedISBN);
        console.log('do something to retrieve data');
        props.setIsSearchModalOpen(!props.isSearchModalOpen)
    }

    const searchByCoursePressed = (course) => {
        console.log('searchby course pressed');
        console.log(course);
        console.log('do something to retrieve data');
        props.setIsSearchModalOpen(!props.isSearchModalOpen)

    }

    return (
        <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={props.isModalOpen}
        onRequestClose={() => {
          props.setIsSearchModalOpen(!props.isSearchModalOpen);
        }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.scrollV}>
                        <Text style={styles.title}>Search By</Text>
                        <View style={styles.searchType}>
                            <Pressable
                            style={searchByCourseCode ? styles.searchOptionButtonOn : styles.searchOptionButtonOff}
                            onPress={() => changeSearchBy()}
                            >
                                <Text style={searchByCourseCode ? styles.searchOptionTextOn : styles.searchOptionTextOff}>Course Code</Text>
                            </Pressable>
                            <Pressable
                            style={searchByISBN ? styles.searchOptionButtonOn : styles.searchOptionButtonOff}
                            onPress={() => changeSearchBy()}
                            >
                                <Text style={searchByISBN ? styles.searchOptionTextOn : styles.searchOptionTextOff}>ISBN</Text>
                            </Pressable>
                        </View>
                        {searchByCourseCode && (<TextInput style={styles.titleInput} placeholder="Search a Course" onChangeText={(value) => searchCourses(value)}></TextInput>)}
                    {searchByCourseCode && (
                        <FlatList
                            data={courseData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={() => (
                            <View
                                style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 50
                                }}
                            >
                                <Text style={{ color: colors.lightModeText, fontSize: 25, fontFamily: 'PS-bold' }}>No Courses Found</Text>
                            </View>
                            )}
                        />)}
                        {searchByISBN && (<TextInput style={styles.titleInput} keyboardType='numeric' placeholder="Enter an ISBN" onChangeText={isbn => {
                            if (isbn !== '') {
                                setSelectedISBN(parseInt(isbn.replace(/[^0-9]/g, '')));
                            } else {
                                setSelectedISBN(null);
                            }
                            }}>{selectedISBN}</TextInput>)}
                    </View>
                    <View style={styles.bottomList}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.setIsSearchModalOpen(!props.isSearchModalOpen)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        {searchByISBN && (<Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => searchByISBNPressed()}
                        >
                            <Text style={styles.textStyle}>Search</Text>
                        </Pressable>)}
                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#111111cc',
    },
    modalView: {
        backgroundColor: colors.lightModeBackground,
        opacity: 1,
        width: width - 40,
        height: height*0.75,
        margin: 20,
        borderRadius: 20,
        padding: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
    },
    scrollV: {
        padding: 10,
        height: height*0.75 - 70,
    },
    title: {
        fontSize: 35,
        fontFamily: 'PS-bold',
        color: colors.lightModeText,
        marginLeft: 5,
    },
    bottomList: {
        width: width - 110,
        marginRight: 10,
        height: 40,
        position: 'absolute',
        bottom: 10,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    button: {
      borderRadius: 30,
      //padding: 12,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 20,
      paddingLeft: 20,
      elevation: 2,
      marginLeft: 10,
    },
    buttonClose: {
        backgroundColor: colors.lightModeText,
    },
    textStyle: {
      color: colors.lightModeBackground,
      textAlign: "center",
      fontFamily: 'PS-bold',
      fontSize: 20,
    },
    titleInput: {
        width: width - 40 - 20,
        height: 50,
        fontSize: 30,
        color: colors.lightModeText,
        fontFamily: 'PS-bold',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: colors.lightModeText,
    },
    courseItem: {
        width: width - 40 - 20,
        height: 50,
        fontSize: 30,
        color: colors.lightModeText,
        fontFamily: 'PS-bold',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
    },
    searchType: {
        marginBottom: 30,
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    searchOptionButtonOn: {
        backgroundColor: colors.lightModeText,
        height: 40,
        borderRadius: 30,
        //padding: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        elevation: 2,
        marginRight: 10,
    },
    searchOptionButtonOff: {
        backgroundColor: colors.lightModeBackground,
        height: 40,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: colors.lightModeText,
        borderStyle: 'solid',
        //padding: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        marginRight: 10,
    },
    searchOptionTextOn: {
        color: colors.lightModeBackground,
        textAlign: "center",
        fontFamily: 'PS-bold',
        fontSize: 20,
    },
    searchOptionTextOff: {
        color: colors.lightModeText,
        textAlign: "center",
        fontFamily: 'PS-bold',
        fontSize: 20,
    }
});


export default SearchModal;