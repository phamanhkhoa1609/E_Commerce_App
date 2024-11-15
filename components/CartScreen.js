import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, Alert ,Modal} from 'react-native';
import { increaseQuantity, decreaseQuantity, removeFromCart, setCartItems } from '../index/action';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false); // Quản lý trạng thái của Modal
  const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

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



  // Fetch dữ liệu giỏ hàng từ API khi màn hình được hiển thị
  useEffect(() => {
  const fetchCartItems = async () => {
    try {
      const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`);
      if (!response.ok) throw new Error('Failed to fetch cart items from server.');

      const data = await response.json();

      // Đảm bảo tất cả sản phẩm có `quantity` mặc định là 1 nếu thiếu
      const updatedCartItems = (data.cartItems || []).map((item) => ({
        ...item,
        quantity: item.quantity || 1, // Đặt `quantity` mặc định nếu chưa có
      }));

      dispatch(setCartItems(updatedCartItems));
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
      Alert.alert('Error', 'Failed to load cart items. Please try again later.');
    }
  };

  if (user && user.id) {
    fetchCartItems();
  }
}, [user, dispatch]);


  // Đồng bộ dữ liệu giỏ hàng lên API
  const syncCartToAPI = async (updatedCartItems) => {
    try {
      const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: updatedCartItems }),
      });

      if (!response.ok) throw new Error('Failed to sync cart items with server.');
    } catch (error) {
      console.error('Error syncing cart items:', error.message);
      Alert.alert('Error', 'Failed to sync cart items. Please try again later.');
    }
  };

  const handleIncreaseQuantity = (productId, selectedColor, selectedSize) => {
  const updatedCart = cartItems.map((item) =>
    item.id === productId &&
    item.selectedColor === selectedColor &&
    item.selectedSize === selectedSize // Kiểm tra thêm cả kích cỡ
      ? { ...item, quantity: item.quantity + 1 } // Tăng số lượng nếu cả `id`, `selectedColor` và `selectedSize` khớp
      : item
  );
  dispatch(setCartItems(updatedCart)); // Gửi toàn bộ giỏ hàng đã cập nhật vào Redux
  syncCartToAPI(updatedCart); // Đồng bộ với API
};

const handleDecreaseQuantity = (productId, selectedColor, selectedSize) => {
  const updatedCart = cartItems.map((item) =>
    item.id === productId &&
    item.selectedColor === selectedColor &&
    item.selectedSize === selectedSize && // Kiểm tra thêm cả kích cỡ
    item.quantity > 1 // Đảm bảo chỉ giảm nếu số lượng > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  dispatch(setCartItems(updatedCart)); // Gửi toàn bộ giỏ hàng đã cập nhật vào Redux
  syncCartToAPI(updatedCart); // Đồng bộ với API
};



  const handleRemoveItem = (productId, selectedColor, selectedSize) => {
    const updatedCart = cartItems.filter(
      (item) =>
        item.id !== productId ||
        item.selectedColor !== selectedColor ||
        item.selectedSize !== selectedSize
    );
    dispatch(removeFromCart(productId, selectedColor, selectedSize));
    syncCartToAPI(updatedCart);
  };

  const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price) || 0; // Đảm bảo giá trị `price` là số, nếu không thì mặc định 0
    const itemQuantity = parseInt(item.quantity) || 0; // Đảm bảo `quantity` là số, nếu không thì mặc định 0

    return total + itemPrice * itemQuantity; // Tính tổng cho sản phẩm hợp lệ
  }, 0);
};

const baseFee = 10; // Phí cơ bản
const perItemFee = 3; // Phí cho mỗi sản phẩm
function calculateDeliveryFee(items) {
  if (items.length === 0) {
    return 0; // Không có phí vận chuyển khi giỏ hàng rỗng
  }
  return baseFee + (items.length - 1) * perItemFee;
}
  const totalAmount = calculateTotal() + calculateDeliveryFee(cartItems);
 const handlePaymentPress = () => {
    if (totalAmount === 0) {
      setModalVisible(true); // Hiển thị Modal khi tổng tiền bằng $0
    } else {
      navigation.navigate('Payment', { total: totalAmount });
    }
  };




  return (
  <View style={{ backgroundColor: '#fff', width: '52vh', height: '90vh' }}>
    {/* Địa chỉ giao hàng */}
<View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
  <Text style={{ fontSize: 20, fontWeight: '600', color: '#333', marginBottom: 8 }}>
    Thông tin của bạn:
  </Text>
  {userData ? (
    <View style={{flexDirection:'row'}}>
     <Image  source={require('../assets/location.png')} style={{ width: 28, height: 28, marginRight: 5 }} />
    <Text style={{ fontSize: 16, color: 'black', lineHeight: 24,top:5 }}>
      {userData.address}
    </Text>
    </View>
  ) : (
    <Text style={{ fontSize: 16, color: '#888', lineHeight: 24, }}>
      Loading address...
    </Text>
  )}
  {userData ? (
    <View style={{flexDirection:'row'}}>
     <Image  source={require('../assets/profile123.png')} style={{ width: 30, height: 30, marginRight: 5 }} />
    <Text style={{ fontSize: 16, color: 'black', lineHeight: 24,top:5 }}>
      {userData.firstName} {userData.lastName}
    </Text>
    </View>
  ) : (
    <Text style={{ fontSize: 16, color: '#888', lineHeight: 24, }}>
      Loading address...
    </Text>
  )}
  {userData ? (
    <View style={{flexDirection:'row'}}>
     <Image  source={require('../assets/phone.png')} style={{ width:30, height: 30, marginRight: 5 }} />
    <Text style={{ fontSize: 16, color: 'black', lineHeight: 24,top:5 }}>
      {userData.phoneNumber}
    </Text>
    </View>
  ) : (
    <Text style={{ fontSize: 16, color: '#888', lineHeight: 24, }}>
      Loading address...
    </Text>
  )}
  </View>
  
      
    <ScrollView>
      <FlatList
        data={cartItems}
        keyExtractor={(item) =>
          item.id + (item.selectedColor || '') + (item.selectedSize || '')
        }
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
              paddingHorizontal: 10,
            }}
          >
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
              {item.selectedColor && (
                <Text style={{ fontSize: 14, color: 'gray' }}>Màu: {item.selectedColor}</Text>
              )}
              {item.selectedSize && (
                <Text style={{ fontSize: 14, color: 'gray' }}>Size: {item.selectedSize}</Text>
              )}
              <Text style={{ fontSize: 16, color: 'green' }}>${item.price}</Text>
              {/* Hiển thị phí vận chuyển dưới giá tiền */}
              <Text style={{ fontSize: 14, color: 'green', marginTop: 4 }}>
                 Delivery: ${index === 0 ? baseFee : perItemFee}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() =>
                  handleDecreaseQuantity(item.id, item.selectedColor, item.selectedSize)
                }
              >
                <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 18, marginHorizontal: 10 }}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() =>
                  handleIncreaseQuantity(item.id, item.selectedColor, item.selectedSize)
                }
              >
                <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                handleRemoveItem(item.id, item.selectedColor, item.selectedSize)
              }
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="remove-circle-sharp" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 10 }} />
        )}
      />
    </ScrollView>

    {/* Phí vận chuyển và tổng giá */}
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginTop: 10,

      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 5 }}>
        Subtotal: ${calculateTotal().toFixed(2)}
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 5 }}>
        Delivery: ${calculateDeliveryFee(cartItems).toFixed(2)}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        }}
      >
        Total: ${(calculateTotal() + calculateDeliveryFee(cartItems)).toFixed(2)}
      </Text>
    </View>

    {/* Nút Thanh Toán */}
      <TouchableOpacity
  style={{
    backgroundColor: 'green', // Giữ nguyên màu nền
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  }}
        onPress={handlePaymentPress}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Payment</Text>
      </TouchableOpacity>
    {/* Modal Thông Báo */}
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
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Cannot Proceed</Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginBottom: 20,
                color: 'gray',
              }}
            >
              Your cart is empty. Please add items to your cart before proceeding to payment.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
              }}
              onPress={() => setModalVisible(false)} // Đóng Modal
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  </View>
);



};

export default CartScreen;
