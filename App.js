import React, { Component, StrictMode } from 'react';
import {SafeAreaView , ScrollView, RefreshControl, StyleSheet, View, Modal, Text, Button, Image , Platform} from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: 0,
      uri: 'https://dev.parajo.com',
      refreshing: false,
      refreshing_enable: false,
      isSplashVisible: true,
    };

    imageRequire = null;
    webview = null;


    this.requireSplashImg();
  }

  componentDidMount() {

    this.timeShadeSplashScreen();
  }

  componentWillUnmount() {

  }

 onRefresh = () => {
    //console.log('onRefresh!');
    this.setState({refreshing : true});
    this.webview.reload();
    
    this.wait(1500).then(() => {
      this.setState({refreshing : false, refreshing_enable : false});
    });
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  hide_Splash_Screen=()=>{
    console.log('hide_Splash_Screen');
      this.setState({ isSplashVisible : false});
  }

  timeShadeSplashScreen(){
    console.log('timeShadeSplashScreen');
    that = this;
    setTimeout(function () {
      that.hide_Splash_Screen();
    }, 4000);

  }

  getRandNum(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  }

  requireSplashImg(){
    console.log('splash in')
    if(imageRequire) return;
    console.log('splash go')
    let randnum = this.getRandNum(0,3);

    if (randnum ==0){
      imageRequire = require('./img/splash_image1.png');
      console.log('splash 0')
    }
    else if (randnum ==1){
      imageRequire = require('./img/splash_image2.png');
      console.log('splash 1');
    }
    else if (randnum ==2){
      imageRequire = require('./img/splash_image3.png');
      console.log('splash 2')
    }
  }

  render() {

    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
        <Image source={imageRequire} style={{width:'100%', height: '100%', resizeMode:'cover'}}/>  
        </View>
      </View> 
    );

    return (
      <SafeAreaView style = {styles.MainContainer}>   
        <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
           <RefreshControl refreshing={this.state.refreshing} enabled={this.state.refreshing_enable} onRefresh={this.onRefresh}/>
        } 
        >
        { <WebView
          bounces={false}
          enableNavigate={false}
          ref={ref => (this.webview = ref)}
          source={{ uri: this.state.uri }}
          //onNavigationStateChange={this.handleWebViewNavigationStateChange}
          // onMessage={this.handleDataReceived}
          cacheEnabled={false}
          // pullToRefreshEnabled={true}
          cacheMode={'LOAD_NO_CACHE'}
        /> }
        </ScrollView>
        {
            (this.state.isSplashVisible === true) ? Splash_Screen: null
        }
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: (Platform.OS == 'ios') ? 20 : 0,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
  },
  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  SplashScreen_ChildView: {
    //justifyContent: 'center',
   // alignItems: 'center',
    flex: 1,
  },
});