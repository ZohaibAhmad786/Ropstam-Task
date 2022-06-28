import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { palette } from './src/constants/colors'
import MainNavigator from './src/navigation'
import { getDataFromAsyncStorage, returnError } from './src/utils/common'
import './src/utils/axios-interceptor'
import Loader from './src/components/loader'

const App = (props) => {

  const [loading, setLoading] = React.useState(true)
  const [hastoken, setHasToken] = React.useState(false);
  
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const storageResponse = await getDataFromAsyncStorage();
        setHasToken(storageResponse)
        setLoading(false)
      } catch (error) {

        setLoading(false);
        alert(returnError(error))
      }
    })()
  }, [])


  if (loading) {
    return (
      <Loader />
    )
  }

  else return (
    <SafeAreaView style={styles.CONTAINER}>
      <MainNavigator {...props} hastoken={hastoken} />
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  CONTAINER: { flex: 1 }
})