import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, StatusBar, ScrollView, Image, TouchableOpacity, TextInput, Pressable } from 'react-native';
import { colors } from '../../assets/values/colors';
import * as ImagePicker from 'expo-image-picker';
import CourseSelectedModal from "./CourseSelectModal";
import ListingItem from "../ListingItem/ListingItem";
import { defaultDimensions } from "../../assets/values/defaultDimensions";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



const AddPage = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Listing details that are predefined, sent as props. */
    const [userid, setUserid] = useState('sftgsfgnsfg');
    const [sellerEmail, setSellerEmail] = useState('parthsamsungdev@gmail.com');
    const [sellerName, setSellerName] = useState('Parth Patel');
    const [uploadTimeStamp, setUploadTimeStamp] = useState(new Date().getTime());

    /* Things user needs to provide for listing */
    const [price, setPrice] = useState(null);
    const [isbn, setIsbn] = useState(null);
    const [image, setImage] = useState(null);
    const [courseCode, setCourseCode] = useState(null);
    const [author, setAuthor] = useState(null);
    const [title, setTitle] = useState(null);

    /* If provided a correct course code, updates it and then closes modal */
    const handleCourseModalClose = (item) => {
        if (item) {
            setCourseCode(item.value);
        } else {
            setCourseCode(null);
        }
        setIsModalOpen(!isModalOpen);
      }

    /* When user puts correct info in for listing, this function will upload it */
    const handlePost = () => {
        // handle where the post needs to be uploaded.
        console.log('post clicked');
    }

    /* Grabs an image from user gallery and converts it to a base64 image */
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
                onChangeText={title => {
                    if (title !== '') {
                        setTitle(title)
                    } else {
                        setTitle(null);
                    }
                    }}>
                </TextInput>
                <Text style={styles.subtitle}>Price</Text>
                <TextInput
                style={styles.titleInput}
                placeholder="What's the price?"
                keyboardType='numeric'
                maxLength={6}  //setting limit of input
                onChangeText={price => {
                    if (price !== '') {
                        setPrice(parseFloat(price))
                    } else {
                        setPrice(null);
                    }
                    }}>
                </TextInput>
                <Text style={styles.subtitle}>Author</Text>
                <TextInput
                style={styles.titleInput}
                placeholder="Who wrote it?"
                onChangeText={author => {
                    if (author !== '') {
                        setAuthor(author);
                    } else {
                        setAuthor(null);
                    }
                    }}>
                </TextInput>
                <Text style={styles.subtitle}>ISBN</Text>
                <TextInput
                style={styles.titleInput}
                keyboardType='numeric'
                placeholder="psst, check the back!"
                onChangeText={isbn => {
                    if (isbn !== '') {
                        setIsbn(parseInt(isbn.replace(/[^0-9]/g, '')));
                    } else {
                        setIsbn(null);
                    }
                    }}>
                </TextInput>
                <Text style={styles.subtitle}>Course Code</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setIsModalOpen(!isModalOpen)}>
                    <Text style={styles.courseInput}>{courseCode ? courseCode : 'Select Course'}</Text>
                </TouchableOpacity>
                <Text style={styles.subtitle}>Preview</Text>
                { (!price || !isbn || !image || !courseCode || !author || !title) && (<View style={styles.previewAppearsWhenDone}>
                    <Text style={styles.previewAppearsWhenDoneText} numberOfLines={2}>Preview appears here when all fields are correctly filled out.</Text>
                </View>)}
                { price && isbn && image && courseCode && author && title && (<ListingItem hideBookMark={true} style={{marginLeft: -10}} item={{
                    userid: userid,
                    sellerEmail: sellerEmail,
                    sellerName: sellerName,
                    price: price,
                    isbn: isbn,
                    image: image,
                    uploadTimeStamp: uploadTimeStamp,
                    courseCode: courseCode,
                    author: author,
                    title: title}}></ListingItem>)}
                { price && isbn && image && courseCode && author && title && (<Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {handlePost()}}
                        >
                            <Text style={styles.textStyle}> Post </Text>
                </Pressable>)}
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
        paddingLeft: 10,
    },
    uploadPhotoViewImage: {
        width: (width - 40)/4,
        height: (width - 40)/4,
    },
    uploadPhotoView: {
        width: width - 20,
        height: width - 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 7,
        borderStyle: 'dashed',
        borderColor: colors.lightModeText,
        borderRadius: 30,
        marginBottom: 20,
    },
    previewAppearsWhenDone: {
        width: width - 20,
        height: defaultDimensions.listing.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderWidth: 4,
        borderStyle: 'dashed',
        borderColor: colors.lightModeText,
        borderRadius: defaultDimensions.listing.borderRadius,
        marginBottom: 20,
    },
    previewAppearsWhenDoneText: {
        color: colors.lightModeText,
        fontFamily: 'PS-regular',
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
      borderRadius: 30,
      width: width -20,
      padding: 12,
      marginBottom: 20,
      marginTop: 20,
      elevation: 2,
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
    base64Img: {
        width: width - 20,
        height: width - 20,
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
        width: width - 20,
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
        width: width - 20,
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