import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { FlatList } from 'react-native'
import { FlatListComponent } from 'react-native'

import useFetch from '../../../hook/useFetch';

const Popularjobs = () => {
  const router = useRouter();
  const {data, isLoading, error} = useFetch('search', {
    query: "Jobs in India",
    num_pages: "1"
  })
  
  // console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Popular Jobs
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {
          isLoading ?
            (<ActivityIndicator size="large" colors={COLORS.primary} />)
          : error ? (
            <Text> Something went wrong</Text>
          )
          :
          (<FlatList
            horizontal
            data={data}
            renderItem={({item}) => (
              <PopularJobCard item={item}/>
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{columnGap: SIZES.medium}}
          />)
        }
      </View>
    </View>
  )
}

export default Popularjobs