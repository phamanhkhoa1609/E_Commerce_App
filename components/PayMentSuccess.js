import React, { useRef,useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,

  ScrollView,
} from 'react-native';


const PaymentSuccessScreen = ({ navigation, route }) => {
  const { amount, refNumber } = route.params; // Loại bỏ paymentOption
  const viewRef = useRef();

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString();
  const timeString = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const [userData, setUserData] = useState(null);
   const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux

 // Fetch user data from API (including address)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (user && user.id) {
      fetchUserData();
    }
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ width: '100%', height: 'auto' }} ref={viewRef}>
        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <Image
            source={require('../assets/paymentsuccess.png')}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>

        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
          Payment success!
        </Text>

        <View
          style={{
            width: '100%',
            backgroundColor: '#F7F7F7',
            borderRadius: 10,
            padding: 16,
            marginBottom: 20,
            position: 'relative',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: 'gray' }}>Ref number</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{refNumber}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: 'gray' }}>Date</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              {dateString}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: 'gray' }}>Time</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              {timeString}
            </Text>
          </View>
          {/* New Address Section */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: 'gray' }}>Address</Text>
            {userData ? (
    
    <Text style={{ fontSize: 14, fontWeight: 'bold'  }}>
      {userData.address}
    </Text>
    
  ) : (
    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
      Loading address...
    </Text>
  )}
          </View>

          
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: 'gray' }}>Payment method</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Banking</Text>
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: '#ccc',
              position: 'absolute',
              top: 65,
              left: 16,
              right: 16,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 14, color: 'gray' }}>Amount</Text>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
              ${amount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
      

      <TouchableOpacity
        style={{
          backgroundColor: '#00AEEF',
          borderRadius: 10,
          paddingVertical: 15,
          paddingHorizontal: 20,
          width: '100%',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('All Deals')}
      >
        <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
          Back Home
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PaymentSuccessScreen;