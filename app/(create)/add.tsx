import AddExpenseForm from '@/components/AddExpenseForm'
import AddExpenseHeader from '@/components/AddExpenseHeader'
import React from 'react'
import { View } from 'react-native'

const AddItem = () => {
  return (
    <View className='flex-1 pt-20 bg-black'>
      <AddExpenseHeader />
      <AddExpenseForm />
    </View>
  )
}

export default AddItem