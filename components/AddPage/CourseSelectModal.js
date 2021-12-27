import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal, Pressable, ScrollView, Linking, StatusBar, TextInput, FlatList } from 'react-native';
import { colors } from '../../assets/values/colors';
import { defaultDimensions } from "../../assets/values/defaultDimensions";
import RNSearchablePicker from 'react-native-searchable-picker';


/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const coursesData = [
    {
      label: 'CSC209',
      value: 'CSC209'
    },
    {
      label: 'CSC207',
      value: 'CSC207'
    },
    {
      label: 'MAT235',
      value: 'MAT235'
    },
    {
      label: 'ENV100',
      value: 'ENV100'
    },
    {
      label: 'ENV200',
      value: 'ENV200'
    },
    {
      label: 'MAT137',
      value: 'MAT137'
    },
    {
      label: 'CSC369',
      value: 'CSC369'
    },
    {
      label: 'CSC373',
      value: 'CSC373'
    },
    {
      label: 'STA247',
      value: 'STA247'
    },
    {
      label: 'STA137',
      value: 'STA137'
    },
    {
      label: 'RLG260',
      value: 'RLG260'
    },
    {
      label: 'RLG263',
      value: 'RLG263'
    },
    {
      label: 'GGR224',
      value: 'GGR224'
    },
    {
      label: 'NPS100',
      value: 'NPS100'
    },
    {
      label: 'PSY100',
      value: 'PSY100'
    },
    {
      label: 'BIO100',
      value: 'BIO100'
    },
    {
      label: 'CHM100',
      value: 'CHM100'
    },
    {
      label: 'CHM150',
      value: 'CHM150'
    },
    {
      label: 'CHM299',
      value: 'CHM299'
    },
    {
      label: 'CSC491',
      value: 'CSC491'
    },
    {
      label: 'MAT237',
      value: 'MAT237'
    },
  ];

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
          /* dont think i need
          let contactLowercase = (
            contact.firstName +
            ' ' +
            contact.lastName
          ).toLowerCase();
    */
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
                            <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
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
      padding: 12,
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