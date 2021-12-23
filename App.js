import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { colors } from './assets/values/colors';
import NavBar from './components/NavBar/NavBar';
import SavedPage from './components/SavedPage/SavedPage';
import SearchPage from './components/SearchPage/SearchPage';
import AddPage from './components/AddPage/AddPage';
import AccountPage from './components/AccountPage/AccountPage';

/* Fonts to load */
let customFonts = {
  'PS-bold-italic': require('./assets/fonts/ProductSansBoldItalic.ttf'),
  'PS-bold': require('./assets/fonts/ProductSansBold.ttf'),
  'PS-italic': require('./assets/fonts/ProductSansItalic.ttf'),
  'PS-regular': require('./assets/fonts/ProductSansRegular.ttf'),
};

export default function App() {
  // Load in the fonts
  let [fontsLoaded] = useFonts(customFonts);
  Font.loadAsync(customFonts);
  // Hide the status bar, probably only for android
  StatusBar.setHidden(true);

  /* States*/
  const [savedPage, setSavedPage] = useState(true);
  const [searchPage, setSearchPage] = useState(false);
  const [addPage, setAddPage] = useState(false);
  const [accountPage, setAccountPage] = useState(false);

  const openPage = (name) => {
    setSavedPage(name === 'Saved' ? true : false);
    setSearchPage(name === 'Search' ? true : false);
    setAddPage(name === 'Add' ? true : false);
    setAccountPage(name === 'Account' ? true : false);
  }


  if (!fontsLoaded) {
    return <AppLoading/>;
  } else {
    return (
      <SafeAreaView style={styles.pageStyle}>
        {savedPage && <SavedPage name={'Saved'}></SavedPage>}
        {searchPage && <SearchPage name={'Search'}></SearchPage>}
        {addPage && <AddPage name={'Add'}></AddPage>}
        {accountPage && <AccountPage name={'Account'}></AccountPage>}
        <NavBar navbarFunction={(name) => openPage(name)}></NavBar>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pageStyle: {
    flex: 1,
    backgroundColor: colors.lightModeBackground,
    paddingTop: StatusBar.currentHeight || 0,
  },
  appTitle: {
    paddingLeft: 25,
    color: colors.lightModeText,
    fontFamily: 'PS-bold',
    fontSize: 45,
    marginBottom: 10,
  },
});
