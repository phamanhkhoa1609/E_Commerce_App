import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image,TouchableOpacity } from 'react-native';


import { Provider } from 'react-redux';
import store from './index/store';


import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import Electronics from './components/Electronics';
import Fashion from './components/Fashion';
import Furniture from './components/Furniture';
import Sporting from './components/Sporting';
import ElectronicDetail from './components/ElectronicDetail'
import FashionDetail from './components/FashionDetail'
import FurnitureDetail from './components/FurnitureDetail'
import SportingDetail from './components/SportingDetail'
import CartScreen from './components/CartScreen'; 
import FavoriteScreen from './components/FavoriteScreen'
import SignUpScreen from './components/SignUpScreen'
import ReviewScreen from './components/ReviewScreen'
import ProfileScreen from './components/ProfileScreen'
import ChatScreen from './components/ChatScreen';

import Payment from './components/Payment'
import PaymentSuccess from './components/PayMentSuccess'
import SanPhamBanDetail from './components/SanPhamBanDetail'

import GiaoDich from './components/GiaoDich'

import SeeAll from './components/SeeAll'

import Sold from './components/Sold'

import SanPhamDaDang from './components/SanPhamDaDang'
import SanPhamBanEdit from './components/SanPhamBanEdit'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="All Review" component={ReviewScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Bill" component={PaymentSuccess} />
        <Stack.Screen name="Giao Dich" component={GiaoDich} />
        <Stack.Screen name="All Products" component={SeeAll} />
        <Stack.Screen name="Sold" component={Sold} />
        <Stack.Screen name="Detail" component={SanPhamBanDetail} />
        <Stack.Screen name="List" component={SanPhamDaDang} />
        <Stack.Screen name="Edit" component={SanPhamBanEdit} />

        <Stack.Screen 
          name="All Deals" 
          component={HomeScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>All Deals</Text>
                <TouchableOpacity style={{left:146}}>
                <Image source={require('./assets/nguoi.png')} style={{ width: 50, height: 50,borderWidth:1,borderRadius:50,paddingHorizontal:15,marginHorizontal:20 , backgroundColor: '#D9CBF6'}} />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

           <Stack.Screen 
          name="Electronics" 
          component={Electronics} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Electronics</Text>
                
              </View>
            ),
          }}
        />

        <Stack.Screen 
          name="Fashion" 
          component={Fashion} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Fashion</Text>
               
              </View>
            ),
          }}
        />

         <Stack.Screen 
          name="Furniture" 
          component={Furniture} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Furniture</Text>
               
              </View>
            ),
          }}
        />

        <Stack.Screen 
          name="Sporting" 
          component={Sporting} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Sporting</Text>
               
              </View>
            ),
          }}
        />
          <Stack.Screen 
          name="ElectronicDetail" 
          component={ElectronicDetail} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Details</Text>
               
              </View>
            ),
          }}
        />

         <Stack.Screen 
          name="FashionDetail" 
          component={FashionDetail} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Details</Text>
               
              </View>
            ),
          }}
        />

        <Stack.Screen 
          name="FurnitureDetail" 
          component={FurnitureDetail} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Details</Text>
               
              </View>
            ),
          }}
        />

        <Stack.Screen 
          name="SportingDetail" 
          component={SportingDetail} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Details</Text>
               
              </View>
            ),
          }}
        />
        <Stack.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>Cart</Text>
               
              </View>
            ),
          }}
        />

        <Stack.Screen 
          name="FavoriteScreen" 
          component={FavoriteScreen} 
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'space-between'}}>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>WishList</Text>
               
              </View>
            ),
          }}
        />
        
        


      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
