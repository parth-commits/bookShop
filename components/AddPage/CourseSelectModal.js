import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal, Pressable, ScrollView, Linking, StatusBar, TextInput, FlatList } from 'react-native';
import { colors } from '../../assets/values/colors';
import { defaultDimensions } from "../../assets/values/defaultDimensions";
import { coursesData } from "../../assets/values/coursesData";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const CourseSelectedModal = (props) => {
    
    
    const [courseData, setCourseData] = useState(coursesData)
    
    // Hide the status bar, probably only for android
    StatusBar.setHidden(true);
    

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {props.handleCourseModalClose(item)}}>
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
    


    return (
        <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={props.isModalOpen}
        onRequestClose={() => {
          props.handleCourseModalClose();
        }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.scrollV}>
                    <TextInput
                    style={styles.titleInput}
                    placeholder="Search a Course"
                    onChangeText={(value) => searchCourses(value)}>
                    </TextInput>
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
                    />
                        
                    </View>
                    <View style={styles.bottomList}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => props.handleCourseModalClose()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
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
    bottomList: {
        //backgroundColor: '#ccc',
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
    }
});


export default CourseSelectedModal;