import React, { use, useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  const [initializing, setInitiallizing] = useState(true);
  const [user, setUser] = useState();

  function onAuStateChanged(user: any){
    setUser(user);
    if(initializing){
      setInitiallizing(false);
    }
  }

  useEffect(()=>{

    GoogleSignin.configure({
      webClientId: "262190184642-1qcef02nnclhohe3trbhunlp3qbr9dri.apps.googleusercontent.com",
      offlineAccess: true
    })

    const subcriber = auth().onAuthStateChanged(onAuStateChanged);
    return subcriber;
  }, [])


  // đăng ký bằng google
  async function onGoogleButtonPress(){
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const result: any = await GoogleSignin.signIn();
      const idToken = result.data.idToken;
      if(!idToken){
        throw new Error("không có idToken trả về từ google");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      
      console.log("đăng nhập google thành công");
    } catch (error) {
      console.log("Lỗi ", error);
    }
  }
  // đăng ký
  const onSignUpWithEmail = ()=>{
    auth().createUserWithEmailAndPassword("hungcv@gmail.com", "123456");
    console.log("đăng ký thành công");
  }
  return (
    <View>
      <Text>chu văn hưng</Text>
      <Button title='Đăng ký' onPress={onSignUpWithEmail}></Button>
       <Button title='Đăng nhập bằng google' onPress={onGoogleButtonPress}></Button>
    </View>
  )
}

export default App