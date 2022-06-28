import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { mvs } from '../../constants/metrices'
import { palette } from '../../constants/colors'
import { Input } from '../../components/input'
import { CustomizedButton, ImageButtom } from '../../components/button'
import { Regular } from '../../components/typography/regular-text'
import axios from 'axios'
import apiCollection from '../../utils/api-collection'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions } from '@react-navigation/native'
import { returnError, signinValidation } from '../../utils/common'

const SignInScreen = (props) => {

  const { navigation } = props
  const [loading, setLoading] = React.useState(false)
  const [authState, setAuthState] = React.useState({
    "email": "hassan.zafar@ropstam.com",
    "password": "12345678",
    "device_token": "zasdcvgtghnkiuhgfde345tewasdfghjkm"
  })


  console.log(authState)

  //this function update the state through key value
  const onChangeState = (key, value) => {
    setAuthState({ ...authState, [key]: value })
  }



  const onLogin = async () => {
    try {
      const validator =signinValidation(authState)
     if(!validator.status) throw new Error(validator.message)
      setLoading(true)
      const { data: response } = await axios.post(apiCollection.authentication, authState)
    if(response.meta.status===200){
      await AsyncStorage.setItem("@token", JSON.stringify(response.data))
      navigation.dispatch(StackActions.replace('home'));
      setLoading(false)
    }else{
      throw new Error(response.meta.message)
    }
    } catch (error) {
      setLoading(false)
      alert(returnError(error))

    }
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1, backgroundColor: palette.lighBlue,
        paddingTop: mvs(100)
      }}>
      <View style={{ paddingHorizontal: mvs(25), }}>
        <Regular label={'Hello Again!'} style={{ fontSize: mvs(30), fontWeight: 'bold', textAlign: 'center' }} />

        <View style={{ marginVertical: mvs(20) }}>
          <Regular label={'Chance to get your\nlife better'} style={{ fontSize: mvs(22), textAlign: 'center' }} />
        </View>

        <Input placeholder='Enter Email Address' value={authState.email} keyboardType='email-address' onChange={(value) => onChangeState('email', value)} />
        <Input placeholder='Enter Password' value={authState.password} secureEntry keyboardType='default' onChange={(value) => onChangeState('password', value)} />

        <View style={{ flexDirection: 'row-reverse', marginBottom: mvs(40) }}>
          <Regular label={'Recovery Password'} />
        </View>

        <CustomizedButton disabled={loading} loading={loading} title={'Login'} onPress={() => onLogin()} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: mvs(40) }}>
          <ImageButtom btnStyle={styles.SOCIAL_BUTTON_CONTAINER} source={require('./../../assets/social/google.png')} />
          <ImageButtom btnStyle={styles.SOCIAL_BUTTON_CONTAINER} source={require('./../../assets/social/facebook.png')} />
          <ImageButtom btnStyle={styles.SOCIAL_BUTTON_CONTAINER} source={require('./../../assets/social/twitter.png')} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SignInScreen

const styles=StyleSheet.create({
  SOCIAL_BUTTON_CONTAINER:{ borderWidth: 1, borderColor: palette.white, height: mvs(45),width:mvs(45), borderRadius: mvs(5), overflow: 'hidden' }
})

