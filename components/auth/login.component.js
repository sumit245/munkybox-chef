import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { loginMethod } from '../../actions/actions';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../../firebase';
import PhoneInput from 'react-native-phone-number-input';
import { styles } from './auth.style';
import Logo from '../Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const firebaseConfig = firebase.apps.length
  ? firebase.app().options
  : undefined;
export default function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [entry, setEntry] = useState(true);
  const [verificationId, setVerificationId] = useState(null);
  const dispatch = useDispatch();
  const reCaptchaVerifier = useRef(null);
  const setentryMethod = async () => {
    const resp = await AsyncStorage.getItem('credential');
    try {
      const { entry } = resp;
      setEntry(entry);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setentryMethod();
  }, []);

  // const sendVerification = () => {
  //   navigation.navigate('OTP');
  // };

  const sendVerification = async () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const verificationId = await phoneProvider.verifyPhoneNumber(
      phone,
      reCaptchaVerifier.current
    );

    Promise.resolve(setVerificationId(verificationId))
      .then((res) => {
        navigation.push('OTP', {
          phoneNumber: phone,
          verificationId: verificationId,
          confirmCode: confirmCode,
        });
      })
      .catch((err) => console.log(err));
  };

  const confirmCode = async (code, verificationId) => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    await firebase.auth().signInWithCredential(credential);
    await Promise.resolve(dispatch(loginMethod(phone, navigation)));
  };

  return (
    <ImageBackground
      source={require('../../assets/chef-background.jpg')}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <FirebaseRecaptchaVerifierModal
          ref={reCaptchaVerifier}
          firebaseConfig={firebaseConfig}
          attemptInvisibleVerification={false}
        />

        <View style={styles.image}>
          <Logo />
        </View>

        <PhoneInput
          defaultCode="CA"
          layout="first"
          textInputProps={{
            returnKeyType: 'done',
            returnKeyLabel: 'Done',
            keyboardType: 'number-pad',
            selectionColor: '#ff6600',
          }}
          textContainerStyle={{
            borderColor: '#fff',
            height: 48,
            textAlignVertical: 'top',
            borderRadius: 5,
          }}
          codeTextStyle={{ marginTop: -6 }}
          textInputStyle={{ fontSize: 18, marginTop: -6 }}
          onChangeFormattedText={(text) => {
            setPhone(text);
          }}
          containerStyle={styles.phoneContainer}
          withShadow
          autoFocus
        />

        <LinearGradient colors={['#ff9900', '#ff6600']} style={styles.loginBtn}>
          <TouchableOpacity onPress={sendVerification}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
        </LinearGradient>

        <Text
          style={styles.forgot_button}
          onPress={() => navigation.navigate('Pin', { entry: false })}
        >
          Login With PIN
        </Text>
        <Text
          style={styles.forgot_button}
          onPress={() => navigation.navigate('Signup')}
        >
          Become our Partner{' '}
        </Text>
      </SafeAreaView>
    </ImageBackground>
  );
}
