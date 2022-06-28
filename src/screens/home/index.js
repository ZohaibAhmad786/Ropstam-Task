import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { palette } from '../../constants/colors';
import FeedCard from '../../components/feed-card';
import { Regular } from '../../components/typography/regular-text';
import { mvs } from '../../constants/metrices';
import { getDataFromAsyncStorage, returnError } from '../../utils/common';
import { ImageButtom } from '../../components/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../components/loader';

const HomeScreen = (props) => {

  const [loading, setLoading] = React.useState(true);
  const [refetch, setRefetch] = React.useState({
    message: "",
    boolean: false
  });

  const [feeds, setFeeds] = React.useState([])
  const [userData, setUserData] = React.useState(null)



  //this function will execute and return the feeds list
  const fetchFeeds = async () => {
    try {
      const storageResponse = await getDataFromAsyncStorage();
      setUserData(storageResponse)
      // you can see the client there which is axios intercepter if user is logged in and you have store the key in async_storage your axios intercepter will get token  from there and put that into header as Bearer token
      const response = await client.get();
      setFeeds(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false)
      setRefetch({
        boolean: true,
        message: returnError(error)
      })
    }
  }


  //this is life cycle hook,
  React.useEffect(() => {
    fetchFeeds()
  }, [])


  //this function clear app the data from the async storage and also reset the route to login screen.
  const onSignout = async () => {
    try {
      await AsyncStorage.clear()
      props.navigation.reset({ index: 0, routes: [{ name: 'signin' }] })

    } catch (error) {
      setRefetch({
        boolean: true,
        message: returnError(error)
      })
    }
  };


  if (loading) {
    return (
    <Loader />
    )
  } else if (!loading && refetch.message) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Regular label={refetch.message} />
      </View>
    )
  } else return (
    <View style={{ flex: 1, backgroundColor: palette.white }}>
      <View style={{ marginVertical: mvs(10), paddingHorizontal: mvs(20), justifyContent: 'space-between', flexDirection: 'row' }}>
        <Regular label={`Username : ${userData.user.username}`} />
        <ImageButtom onPress={() => onSignout()} />
      </View>
      <FlatList
        data={feeds}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: mvs(20) }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={FeedCard}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})