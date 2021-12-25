import React, {useState, useRef} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal, Pressable, ScrollView, Linking, StatusBar  } from 'react-native';
import { colors } from '../../assets/values/colors';
import { defaultDimensions } from "../../assets/values/defaultDimensions";
import { img } from "../../assets/values/tempImage";
import relativeDate from "relative-date";


/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const ListingItemModal = (props) => {
    
    const handleListingClick = () => {
        props.handleListingClick();
    }
    
    // Hide the status bar, probably only for android
    StatusBar.setHidden(true);
    
    return (
        <Modal
        statusBarTranslucent
        animationType="fade"
        transparent={true}
        visible={props.isModalOpen}
        onRequestClose={() => {
          props.handleListingClick();
        }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.scrollV}>
                        <ScrollView>
                            <Image style={styles.listingImage} source={props.item.image}></Image>
                            <View style={styles.listingDetails}>
                                <Text style={styles.listingTitle}>{props.item.title}</Text>
                                <Text style={styles.listingPrice}>${props.item.price}</Text>
                                <View style={styles.listingDetailItemWrapper}>
                                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-author.png')}></Image>
                                    <Text numberOfLines={1} style={styles.listingText}>{props.item.author}</Text>
                                </View>
                                <View style={styles.listingDetailItemWrapper}>
                                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-isbn.png')}></Image>
                                    <Text numberOfLines={1} style={styles.listingText}>{props.item.isbn}</Text>
                                </View>
                                <View style={styles.listingDetailItemWrapper}>
                                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-course.png')}></Image>
                                    <Text numberOfLines={1} style={styles.listingText}>{props.item.courseCode}</Text>
                                </View>
                                <View style={styles.listingDetailItemWrapper}>
                                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-seller.png')}></Image>
                                    <Text numberOfLines={1} style={styles.listingText}>{props.item.sellerName}</Text>
                                </View>
                                <Text style={styles.timeStamp}>posted {relativeDate(props.item.uploadTimeStamp)}</Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.bottomList}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleListingClick()}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => Linking.openURL(`mailto:${props.item.sellerEmail}?subject=Regarding your listing "${props.item.title}"&body=Hello,\nI was wondering if "${props.item.title}" is still available?\n\n Thanks!`) }
                        >
                            <Text style={styles.textStyle}> Email </Text>
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
    listingImage: {
        width: width - 40,
        height: width - 40,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    listingDetails: {
        width: width - 40,
        padding: 10,
    },
    listingTitle: {
        fontFamily: defaultDimensions.listing.title.fontFamily,
        paddingRight: 4,
        fontSize: defaultDimensions.listing.title.fontSize + 10,
        color: colors.lightModeText,
    },
    listingText: {
        fontFamily: defaultDimensions.listing.description.fontFamily,
        paddingRight: 4,
        fontSize: defaultDimensions.listing.description.fontSize + 5,
        color: colors.lightModeText,
    },
    listingDetailItemWrapper: {
        flexDirection: 'row',
    },
    listingDetailItemIcon: {
        height: defaultDimensions.listing.description.fontSize + 5,
        width: defaultDimensions.listing.description.fontSize + 5,
    },
    timeStamp: {
        fontSize: defaultDimensions.listing.description.fontSize,
        fontFamily: 'PS-italic',
        color: colors.lightModeText,
    },
    listingPrice: {
        fontSize: defaultDimensions.listing.title.fontSize + 15,
        fontFamily: defaultDimensions.listing.title.fontFamily,
        color: colors.lightModeText,
    }
});


export default ListingItemModal;