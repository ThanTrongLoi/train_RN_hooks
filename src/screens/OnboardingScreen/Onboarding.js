import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import { COLORS, SIZES } from '../../constants'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import data from '../../data/onboarding'

const Onboarding = ({navigation}) => {

  const fRef = useRef();
  const [currentPage, setCurrentPage] = useState(0)
  const [viewableItems, setViewableItems] = useState([])

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    setViewableItems(viewableItems)
  })

  useEffect(() => {
    if (!viewableItems[0] || currentPage == viewableItems[0].index) {
      return;
    }
    setCurrentPage(viewableItems[0].index)
  }, [viewableItems])

  const handleNext = () => {
    if(currentPage == data.length-1)
      return;
    
    fRef.current.scrollToIndex({
      animated: true,
      index: currentPage + 1
    })
  }

  const handleBack = () => {
    if(currentPage==0 )
      return;
    
    fRef.current.scrollToIndex({
      animated: true,
      index: currentPage -1
    })
  }

  const handleSkipToEnd = () => {
    fRef.current.scrollToIndex({
      animated: true,
      index: data.length -1
    })
  }

  const renderTopSection = () => {
    return (
      <SafeAreaView>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.base * 2
        }}>
          {/* Back button */}
          {/* Hide back button on 1st screen */}
          <TouchableOpacity 
          onPress={handleBack}
          style={{ padding: SIZES.base }}>
            {/* Back icon */}
            <AntDesignIcons name='left' style={{
              fontSize: 25,
              color: COLORS.black,
              opacity: currentPage == 0 ? 0 : 1
            }} />
          </TouchableOpacity>
          {/* skip button */}
          {/* Hide skip button on last screen */}
          <TouchableOpacity>
            <Text 
            onPress={handleSkipToEnd}
            style={{
              fontSize: 18,
              color: COLORS.black,
              opacity: currentPage == data.length - 1 ? 0 : 1,
            }}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
  const renderBottomSection = () => {
    return (
      <SafeAreaView>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.base * 2,
          paddingVertical: SIZES.base * 2
        }}>
          {/* Pagination */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {
              [...Array(data.length)].map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: index == currentPage ? COLORS.primary : COLORS.primary + '20',
                    marginRight: 8
                  }} />
              ))
            }
          </View>
          {/* Next or GetStarted button */}
          {/* Show or hide next button & getstarted button by screen */}
          {
            currentPage != data.length -1 ? (
              <TouchableOpacity 
              onPress={handleNext}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: COLORS.primary
              }}>
                <AntDesignIcons
                  name="right"
                  style={{ fontSize: 18, color: COLORS.white, opacity: 0.3 }} />
                <AntDesignIcons
                  name="right"
                  style={{ fontSize: 25, color: COLORS.white, marginLeft: -15 }} />
              </TouchableOpacity>
            ) : (
              // get started button
              <TouchableOpacity 
              onPress={()=>{navigation.navigate('WelcomeScreen')}}
              style={{
                paddingHorizontal: SIZES.base*2,
                height: 60,
                borderRadius: 30,
                backgroundColor: COLORS.primary,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 18,
                  color: COLORS.white,
                  marginLeft: SIZES.base
                }}>Get Started</Text>
                <AntDesignIcons name='right'
                  style={{fontSize: 18, color: COLORS.white, opacity: 0.3, marginLeft: SIZES.base}}
                />
                <AntDesignIcons name='right'
                  style={{fontSize: 25, color: COLORS.white, marginLeft: -15}}
                />
              </TouchableOpacity>
            )
          }
          
        </View>
      </SafeAreaView>
    )
  }
  const renderFlatListItem = ({ item }) => {
    return (
      <View style={{
        width: SIZES.width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{
          alignItems: 'center',
          marginVertical: SIZES.base * 2
        }}>
          <ImageBackground
            source={item.img}
            style={{
              width: 335,
              height: 335,
              resizeMode: 'contains'
            }}
          />
        </View>
        <View style={{ paddingHorizontal: SIZES.base * 4, marginVertical: SIZES.base * 4 }}>
          <Text style={{ fontSize: 30, textAlign: 'center', fontWeight: 'bold' }}>{item.title}</Text>
          <Text style={{
            fontSize: 18,
            opacity: 0.4,
            textAlign: 'center',
            marginTop: 15,
            lineHeight: 28
          }}>{item.description}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.background,
      justifyContent: 'center'
    }}>
      <StatusBar barStyle='dark-content' backgroundColor={COLORS.background} />
      {/* TOP SECTION - Back & Skip Button */}
      {renderTopSection()}

      {/* FLATLIST with pages */}
      <FlatList
        data={data}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        renderItem={renderFlatListItem}

        ref={fRef}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        initialNumToRender={1}
        extraData={SIZES.width}
      />
      {/* BOTOTM SECTION - pagination & next or GetStarted */}
      {renderBottomSection()}
    </View>
  )
}

export default Onboarding