import React, { useState } from 'react'
import { View, Text, SafeAreaView, TextInput, FlatList} from 'react-native'
import { COLORS, SIZES } from '../../constants'
import Button from '../../components/Button'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../../redux/features/counter'
import { addWord, selectTodos } from '../../redux/features/todos'


const HomeScreen = ({ }) => {

  const todos = useSelector(selectTodos)
  const [inputValue, setInputValue] = useState('')

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightGray, flex: 1 }}>
      <View style={{ alignItems: 'center', }}>
        <Text>Count: {count}</Text>
        <Button lable={'Increment'} isPrimary={true} handleOnPress={() => dispatch(increment())} />
        <Button lable={'Decrement'} isPrimary={false} handleOnPress={() => dispatch(decrement())} />
      </View>
      <View style={{ flex: 1, backgroundColor: COLORS.primary, paddingHorizontal: 10 }}>
        <TextInput
          onChangeText={(inputValue) => setInputValue(inputValue)}
          value={inputValue}
          style={{
            height: 30,
            minHeight: '7%',
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
            paddingLeft: 10,
            marginHorizontal: 10,
            borderBottomColor: 'white',
            borderBottomWidth: 2,
          }}
        />
        <Button lable={'ADD WORD'} isPrimary={false} handleOnPress={() => dispatch(addWord({ name: inputValue }))} />
        {todos.map((todo, index) => (
          <Text>{todo.name}</Text>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen