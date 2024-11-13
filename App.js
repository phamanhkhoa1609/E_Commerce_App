import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image,TouchableOpacity } from 'react-native';


import { Provider } from 'react-redux';
import store from './index/store';
import { useSelector } from 'react-redux';  // Nếu sử dụng Redux để quản lý state

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
import ForgotPassword from './components/ForgotPassWord'

const Stack = createStackNavigator();


const AllDealsHeader = ({ title }) => {
  const userId = useSelector(state => state.user.id); // Lấy userId từ Redux store
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        // Dùng userId từ Redux để lấy dữ liệu avatar
        const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`);
        const data = await response.json();
        setAvatarUrl(data.avatar); // Gắn URL avatar từ API
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    if (userId) {  // Kiểm tra userId đã có chưa trước khi gọi API
      fetchAvatar();
    }
  }, [userId]); // Chạy lại khi userId thay đổi

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity style={{ left: 140 }}>
        {avatarUrl ? (
          <Image
            source={{ uri: avatarUrl }}
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderRadius: 25,
              marginHorizontal: 20,
              backgroundColor: '#D9CBF6',
            }}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};


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
        <Stack.Screen name="Pass" component={ForgotPassword} />

         {/* Màn hình All Deals với header động */}
          <Stack.Screen
            name="All Deals"
            component={HomeScreen}
            options={{
              headerTitle: () => <AllDealsHeader title="All Deals"/>,
            }}
          />

           <Stack.Screen 
          name="Electronics" 
          component={Electronics} 
          options={{
              headerTitle: () => <AllDealsHeader title="Electronic" />,
            }}
        />

        <Stack.Screen 
          name="Fashion" 
          component={Fashion} 
          options={{
              headerTitle: () => <AllDealsHeader title="Fashion"/>,
            }}
        />

         <Stack.Screen 
          name="Furniture" 
          component={Furniture} 
         options={{
              headerTitle: () => <AllDealsHeader title="Furniture" />,
            }}
        />

        <Stack.Screen 
          name="Sporting" 
          component={Sporting} 
          options={{
              headerTitle: () => <AllDealsHeader title="Sporting"/>,
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
