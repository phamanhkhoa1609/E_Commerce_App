import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, FlatList,ImageBackground,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; // Add this line
import { addToCart } from '../index/action';
import { useSelector} from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../index/action';
const category = [
  { name: 'SmartPhone' },
  { name: 'Tablet' },
  { name: 'Laptop' },
  { name: 'Accessories'},
];

const electronicitem = [
  { 
    id:'1',name: 'Iphone 16', price: 1300, image: require('../assets/Iphone16.png'), category: 'SmartPhone',  brand: 'Apple',warranty: '12 tháng',
    description: [
      "Màn hình: 6.8 inch",
      "Chip xử lý: A18 Pro",
      "RAM: 12 GB", 
      "ROM: 256 GB",
      "Dung lượng pin: 5000 mAh"
    ],
    colors: [
      { colorName: 'Xanh', image: require('../assets/Iphone16.png') },
      { colorName: 'Hồng', image: require('../assets/iphone16pink.png') },
      { colorName: 'Đen', image: require('../assets/iphone16black.png') }
    ],
    seller: {
      id: '12345',  // ID của người bán
      name: 'Nguyễn Văn A', // Tên người bán
      contact: 'nguyenvana@gmail.com', // Email hoặc số điện thoại
      rating: 4.8, // Đánh giá trung bình của người bán
      totalSales: 50, // Tổng sản phẩm đã bán
    }
  },
  { 
    id:'2',name: 'Iphone 15', price: 1000, image: require('../assets/iphone15.png'), category: 'SmartPhone',  brand: 'Apple',warranty: '12 tháng',
    description: [
      "Màn hình: 6.9 inch",
      "Chip xử lý: A16 Bionic",
      "RAM: 12 GB",
      "ROM: 512 GB",
      "Dung lượng pin: 6000 mAh"
    ],
    colors: [
      { colorName: 'Hồng', image: require('../assets/iphone15.png') },
      { colorName: 'Xanh', image: require('../assets/iphon15blue.png') },
      { colorName: 'Đen', image: require('../assets/iphone15black.png') }
    ]  
  },
  { 
    id:'3',name: 'SamSung S24 Ultra', price: 800, image: require('../assets/samsung.png'), category: 'SmartPhone', brand: 'Samsung',warranty: '12 tháng',
    description: [
      "Màn hình: 6.9 inch",
      "Chip xử lý: Snapdragon 8 Gen 3",
      "RAM: 12 GB",
      "ROM: 512 GB",
      "Dung lượng pin: 6000 mAh"
    ],
    colors: [
      { colorName: 'Bạc', image: require('../assets/samsung.png') },
      { colorName: 'Xanh', image: require('../assets/samsungblue.png') },
      { colorName: 'Tím', image: require('../assets/samsungpurple.png') }
    ]   
  },
  { 
    id:'4',name: 'MacBook Pro Max', price: 4400, image: require('../assets/macbookpro.png'), category: 'Laptop',  brand: 'Apple',warranty: '24 tháng',
    description: [
      "Màn hình: 14.2 inch Retina XDR",
      "Chip xử lý: Apple M1 Max",
      "RAM: 32 GB",
      "ROM: 1 TB SSD",
      "Thời lượng pin: Lên đến 17 giờ"
    ]
  },
  { 
    id:'5',name: 'MSI Titan 18HX', price: 5000, image: require('../assets/msilaptop.png'), category: 'Laptop',  brand: 'MSI',warranty: '12 tháng',
    description: [
      "Màn hình: 18.4 inch UHD 4K",
      "Chip xử lý: Intel Core i9-13900HX",
      "RAM: 64 GB",
      "ROM: 2 TB SSD",
      "Card đồ họa: NVIDIA GeForce RTX 4090"
    ]
  },
  { 
    id:'6',name: 'ASUS ROG G834', price: 4000, image: require('../assets/asuslaptop.png'), category: 'Laptop',  brand: 'ASUS',warranty: '12 tháng',
    description: [
      "Màn hình: 17.3 inch QHD 240Hz",
      "Chip xử lý: AMD Ryzen 9 7945HX",
      "RAM: 32 GB", 
      "ROM: 1 TB SSD",
      "Card đồ họa: NVIDIA GeForce RTX 4080"
    ]
  },
  { 
    id:'7',name: 'Ipad Pro M2 2022', price: 1100, image: require('../assets/ipadpro.png'), category: 'Tablet',  brand: 'Apple',warranty: '12 tháng',
    description: [
      "Màn hình: 12.9 inch Liquid Retina XDR",
      "Chip xử lý: Apple M2",
      "RAM: 8 GB",
      "ROM: 512 GB",
      "Camera: 12MP Ultra Wide"
    ]
  },
  { 
    id:'8',name: 'Ipad Pro M1 2021', price: 900,  image: require('../assets/ipadpro11.png'), category: 'Tablet',  brand: 'Apple',warranty: '12 tháng',
    description: [
      "Màn hình: 11 inch Liquid Retina",
      "Chip xử lý: Apple M1",
      "RAM: 8 GB",
      "ROM: 256 GB",
      "Camera: 12MP Ultra Wide"
    ]
  },
  { 
    id:'9',name: 'Surface Pro 11', price: 800, image: require('../assets/Surfacepro.png'), category: 'Tablet',  brand: 'Microsoft',warranty: '12 tháng',
    description: [
      "Màn hình: 13 inch PixelSense",
      "Chip xử lý: Intel Core i7",
      "RAM: 16 GB",
      "ROM: 512 GB",
      "Thời lượng pin: Lên đến 15 giờ"
    ]
  },
  { 
    id:'10',name: 'AirPods 2', price: 1100, image: require('../assets/acesories1.png'), category: 'Accessories',  brand: 'Apple',warranty: '6 tháng',
    description: [
      "Chip xử lý: H1",
      "Thời gian nghe nhạc: Lên đến 5 giờ",
      "Tính năng: Kết nối Bluetooth, tự động ghép nối",
      "Kháng nước: IPX4"
    ]
  },
  { 
    id:'11',name: 'GM83 Mouse', price: 900, image: require('../assets/acesories2.png'), category: 'Accessories',  brand: 'Logitech',warranty: '12 tháng',
    description: [
      "Cảm biến: Optical",
      "DPI: Lên đến 16,000",
      "Kết nối: USB, không dây",
      "Đèn LED RGB có thể điều chỉnh"
    ]
  },
  { 
    id:'12',name: 'HeadPhone BGH99', price: 800, image: require('../assets/acesories3.png'), category: 'Accessories',  brand: 'Sony',warranty: '12 tháng',
    description: [
      "Kiểu: Over-ear",
      "Tính năng: Khử tiếng ồn chủ động",
      "Thời gian pin: Lên đến 20 giờ",
      "Kết nối: Bluetooth 5.0, dây 3.5mm"
    ]
  },
  { 
  id:'13',name: 'Iphone 12', price: 800,  discountPrice: 500,image: require('../assets/iphone12.png'),  category: 'SmartPhone',brand: 'Apple',warranty: '12 tháng',
    description: [
      "Màn hình: 6.1 inch OLED",
      "Chip xử lý: A14 Bionic",
      "RAM: 4 GB", 
      "ROM: 128 GB",
      "Dung lượng pin: 2815 mAh"
    ],
    colors: [
      { colorName: 'Tím', image: require('../assets/iphone12.png') },
      { colorName: 'Xanh', image: require('../assets/iphone12blue.png') },
      { colorName: 'Đen', image: require('../assets/iphone12black.png') }
    ]
  },
  { 
    id:'14',name: 'Dell Laptop', price: 800,  discountPrice: 400, image: require('../assets/delllaptop.png'), category: 'Laptop',brand: 'Dell',warranty: '12 tháng',
    description: [
      "Màn hình: 15.6 inch Full HD",
      "Chip xử lý: Intel Core i5",
      "RAM: 8 GB", 
      "ROM: 256 GB SSD",
      "Thời lượng pin: Lên đến 10 giờ"
    ]
  },
  { 
id:'15',name: 'Ipad Pro 2020', price: 900,   discountPrice: 500, image: require('../assets/ipadpro2020.png'), category: 'Tablet',brand: 'Apple',warranty:'12tháng',
    description: [
      "Màn hình: 12.9 inch Liquid Retina",
      "Chip xử lý: Apple A12Z Bionic",
      "RAM: 6 GB",
      "ROM: 512 GB",
      "Camera: 12MP Ultra Wide"
    ]
  },
  { 
    id:'16',name: 'HeadPhone 2020', price: 600,  discountPrice: 100, image: require('../assets/headphonebluetooth.png'), category: 'Accessories',
    brand: 'Sony',
    warranty: '6 tháng',
    description: [
      "Kiểu: On-ear",
      "Tính năng: Khử tiếng ồn thụ động",
      "Thời gian pin: Lên đến 10 giờ",
      "Kết nối: Bluetooth 4.2, dây 3.5mm",
      "Chất lượng âm thanh: Âm bass mạnh mẽ, âm thanh trong trẻo"
    ]
  }
];



const SearchBar = ({ searchText, setSearchText }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, height: 45, marginHorizontal: 20, backgroundColor: '#f5f5f5', width: 375, borderColor: '#9095A0',marginLeft:4 }}>
    <TouchableOpacity>
      <Image source={require('../assets/search.png')} style={{ width: 20, height: 20, borderRadius: 50, marginRight: 20 }} />
    </TouchableOpacity>
    <TextInput
      placeholder="Search for products"
      style={{ flex: 1, fontSize: 16 }}
      value={searchText}
      onChangeText={(text) => setSearchText(text)} // Cập nhật từ khóa tìm kiếm khi thay đổi
    />
  </View>
);

const CategoryItem = ({ item, index, onPress, selectedCategory }) => (
  <TouchableOpacity onPress={() => onPress(item.name)} style={{ alignItems: 'center' }}>
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginVertical: 20,
      marginLeft: 2,
      borderWidth: selectedCategory === item.name ? 2: 1, // Tăng độ dày viền khi được chọn
      borderRadius: 5,
      width: 94,

      borderColor: selectedCategory === item.name ? '#8A2BE2' : 'black', 
    }}>
     
      <Text style={{ fontSize: 13, color: '#333', fontWeight: 'bold', marginLeft: 10, marginTop: 10 }}>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const Category = ({ onSelectCategory, selectedCategory }) => (
  <FlatList
    horizontal
    data={category}
    renderItem={({ item, index }) => (
      <CategoryItem item={item} index={index} onPress={onSelectCategory} selectedCategory={selectedCategory} />
    )}
    keyExtractor={(item) => item.name}
  />
);


const ElectronicItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favoriteItems);
  const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user); // Lấy thông tin user để đồng bộ API
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const [selectedColor, setSelectedColor] = useState(
    item.colors && item.colors.length > 0 ? item.colors[0] : null
  );

  const syncCartToAPI = async (updatedCart) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: updatedCart }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    }
  };

  const syncFavoritesToAPI = async (updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteItems: updatedFavorites }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ danh sách yêu thích với API:', error);
    }
  };

   const toggleFavorite = async () => {
  const productWithCorrectPrice = {
    ...item,
    price: item.discountPrice || item.price, // Sử dụng giá giảm nếu có
  };

  const updatedFavorites = isFavorite
    ? favoriteItems.filter((favItem) => favItem.id !== item.id)
    : [...favoriteItems, productWithCorrectPrice];

  dispatch(isFavorite ? removeFromFavorites(item.id) : addToFavorites(productWithCorrectPrice));
  await syncFavoritesToAPI(updatedFavorites);
};

  const handleAddToCart = async () => {
  const productWithSelection = {
    ...item,
    selectedColor: selectedColor ? selectedColor.colorName : null,
    image: selectedColor ? selectedColor.image : item.image,
    quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
    price: item.discountPrice || item.price
  };

  // Kiểm tra nếu sản phẩm với màu cụ thể đã tồn tại
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productWithSelection.id &&
      cartItem.selectedColor === productWithSelection.selectedColor
  );

  // Nếu sản phẩm đã tồn tại, tăng số lượng; nếu không, thêm sản phẩm mới
  const updatedCart = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tăng số lượng
          : cartItem
      )
    : [...cartItems, productWithSelection]; // Thêm sản phẩm mới

  try {
    dispatch(addToCart(productWithSelection));
    await syncCartToAPI(updatedCart);

    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
  } catch (error) {
    console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    Alert.alert('Lỗi', 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
  }
};

  const handlePress = () => {
    navigation.navigate('ElectronicDetail', { product: item });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: 170,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Image source={item.image} style={{ height: 120, width: 120, borderRadius: 10 }} />

        {/* Biểu tượng yêu thích */}
        <TouchableOpacity
          onPress={toggleFavorite}
          style={{ position: 'absolute', top: 5, right: -1 }}
        >
          <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : '#888'} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>{item.name}</Text>

        {/* Hiển thị giá */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 5,
          }}
        >
          {item.discountPrice ? (
            <>
              <Text
                style={{
                  color: '#888',
                  fontSize: 16,
                  textDecorationLine: 'line-through',
                }}
              >
                ${item.price}
              </Text>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}
              >
                ${item.discountPrice}
              </Text>
            </>
          ) : (
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>${item.price}</Text>
          )}

          {/* Nút thêm vào giỏ hàng */}
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              backgroundColor: '#e0e0e0',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              marginLeft: 10,
            }}
          >
            <Icon name="add" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};





const EList = ({ filteredItems }) => (
  <FlatList
    data={filteredItems}
    renderItem={({ item }) => <ElectronicItem item={item} />}
    keyExtractor={(item) => item.name}
    numColumns={2} // Hiển thị 2 cột cho giao diện giống hình mẫu
    contentContainerStyle={{ paddingBottom: 80 }} // Tạo không gian để Footer không che khuất
  />
);
const DiscountItem = ({ item }) => { 
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favoriteItems);
  const cartItems = useSelector((state) => state.cartItems);
  const user = useSelector((state) => state.user); // Lấy thông tin user để đồng bộ API
  const isFavorite = favoriteItems.some((favItem) => favItem.id === item.id);

  const [selectedColor, setSelectedColor] = useState(
    item.colors && item.colors.length > 0 ? item.colors[0] : null
  );

  const syncCartToAPI = async (updatedCart) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: updatedCart }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ giỏ hàng với API:', error);
    }
  };

  const syncFavoritesToAPI = async (updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteItems: updatedFavorites }),
      });
    } catch (error) {
      console.error('Lỗi khi đồng bộ danh sách yêu thích với API:', error);
    }
  };

  const toggleFavorite = async () => {
  const productWithCorrectPrice = {
    ...item,
    price: item.discountPrice || item.price, // Sử dụng giá giảm nếu có
  };

  const updatedFavorites = isFavorite
    ? favoriteItems.filter((favItem) => favItem.id !== item.id)
    : [...favoriteItems, productWithCorrectPrice];

  dispatch(isFavorite ? removeFromFavorites(item.id) : addToFavorites(productWithCorrectPrice));
  await syncFavoritesToAPI(updatedFavorites);
};


  const handleAddToCart = async () => {
    const productWithSelection = {
      ...item,
      selectedColor: selectedColor ? selectedColor.colorName : null,
      image: selectedColor ? selectedColor.image : item.image,
      quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
      price: item.discountPrice || item.price, // Sử dụng giá giảm nếu có, ngược lại dùng giá gốc
    };

    // Kiểm tra nếu sản phẩm với màu cụ thể đã tồn tại
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.id === productWithSelection.id &&
      cartItem.selectedColor === productWithSelection.selectedColor
  );

  // Nếu sản phẩm đã tồn tại, tăng số lượng; nếu không, thêm sản phẩm mới
  const updatedCart = existingItem
    ? cartItems.map((cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor
          ? { ...cartItem, quantity: cartItem.quantity + 1 } // Tăng số lượng
          : cartItem
      )
    : [...cartItems, productWithSelection]; // Thêm sản phẩm mới

    dispatch(addToCart(productWithSelection));
    await syncCartToAPI(updatedCart);

    Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng', [{ text: 'OK' }]);
  };

  const handlePress = () => {
    navigation.navigate('ElectronicDetail', { product: item });
  };


  return(
    <TouchableOpacity onPress={handlePress} style={{ width:170, margin: 10, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 }}>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Image source={item.image} style={{ height: 120, width: 120, borderRadius: 10 }} />
        <TouchableOpacity onPress={toggleFavorite} style={{ position: 'absolute', top: 5, right: -1 }}>
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "#888"} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 5 }}>{item.name}</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          {item.discountPrice ? (
            <>
              <Text style={{ color: '#888', fontSize: 16, textDecorationLine: 'line-through', marginRight: 5 }}>${item.price}</Text>
              <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>${item.discountPrice}</Text>
            </>
          ) : (
            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>${item.price}</Text>
          )}
        

        <TouchableOpacity onPress={handleAddToCart} style={{ backgroundColor: '#e0e0e0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginTop: 5, marginLeft: 10 }}>
          <Icon name="add" size={25} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const DiscountList = ({ items }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <DiscountItem item={item} />}
    keyExtractor={(item) => item.name}
    numColumns={2} // Hiển thị 2 cột cho giao diện giống hình mẫu
    contentContainerStyle={{ paddingBottom: 20 }}
    showsHorizontalScrollIndicator={false}
  />
);

const Footer = () => {
   const navigation = useNavigation();


   const cartItems = useSelector((state) => state.cartItems);
   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

   const favoriteItems = useSelector((state) => state.favoriteItems);
   const favoriteCount = favoriteItems.length;

      // Lấy thông tin user từ Redux
  const user = useSelector((state) => state.user);

  if (!user) {
    console.warn("User data not found in Redux.");
  }

   return (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 400 , position: 'absolute',bottom: 0,backgroundColor:'#ff6363'}}>
    <TouchableOpacity onPress={() => navigation.navigate('All Deals')}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/clarity_home-solid.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ fontSize: 16 }}>Home</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <View style={{ alignItems: 'center', marginRight: 20 }}>
          <Image source={require('../assets/cart.png')} style={{ width: 33, height: 33 }} />
          {cartCount > 0 && (
            <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>{cartCount}</Text>
            </View>
          )}
          <Text style={{ fontSize: 16 }}>Cart</Text>
        </View>
      </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('FavoriteScreen')}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/mdi_heart-outline.png')} style={{ width: 33, height: 33 }} />

        {favoriteCount > 0 && (
            <View style={{ position: 'absolute', top: -5, right: 3, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5 }}>
              <Text style={{ color: 'white', fontSize: 14 }}>{favoriteCount}</Text>
            </View>
          )}
        
        <Text style={{ fontSize: 16 }}>Favorite</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/solar_inbox-outline.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ fontSize: 16 }}>Inbox</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Profile', { userId: user?.id })}>
      <View style={{ alignItems: 'center', marginRight: 20 }}>
        <Image source={require('../assets/codicon_account.png')} style={{ width: 30, height: 30 }} />
        <Text style={{ fontSize: 16 }}>Account</Text>
      </View>
    </TouchableOpacity>
  </View>
);
};
const Banner = () => (
  <ImageBackground source={require('../assets/banner.png')} style={{ height: 150, marginHorizontal: 20, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', padding: 20 ,width:375,marginLeft:1,marginTop:2}}>
  
  </ImageBackground>
);

const Electronics = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Lọc sản phẩm dựa trên danh mục đã chọn và từ khóa tìm kiếm
  const filteredItems = electronicitem.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Nếu không có danh mục được chọn và không có tìm kiếm, giới hạn sản phẩm hiển thị
  const displayedItems = selectedCategory || searchText ? filteredItems : filteredItems.slice(1, 5);

  // Các sản phẩm có discount
  const discountItems = electronicitem.filter(item => item.discountPrice);

  // Xử lý chọn hoặc hủy chọn danh mục
  const handleCategorySelect = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Hủy chọn nếu nhấn lại vào danh mục đã chọn
    } else {
      setSelectedCategory(categoryName);
    }
  };

  return (
    <View style={{ height:'92vh',width:'100vh' }}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Banner />
        <Category onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />

        {/* Hiển thị "Best Sells" và "Discount" chỉ khi không có danh mục và tìm kiếm */}
        {!selectedCategory && !searchText && (
          <>
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold' }}>Best Sells</Text>
            <EList filteredItems={displayedItems} />
            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', marginTop: -80 }}>Discount</Text>
            <DiscountList items={discountItems} />
          </>
        )}

        {/* Hiển thị các sản phẩm được lọc */}
        {selectedCategory || searchText ? (
          <EList filteredItems={filteredItems} />
        ) : null}
      </ScrollView>
      <Footer />
    </View>
  );
};


export default Electronics;
