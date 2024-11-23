import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image ,CheckBox} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setCartItems } from '../index/action'; // Import action


const Payment = ({ route }) => {
  const { total } = route.params; // Tổng tiền thanh toán
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputError, setInputError] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy thông tin user từ Redux
  const cartItems = useSelector((state) => state.cartItems); // Lấy giỏ hàng từ Redux

  const [saveCard, setSaveCard] = useState(false); // Checkbox save card state

   // Lấy thông tin thẻ từ MockAPI khi màn hình load
  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(
          `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch card details.");
        const data = await response.json();
        const savedCard = data.cardDetails;

        if (savedCard) {
          setCardHolder(savedCard.cardHolder);
          setCardNumber(savedCard.cardNumber);
          setExpiryDate(savedCard.expiryDate);
          setSaveCard(true); // Nếu có thẻ, tự động chọn lưu thẻ
        }
      } catch (error) {
        console.error("Error fetching card details:", error.message);
      }
    };

    if (user && user.id) {
      fetchCardDetails();
    }
  }, [user]);

   // Xử lý thanh toán
  const handlePayment = async () => {
    if (!cardHolder.trim() || !cardNumber.trim() || !expiryDate.trim()) {
      setInputError(true);
      return;
    }

    const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase(); // Mã giao dịch ngẫu nhiên
    const transaction = {
      amount: total.toFixed(2),
      refNumber,
      date: new Date().toLocaleString(),
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })),
    };

    try {
      setModalVisible(true); // Hiển thị modal chờ

      // Lấy dữ liệu người dùng từ MockAPI
      const response = await fetch(
        `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch user data.");
      const userData = await response.json();
      const currentTransactions = userData.transactions || [];

      // Cập nhật danh sách giao dịch
      const updatedTransactions = [...currentTransactions, transaction];

      // Gửi yêu cầu cập nhật giao dịch vào MockAPI
      await fetch(
        `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transactions: updatedTransactions, // Cập nhật giao dịch
            cartItems: [], // Làm trống giỏ hàng
          }),
        }
      );

      // Nếu người dùng chọn lưu thẻ, gửi thông tin thẻ vào MockAPI
      if (saveCard) {
        await fetch(
          `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cardDetails: { cardHolder, cardNumber, expiryDate }, // Lưu thông tin thẻ
            }),
          }
        );
      }

      // Làm trống Redux cartItems
      dispatch(setCartItems([]));

      // Sau khi giao dịch thành công, điều hướng đến trang thanh toán
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Bill', {
          amount: total,
          refNumber,
        });
      }, 2000);

    } catch (error) {
      console.error('Error saving transaction:', error.message);
      Alert.alert('Error', 'Failed to process payment. Please try again later.');
      setModalVisible(false);
    }
  };





  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`
        );
        if (!response.ok) throw new Error('Failed to fetch cart items from server.');

        const data = await response.json();

        // Nếu Redux giỏ hàng đang trống, tải từ API
        if (cartItems.length === 0) {
          dispatch(setCartItems(data.cartItems || []));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
        Alert.alert('Error', 'Failed to load cart items. Please try again later.');
      }
    };

    if (user && user.id) {
      fetchCartItems();
    }
  }, [user, cartItems, dispatch]);



  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9f9f9' }}>
      {/* Thẻ tín dụng */}
      <View
        style={{
          backgroundColor: '#7B4AF5',
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          position: 'relative',
          width: '100%',
          height: 200,
          justifyContent: 'space-between',
        }}
      >
        {/* Icon chip bên trái */}
        <MaterialCommunityIcons
          name="integrated-circuit-chip"
          color="#FFC107"
          size={40}
          style={{ position: 'absolute', top: 20, left: 20 }}
        />

         {/* Logo MasterCard bên phải */}
  <Image
    source={{ uri: 'https://img.icons8.com/?size=100&id=62765&format=png&color=000000' }}
    style={{ width: 50, height: 50, position: 'absolute', top: 15, right: 20 }}
  />

        {/* Số thẻ tín dụng */}
        <Text
          style={{
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40,
            letterSpacing: 2,
          }}
        >
          {cardNumber || '•••• •••• •••• ••••'}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingHorizontal: 20,
          }}
        >
          {/* Tên chủ thẻ */}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {cardHolder || 'CARD HOLDER'}
          </Text>

          {/* Ngày hết hạn */}
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {expiryDate || 'MM/YY'}
          </Text>
        </View>
      </View>

      {/* Nhập thông tin thanh toán */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Card Holder</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginTop: 5,
          marginBottom: 10,
        }}
        placeholder="Name on Card"
        value={cardHolder}
        onChangeText={setCardHolder}
      />

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Card</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginTop: 5,
          marginBottom: 10,
        }}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Expiry Date</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginTop: 5,
          marginBottom: 10,
        }}
        placeholder="MM/YY"
        value={expiryDate}
        onChangeText={setExpiryDate}
      />
       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <CheckBox
          value={saveCard}
          onValueChange={setSaveCard}
        />
        <Text style={{ fontSize: 16, marginLeft: 10 }}>Save Card Details</Text>
      </View>

      

      {/* Nút thanh toán */}
      <TouchableOpacity
        style={{
          backgroundColor: '#7B4AF5',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={handlePayment}
      >
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Pay ${total.toFixed(2)}
        </Text>
      </TouchableOpacity>

      {/* Modal thông báo */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: cardHolder && cardNumber && expiryDate ? '#5cb85c' : '#d9534f',
              }}
            >
              {cardHolder && cardNumber && expiryDate ? 'Success' : 'Error'}
            </Text>
            <Text style={{ marginTop: 10, textAlign: 'center' }}>
              {cardHolder && cardNumber && expiryDate
                ? 'Payment successful!'
                : 'Please fill in all the fields.'}
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: cardHolder && cardNumber && expiryDate ? '#5cb85c' : '#d9534f',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Modal thông báo lỗi đầu vào */}
<Modal visible={inputError} transparent animationType="slide">
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
  >
    <View
      style={{
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#d9534f' }}>
        Missing Fields
      </Text>
      <Text style={{ marginTop: 10, textAlign: 'center', color: '#555' }}>
        Please fill in all required fields.
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: '#d9534f',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setInputError(false)} // Đóng modal khi người dùng bấm nút
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
  );
};

export default Payment;