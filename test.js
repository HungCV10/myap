import React, { useState, useEffect } from 'react'
import { Button, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin, statusCodes } from
  '@react-native-google-signin/google-signin';
const App = () => {


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    GoogleSignin.configure({

      // Client ID of type WEB for your server (needed
      // to verify user ID and offline access)
      webClientId: '262190184642-1qcef02nnclhohe3trbhunlp3qbr9dri.apps.googleusercontent.com',
      offlineAccess: true,
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onSignUpWithPassword = () => {
    auth().createUserWithEmailAndPassword(
      'hung.doe@example.com',
      'SuperSecretPassword!',
    );
  };


  // đăng nhập bằng google
  async function onGoogleButtonPress() {
    console.log("đăng nhập google");
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      const result: any = await GoogleSignin.signIn();
      const idToken = result.data.idToken;
      console.log("abc1", idToken);
      if (!idToken) {
        throw new Error('Không có idToken trả về từ Google');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('Đăng nhập Google + Firebase thành công!');
    } catch (error: any) {
      console.log('Google Sign-In Error:', error.message);
    }
  }

  return (
    <View>
      <Button title='đăng ký' onPress={onSignUpWithPassword}></Button>
      <Button title="Đăng nhập google" onPress={onGoogleButtonPress} />

    </View>
  )
}

export default App