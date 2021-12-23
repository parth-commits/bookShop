import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/values/colors';
import { defaultDimensions } from "../../assets/values/defaultDimensions";
import { img } from "../../assets/values/tempImage";
/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const ListingItem = (props) => {
    
    return (
        <View style={styles.ListingItem}>
            <Image style={styles.listingImage} source={img}></Image>
            <View style={styles.listingDetails}>
                <Text numberOfLines={1} style={styles.listingTitle}>For Earth's Sake - Towards a Passionate Ecology</Text>
                <View style={styles.listingDetailItemWrapper}>
                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-author.png')}></Image>
                    <Text numberOfLines={1} style={styles.listingText}>Steven Scharper & Simon Appoloni</Text>
                </View>
                <View style={styles.listingDetailItemWrapper}>
                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-isbn.png')}></Image>
                    <Text numberOfLines={1} style={styles.listingText}>9782896465217</Text>
                </View>
                <View style={styles.listingDetailItemWrapper}>
                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-course.png')}></Image>
                    <Text numberOfLines={1} style={styles.listingText}>ENV100</Text>
                </View>
                <View style={styles.listingDetailItemWrapper}>
                    <Image style={styles.listingDetailItemIcon} source={require('../../assets/images/listing-icon-seller.png')}></Image>
                    <Text numberOfLines={1} style={styles.listingText}>Parth Patel</Text>
                </View>
                <Text style={styles.timeStamp}>posted 10hrs ago</Text>
            </View>
            <View style={styles.listingPriceAndBookmark}>
                <Text style={styles.listingPrice}>$15</Text>
                <TouchableOpacity><Image style={styles.listingBookmark} source={require('../../assets/images/bookmark-off.png')}></Image></TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    ListingItem: {
        width: width - 20,
        height: defaultDimensions.listing.height,
        marginLeft: 10,
        backgroundColor: '#777',
        borderRadius: defaultDimensions.listing.borderRadius,
        flexDirection: 'row',
        elevation: 15,
    },
    listingImage: {
        width: defaultDimensions.listing.height,
        height: defaultDimensions.listing.height,
        borderBottomLeftRadius: defaultDimensions.listing.borderRadius,
        borderTopLeftRadius: defaultDimensions.listing.borderRadius,
    },
    listingDetails: {
        width: width - 20 - defaultDimensions.listing.height,
        height: defaultDimensions.listing.height,
        backgroundColor: '#FFF',
        borderBottomRightRadius: defaultDimensions.listing.borderRadius,
        borderTopRightRadius: defaultDimensions.listing.borderRadius,
        padding: 4,
    },
    listingTitle: {
        fontFamily: defaultDimensions.listing.title.fontFamily,
        paddingRight: 4,
        fontSize: defaultDimensions.listing.title.fontSize,
    },
    listingText: {
        fontFamily: defaultDimensions.listing.description.fontFamily,
        paddingRight: 4,
        fontSize: defaultDimensions.listing.description.fontSize,
    },
    listingDetailItemWrapper: {
        flexDirection: 'row',
    },
    listingDetailItemIcon: {
        height: defaultDimensions.listing.description.fontSize,
        width: defaultDimensions.listing.description.fontSize,
    },
    timeStamp: {
        fontSize: defaultDimensions.listing.description.fontSize,
        fontFamily: 'PS-italic',
    },
    listingPrice: {
        
        fontFamily: defaultDimensions.listing.price.fontFamily,
        fontSize: defaultDimensions.listing.price.fontSize,
        marginRight: 3,
    },
    listingPriceAndBookmark: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        right: defaultDimensions.listing.borderRadius/2,
        bottom: defaultDimensions.listing.borderRadius/4,
    },
    listingBookmark: {
        width: defaultDimensions.listing.price.fontSize-10,
        height: defaultDimensions.listing.price.fontSize-10,
    },
});


export default ListingItem;