import { View, Text, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import useFetchData from '../../services/useFetchData'
import ServiceCard from '../../components/ServiceCard'

import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useFetchData();
  // const { data: posts, refetch } = useFetchData(() => SearchPosts(query));

  useEffect(() => {
    refetch()
  }, [query])
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ServiceCard service={item} key={index}/>
        )}
        ListHeaderComponent={() => (
          <View className='flex my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Result
            </Text>
            <Text className='text-2xl font-semibold text-white'>
              {query}
            </Text>
            
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Search