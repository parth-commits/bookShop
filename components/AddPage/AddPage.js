import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '../../assets/values/colors';
import * as ImagePicker from 'expo-image-picker';
import RNSearchablePicker from 'react-native-searchable-picker';
import CourseSelectedModal from "./CourseSelectModal";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const AddPage = (props) => {
    const [userid, setUserid] = useState('predefined since user logged in');
    const [sellerEmail, setSellerEmail] = useState('predefined since user logged in');
    const [sellerName, setSellerName] = useState('predefined since user logged in');
    const [price, setPrice] = useState(0);
    const [isbn, setIsbn] = useState(0);
    const [image, setImage] = useState(null);
    const [uploadTimeStamp, setUploadTimeStamp] = useState(new Date().getTime());
    const [courseCode, setCourseCode] = useState(null);
    const [author, setAuthor] = useState('will change');
    const [title, setTitle] = useState('Title');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCourseModalClose = (item) => {
        if (item) {
            setCourseCode(item.value);
        }
        setIsModalOpen(!isModalOpen);
      }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          base64: true,
          aspect: [1,1],
          quality: 0.1,
        });
    
        if (!result.cancelled && result.base64) {
            setImage("data:image/jpg;base64,"+result.base64);
        }
      };

    /*const item = {
        userid: 'adfbnfikhbjn',
        sellerEmail: 'parthsamsungdev@gmail.com',
        sellerName: 'Parth Patel',
        price: 15,
        isbn: 9782896465217,
        image: '#caswd',
        uploadTimeStamp: 1630300183000,
        courseCode: 'ENV100',
        author: 'Steven Scharper & Simon Appoloni',
        title: 'For Earth\'s Sake - Towards a Passionate Ecology',

        user has to give:
        image: '#caswd', // done
        title: 'For Earth\'s Sake - Towards a Passionate Ecology', // done
        author: 'Steven Scharper & Simon Appoloni', // done
        price: 15,  // done
        isbn: 9782896465217, // done
        courseCode: 'ENV100', // done





    }*/
    return (
        <View style={styles.AddPageWrapper}>
            {isModalOpen && (<CourseSelectedModal handleCourseModalClose={handleCourseModalClose}></CourseSelectedModal>)}
            <Text style={styles.appTitle}>{props.name}</Text>
            <ScrollView style={styles.addScrollView}>
                <Text style={styles.subtitle}>Image</Text>
                <TouchableOpacity activeOpacity={0.7} style={styles.uploadPhotoView} onPress={pickImage}>
                    {!image && <Image style={styles.uploadPhotoViewImage} source={require('../../assets/images/bottom-banner-add.png')}></Image>}
                    {image && <Image source={{uri: image}} style={styles.base64Img} />}
                </TouchableOpacity>
                <Text style={styles.subtitle}>Title</Text>
                <TextInput
                style={styles.titleInput}
                placeholder="A great title!"
                onChangeText={title => setTitle(title)}>
                </TextInput>
                <Text style={styles.subtitle}>Price</Text>
                <TextInput
                style={styles.titleInput}
                placeholder="What's the price?"
                keyboardType='numeric'
                maxLength={6}  //setting limit of input
                onChangeText={price => setPrice(parseFloat(price))}>
                </TextInput>
                <Text style={styles.subtitle}>Author</Text>
                <TextInput
                style={styles.titleInput}
                placeholder="Who wrote it?"
                onChangeText={author => setAuthor(author)}>
                </TextInput>
                <Text style={styles.subtitle}>ISBN</Text>
                <TextInput
                style={styles.titleInput}
                keyboardType='numeric'
                placeholder="psst, check the back!"
                onChangeText={isbn => setIsbn(parseInt(isbn.replace(/[^0-9]/g, '')))}>
                </TextInput>
                <Text style={styles.subtitle}>Course Code</Text>
                <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)}>
                    <Text style={styles.courseInput}>{courseCode ? courseCode : 'Select Course'}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    AddPageWrapper: {
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
    addScrollView: {
        paddingLeft: 20,
    },
    uploadPhotoViewImage: {
        width: (width - 40)/4,
        height: (width - 40)/4,
    },
    uploadPhotoView: {
        width: width - 40,
        height: width - 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 7,
        borderStyle: 'dashed',
        borderColor: colors.lightModeText,
        borderRadius: 30,
        marginBottom: 20,
    },
    base64Img: {
        width: width - 40,
        height: width - 40,
        borderRadius: 30,
    },
    subtitle: {
        paddingLeft: 5,
        color: colors.lightModeText,
        fontFamily: 'PS-bold',
        fontSize: 35,
        marginBottom: 10,
    },
    titleInput: {
        width: width - 40,
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
    courseInput: {
        width: width - 40,
        height: 50,
        fontSize: 30,
        color: colors.lightModeText,
        fontFamily: 'PS-bold',
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: colors.lightModeText,
    },
});


export default AddPage;