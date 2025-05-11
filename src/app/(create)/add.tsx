import AddExpenseForm from '@/src/components/AddExpenseForm'
import AddExpenseHeader from '@/src/components/AddExpenseHeader'
import React from 'react'
import { View } from 'react-native'

const Page = () => {
  return (
    <View className='flex-1 pt-20 bg-black'>
      <AddExpenseHeader />
      <AddExpenseForm />
    </View>
  )
}

export default Page