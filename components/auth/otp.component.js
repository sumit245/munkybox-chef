import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './auth.style';
import { useNavigationState } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { width } from '../../Dimens';

export default function OtpComponent({ route, navigation }) {
  const { phoneNumber, confirmCode, verificationId } = route.params;
  const [message, setMessage] = useState(
    'A Verification code has been sent to your mobile'
  );
  const [verificationCode, setVerificationCode] = useState('');
  const routes = useNavigationState((state) => state.routes);
  const currentRoute = routes[routes.length - 1].name;
  const otpInput = useRef(null);
  return (
    <ImageBackground
      source={require('../../assets/chef-background.jpg')}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#ff9900', '#ff6600']}
          style={{
            alignSelf: 'flex-start',
            height: 28,
            width: 28,
            marginHorizontal: 4,
            borderRadius: 14,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="chevron-back-sharp" size={28} color="#ffffff" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.mobin}>
          <Text style={styles.instructions}>
            {message || ''} {phoneNumber || ''}
          </Text>
          <OTPTextView
            handleTextChange={(text) => setVerificationCode(text)}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
            tintColor="#ff6600"
            selectionColor="#ff6600"
            textInputProps={{
              returnKeyType: 'done',
              returnKeyLabel: 'Done',
              selectionColor: '#ff6600',
              keyboardType: 'number-pad',
            }}
            returnKeyType="done"
            inputCellLength={1}
            ref={otpInput}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.instructions}>OTP valid for</Text>
            <CountDown
              until={59}
              digitStyle={{
                marginLeft: -2,
                marginTop: 6,
                marginRight: -4,
              }}
              digitTxtStyle={{ color: '#fff', fontSize: 16 }}
              timeLabels={{ s: null }}
              onFinish={() => {
                if (currentRoute === 'OTP') {
                  alert('Try again after some time!!!');
                }
              }}
              timeToShow={['S']}
            />
            <Text style={styles.instructions}>seconds</Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <TouchableOpacity
              style={[
                styles.loginBtn,
                {
                  width: width / 2.5,
                  height: 40,
                  marginHorizontal: 10,
                  backgroundColor: '#ffffff',
                },
              ]}
              onPress={() => otpInput.current.clear()}
            >
              <Text
                style={[
                  styles.btnText,
                  {
                    color: '#f00',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  },
                ]}
              >
                Clear
              </Text>
            </TouchableOpacity>
            <LinearGradient
              colors={['#ff9900', '#ff6600']}
              style={[
                styles.loginBtn,
                { width: width / 2.5, marginHorizontal: 10, height: 40 },
              ]}
            >
              <TouchableOpacity
                onPress={() => confirmCode(verificationCode, verificationId)}
              >
                <Text style={[styles.btnText, { textTransform: 'capitalize' }]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
