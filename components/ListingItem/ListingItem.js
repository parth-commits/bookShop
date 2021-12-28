import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../assets/values/colors';
import { defaultDimensions } from "../../assets/values/defaultDimensions";
import ListingItemModal from "./ListingItemModal";
import { img } from "../../assets/values/tempImage";
import relativeDate from "relative-date";

/* Device dimensions, use to optimize for device of all sizes */
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const ListingItem = (props) => {
    //'../../assets/images/bookmark-off.png'
    const bookmarks = {
        on: require('../../assets/images/bookmark-on.png'),
        off: require('../../assets/images/bookmark-off.png'),
    }

    const [isBookMarked, setIsBookMarked] = useState(props.isBookmarked ? true : false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleBookMarkClick = () => {
        setIsBookMarked(!isBookMarked);
        console.log('bookmark clicked');
    }
    const handleListingClick = () => {
        console.log('listing clicked');
        setIsModalOpen(!isModalOpen);
    }
    

    return (
        <View>
            {isModalOpen && (<ListingItemModal item={props.item} handleListingClick={handleListingClick} isModalOpen={isModalOpen}></ListingItemModal>)}
            <TouchableOpacity activeOpacity={0.9} style={styles.ListingItem} onPress={() => handleListingClick()}>
                <Image style={styles.listingImage} source={{uri: props.item.image}}></Image>
                <View style={styles.listingDetails}>
                    <Text numberOfLines={1} style={styles.listingTitle}>{props.item.title}</Text>
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
                        <Text numberOfLines={1} style={[styles.listingText, {paddingRight: 90}]}>{props.item.sellerName}</Text>
                    </View>
                    <Text style={styles.timeStamp}>posted {relativeDate(props.item.uploadTimeStamp)}</Text>
                </View>
                <View style={styles.listingPriceAndBookmark}>
                    <Text style={styles.listingPrice}>${props.item.price}</Text>
                    { !props.hideBookMark && (<TouchableOpacity activeOpacity={0.7} onPress={() => handleBookMarkClick()}><Image style={styles.listingBookmark} source={isBookMarked ? bookmarks.on : bookmarks.off}></Image></TouchableOpacity>)}
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    ListingItem: {
        width: width - 20,
        height: defaultDimensions.listing.height,
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
        paddingRight: 8,
        fontSize: defaultDimensions.listing.description.fontSize,
    },
    listingDetailItemWrapper: {
        flexDirection: 'row',
        paddingRight: 8,
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