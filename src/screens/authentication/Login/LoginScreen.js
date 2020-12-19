/* eslint-disable react/no-string-refs */
import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  BackHandler,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Text
} from 'react-native';
import Layout from '../../../constants/Layout';
import colors from '../../../constants/Colors'
import Colors from '../../../constants/Colors';
import { authRef } from '../../../services/firebase';
import OTPInputView from '@twotalltotems/react-native-otp-input'


export default class LoginScreen extends React.Component {

  state = {
    phoneNumber: null,
    otp: null,
    isLoading: false,
    code: '',
    sucessAck: false
  }


  componentDidMount() {
    Keyboard.dismiss();
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    BackHandler.exitApp();
    return true;
  }

  //validate and set the value of text field  
  onChangeText = (field, value) => {
    value.length <= 10 &&
      this.setState({ [`${field}`]: value });
    if (value.length === 10) {
      this.setState({ isLoading: true })
      authRef.signInWithPhoneNumber(`+91${value}`)
        .then((confirmResult) => {
          this.setState({ confirmResult, isLoading: false, sucessAck: true });
        })
        .catch((error) => {
          console.log("error",error)
          this.setState({ isLoading: false })
          Alert.alert("Please enter valid number")
        });
    }
  }


  onFinishCheckingssssCode = async code => {
    const { confirmResult } = this.state;
    this.setState({ code });
    confirmResult.confirm(code)
      .then(() => {
        this.props.onLogin(confirmResult)
      })
      .catch((e) => {
        console.log('---->error', e); // Invalid code
        this.setState({
          code: '', phone: null
        })
        // Alert.alert(
        //   'Confirmation Code',
        //   'Code not match! Try Again',
        //   [{
        //     text: 'OK',
        //     onPress: () => {
        //     },
        //   }],
        //   { cancelable: false },
        // );
        this.props.onLogin(confirmResult)
      });
  }


  render() {
    const { phoneNumber, isLoading, code, sucessAck } = this.state

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ backgroundColor: '#ffff', flex: 1 }}>
          <View style={styles.square} />
          <View style={styles.triangleCornerTopRight} />

          <TextInput
            value={phoneNumber}
            ref={ref => this.emailRef = ref}
            blurOnSubmit={false}
            placeholder="Mobile Number"
            returnKeyType='next'
            style={styles.fieldValue}
            keyboardType="number-pad"
            onChangeText={phone => this.onChangeText('phoneNumber', phone)}
          />

          {isLoading && <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 30 }} />}
          {sucessAck && <>
            <OTPInputView
              style={{ width: '65%', height: 200, alignSelf: 'center' }}
              pinCount={6}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => { this.setState({ code }) }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={this.onFinishCheckingssssCode}
            />
            <Text style={{ alignSelf: 'center' }}>Please Enter OTP</Text>
          </>}
        </View>
      </TouchableWithoutFeedback >
    );
  }
}

const styles = StyleSheet.create({
  square: {
    height: 130,
    backgroundColor: colors.primary,
  },
  triangleCornerTopRight: {
    width: '100%',
    borderTopWidth: 150,
    borderBottomWidth: 0,
    borderLeftWidth: Layout.window.width,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
    borderTopColor: colors.primary
  },
  fieldValue: {
    borderWidth: 1,
    paddingLeft: 10,
    borderBottomColor: colors.dividerColor,
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 50
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },
  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderBottomWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
});
