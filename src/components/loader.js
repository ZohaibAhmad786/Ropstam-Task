import React from 'react'
import {View} from 'react-native'
import { Chase } from 'react-native-animated-spinkit'
import { palette } from '../constants/colors'
import { mvs } from '../constants/metrices'

// to show whole screen loader you can use this component rather than writing bunch of same code in different places.
export default function Loader({ ...props }) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Chase color={palette.black} size={mvs(35)} />
    </View>
  )
}