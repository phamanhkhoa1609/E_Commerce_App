import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector} from 'react-redux';

import { useDispatch } from 'react-redux'; // Add this line
import { addToCart } from '../index/action';

import { addToFavorites, removeFromFavorites } from '../index/action';
const category=[
  {name:'Electronics',image:require('../assets/iphone15.png')},
  {name:'Fashion',image:require('../assets/fashion123.png')},
  {name:'Furniture',image:require('../assets/furniture1.png')},
  {name:'Sporting',image:require('../assets/sporting.png')},
];


const electronicitem = [
  { 
    id:'39',name: 'Luxury Sofa', 
    price: 1200, 
    image: require('../assets/sofa1.png'), 
    category: 'Sofa',
    description: [
      "Sofa cao cấp mang lại vẻ đẹp sang trọng và hiện đại cho phòng khách.",
      "Đệm êm ái, tạo sự thoải mái tối đa khi sử dụng."
    ],
    dimensions: "210cm x 90cm x 85cm",
    origin: "USA",
    style: "Hiện đại",
    warranty: "3 năm"
  },
  { 
    id:'36',name: 'Ytaoka Desk', 
    price: 200, 
    image: require('../assets/desk1.png'), 
    category: 'Desk',
    description: [
      "Bàn làm việc Ytaoka đơn giản và tiện dụng, phù hợp cho không gian nhỏ gọn.",
      "Mặt bàn rộng rãi, giúp tối ưu hóa không gian làm việc."
    ],
    dimensions: "120cm x 60cm x 75cm",
    origin: "Japan",
    style: "Tối giản",
    warranty: "1 năm"
  },
  { 
    id:'40',name: 'Classic Sofa', 
    price: 1100, 
    image: require('../assets/sofa2.png'), 
    category: 'Sofa',
    description: [
      "Sofa cổ điển với kiểu dáng thanh lịch, phù hợp với không gian cổ điển.",
      "Thiết kế sang trọng và chất liệu cao cấp đảm bảo độ bền lâu dài."
    ],
    dimensions: "200cm x 85cm x 80cm",
    origin: "Italy",
    style: "Cổ điển",
    warranty: "3 năm"
  },
  { 
    id:'41',name: 'Elegant Sofa', 
    price: 1600, 
    image: require('../assets/sofa3.png'), 
    category: 'Sofa',
    description: [
      "Sofa thanh lịch với phong cách hiện đại, tôn lên vẻ đẹp phòng khách của bạn.",
      "Đệm êm ái và kiểu dáng sang trọng, tạo điểm nhấn cho không gian sống."
    ],
    dimensions: "220cm x 90cm x 85cm",
    origin: "Turkey",
    style: "Hiện đại",
    warranty: "2 năm"
  },
  { 
    id:'42',name: 'Luxury Wardrobe', 
    price: 1600, 
    image: require('../assets/wardrobe1.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo cao cấp với thiết kế sang trọng, mang đến không gian lưu trữ rộng rãi.",
      "Chất liệu gỗ bền chắc và thiết kế tinh tế, phù hợp với phòng ngủ đẳng cấp."
    ],
    dimensions: "200cm x 80cm x 220cm",
    origin: "Germany",
    style: "Sang trọng",
    warranty: "3 năm"
  },
  { 
    id:'43',name: 'Classic Wardrobe', 
    price: 1900, 
    image: require('../assets/wardrobe2.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo cổ điển với đường nét tinh xảo, tạo điểm nhấn cho phòng ngủ.",
      "Dung lượng chứa lớn, đáp ứng nhu cầu lưu trữ quần áo, phụ kiện."
    ],
    dimensions: "180cm x 75cm x 210cm",
    origin: "France",
    style: "Cổ điển",
    warranty: "2 năm"
  },
  { 
    id:'44',name: 'Elegant Wardrobe', 
    price: 1800, 
    image: require('../assets/wardrobe3.png'), 
    category: 'Wardrobes',
    description: [
      "Tủ quần áo thanh lịch với phong cách hiện đại, phù hợp cho phòng ngủ tiện nghi.",
      "Thiết kế thông minh, giúp bạn sắp xếp và tổ chức không gian một cách hiệu quả."
    ],
    dimensions: "190cm x 85cm x 215cm",
    origin: "Sweden",
    style: "Hiện đại",
    warranty: "3 năm"
  },
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
    id:'52',name: 'Triban RC 500', 
    price: 800, 
    image: require('../assets/cycling1.png'), 
    category: 'Cycling', 
    description: [
      "Xe đạp Triban RC 500 với khung nhôm nhẹ, phù hợp cho các chuyến đi dài.",
      "Trang bị bộ truyền động Shimano, dễ dàng thay đổi tốc độ."
    ],
    brand: 'Decathlon',
    durability: '3 năm'
  },
  { 
    id:'53',name: 'Road R500 Helmet', 
    price: 700, 
    image: require('../assets/cycling2.png'), 
    category: 'Cycling', 
    description: [
      "Mũ bảo hiểm xe đạp Road R500 với thiết kế bảo vệ toàn diện.",
      "Thoáng khí và có thể điều chỉnh kích cỡ dễ dàng."
    ],
    brand: 'Giro',
    durability: '2 năm'
  },
  { 
    id:'54',name: 'Polyester Gear', 
    price: 400, 
    image: require('../assets/cycling3.png'), 
    category: 'Cycling', 
    description: [
      "Bộ đồ đạp xe với chất liệu polyester thoáng mát, chống thấm mồ hôi.",
      "Thiết kế gọn gàng, tạo cảm giác thoải mái khi đạp xe đường dài."
    ],
    brand: 'Pearl Izumi',
    durability: '3 năm'
  },
  { 
    id:'55',name: 'Boxing Gloves', 
    price: 200, 
    image: require('../assets/boxing1.png'), 
    category: 'Boxing', 
    description: [
      "Găng tay boxing chuyên dụng giúp bảo vệ tay và cổ tay khi tập luyện.",
      "Thiết kế vừa vặn, tạo cảm giác thoải mái."
    ],
    brand: 'Everlast',
    durability: '3 năm'
  },
  { 
    id:'56',name: 'Boxing Trunk', 
    price: 100, 
    image: require('../assets/boxing2.png'), 
    category: 'Boxing', 
    description: [
      "Quần boxing thoáng mát, linh hoạt cho mọi chuyển động.",
      "Thiết kế đẹp mắt, phù hợp cho các buổi tập luyện và thi đấu."
    ],
    brand: 'Title Boxing',
    durability: '2 năm'
  },
  { 
    id:'57',name: 'Boxing HeadGear', 
    price: 60, 
    image: require('../assets/boxing3.png'), 
    category: 'Boxing', 
    description: [
      "Nón bảo hộ boxing giúp bảo vệ đầu khỏi các chấn động.",
      "Thoáng khí và điều chỉnh dễ dàng."
    ],
    brand: 'Ringside',
    durability: '2 năm'
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
    id:'23',name: 'Off White Shoes', price: 1200, image: require('../assets/shoes1.png'), category: 'Shoes', 
    description: [
      "Giày kết hợp phong cách đường phố, bóng rổ và chạy bộ, lấy cảm hứng từ văn hóa thập niên 90.",
      "Sử dụng ngôn ngữ màu sắc từ các môn thể thao nổi tiếng của Mỹ.",
      "Được làm từ da bê với đế cao su bền chắc."
    ],
    sizes: [38, 40, 42, 44],
    style: 'Streetwear',
    fit: 'Standard Fit',
    material: 'Calf Leather, Rubber Sole'
  },
  { 
    id:'24',name: 'Bubbery Shoes', price: 1100, image: require('../assets/shoes2.png'), category: 'Shoes', 
    description: [
      "Giày thiết kế thanh lịch, phù hợp cho mọi lứa tuổi và phong cách.",
      "Chất liệu da tổng hợp cao cấp và bền bỉ.",
      "Phù hợp cho cả phong cách thường ngày và thể thao."
    ],
    sizes: [38, 40, 42, 44],
    style: 'Casual',
    fit: 'Regular Fit',
    material: 'Synthetic Leather'
  },
  { 
    id:'25',name: 'Louis Vutton Shoes', price: 1600, image: require('../assets/shoes3.png'), category: 'Shoes', 
    description: [
      "Giày thời trang cao cấp, mang lại sự sang trọng và phong cách.",
      "Thiết kế hiện đại, phù hợp cho phong cách đường phố và thể thao."
    ],
    sizes: [38, 40, 42, 44],
    style: 'High Fashion',
    fit: 'Slim Fit',
    material: 'Premium Leather'
  },
  { 
    id:'26',name: 'Off White Jacket', price: 1100, image: require('../assets/jacket1.png'), category: 'Jacket', 
    description: [
      "Áo khoác phong cách đường phố, thích hợp cho thời tiết lạnh.",
      "Chất liệu dày dặn, giúp giữ ấm hiệu quả."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Streetwear',
    fit: 'Oversized',
    material: 'Polyester, Cotton'
  },
  { 
    id:'27',name: 'Bubbery Jacket', price: 900, image: require('../assets/jacket2.png'), category: 'Jacket', 
    description: [
      "Áo khoác phong cách cổ điển, dễ phối hợp với nhiều trang phục khác nhau.",
      "Thiết kế tinh tế và sang trọng, thích hợp cho cả nam và nữ.",
      "Chất liệu chống thấm nước, phù hợp cho thời tiết mưa."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'Classic',
    fit: 'Regular Fit',
    material: 'Waterproof Polyester'
  },
  { 
    id:'28',name: 'Louis Vutton Jacket', price: 1800, image: require('../assets/jacket3.png'), category: 'Jacket', 
    description: [
      "Áo khoác cao cấp, thiết kế thanh lịch và hiện đại.",
      "Chất liệu nhẹ, giữ ấm tốt mà không tạo cảm giác nặng nề."
    ],
    sizes: ['S', 'L', 'XL', 'XXL'],
    style: 'High Fashion',
    fit: 'Slim Fit',
    material: 'Lightweight Nylon'
  },
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


const CategoryItem = ({ item, index }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (item.name === 'Electronics') {
      navigation.navigate('Electronics');
    }else if (item.name === 'Fashion') {
      navigation.navigate('Fashion');
    }
    else if (item.name === 'Furniture') {
      navigation.navigate('Furniture');
    }else if (item.name === 'Sporting') {
      navigation.navigate('Sporting');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ alignItems: 'center' }}>
      <View style={{
       flexDirection: 'column',
      justifyContent: 'space-around',
      marginVertical: 20,
      marginLeft: 5,
      borderWidth: 1, // Tăng độ dày viền khi được chọn
      borderRadius: 5,
      width: 90,
      height:100
  
      }}>
        <Image source={item.image} style={{ width: 50, height: 50,marginLeft:15}} />
        <Text style={{ fontSize: 14, color: '#333',marginLeft:15}}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Category = () => (
  <FlatList
    horizontal
    data={category}
    renderItem={({ item, index }) => <CategoryItem item={item} index={index} />}
    keyExtractor={(item) => item.name}
  />
);
const Banner = () => (
  <ImageBackground source={require('../assets/phongTrang.png')} style={{ height: 220, marginHorizontal: 20, overflow: 'hidden', justifyContent: 'center', width: 380 }}>
    <View>
      <View style={{ flexDirection: 'column', marginBottom: -320 }}>
        <Text style={{ color: '#0ac8ff', fontSize: 35, fontWeight: 'bold', marginLeft: 30 }}>Shoes</Text>
        <Text style={{ color: '#9ba1a6', fontSize: 25, fontWeight: 'bold', marginLeft: 30 }}>50% off</Text>

        <TouchableOpacity style={{ borderRadius: 5, borderWidth: 1, width: 140, height: 60, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center',backgroundColor:'black' ,marginTop:20}}>
        
          <Text style={{ color: 'white', fontSize: 25 }}>Buy now</Text>
        </TouchableOpacity>
      </View>
      <Image source={require('../assets/giayDo.png')} style={{ height: 150, width: 170, marginLeft: 170, marginTop: 170 }} />
    </View>
  </ImageBackground>
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
    const updatedFavorites = isFavorite
      ? favoriteItems.filter((favItem) => favItem.id !== item.id)
      : [...favoriteItems, item];

    dispatch(isFavorite ? removeFromFavorites(item.id) : addToFavorites(item));
    await syncFavoritesToAPI(updatedFavorites);
  };

  const handleAddToCart = async () => {
  const productWithSelection = {
    ...item,
    selectedColor: selectedColor ? selectedColor.colorName : null,
    image: selectedColor ? selectedColor.image : item.image,
    quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
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
  // Mảng ánh xạ danh mục sản phẩm tới màn hình chi tiết tương ứng
  const screenMapping = {
    'Sofa': 'FurnitureDetail',
    'Desk': 'FurnitureDetail',
    'Wardrobes': 'FurnitureDetail',
    'SmartPhone': 'ElectronicDetail',
    'Cycling': 'SportingDetail',
    'Boxing': 'SportingDetail',
    'Shoes': 'FashionDetail',
    'Jacket': 'FashionDetail',
    'Tablet': 'ElectronicDetail',
    'Laptop': 'ElectronicDetail',
  };

  const screenName = screenMapping[item.category]; // Lấy tên màn hình từ category

  if (screenName) {
    // Điều hướng đến màn hình chi tiết tương ứng với sản phẩm
    navigation.navigate(screenName, { product: item });
  } else {
    // Nếu không tìm thấy tên màn hình tương ứng, có thể hiển thị thông báo lỗi hoặc điều hướng về màn hình mặc định
    console.log('Không tìm thấy màn hình cho danh mục:', item.category);
  }
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

const ProductItem = ({ item }) => {
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: updatedCart }),
      });
    } catch (error) {
      console.error("Lỗi khi đồng bộ giỏ hàng với API:", error);
    }
  };

  const syncFavoritesToAPI = async (updatedFavorites) => {
    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favoriteItems: updatedFavorites }),
      });
    } catch (error) {
      console.error("Lỗi khi đồng bộ danh sách yêu thích với API:", error);
    }
  };

  const toggleFavorite = async () => {
    const updatedFavorites = isFavorite
      ? favoriteItems.filter((favItem) => favItem.id !== item.id)
      : [...favoriteItems, item];

    dispatch(isFavorite ? removeFromFavorites(item.id) : addToFavorites(item));
    await syncFavoritesToAPI(updatedFavorites);
  };

  const handleAddToCart = async () => {
    const productWithSelection = {
      ...item,
      selectedColor: selectedColor ? selectedColor.colorName : null,
      image: selectedColor ? selectedColor.image : item.image,
      quantity: 1, // Đảm bảo khởi tạo `quantity` là 1
    };

    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.id === productWithSelection.id &&
        cartItem.selectedColor === productWithSelection.selectedColor
    );

    const updatedCart = existingItem
      ? cartItems.map((cartItem) =>
          cartItem.id === productWithSelection.id &&
          cartItem.selectedColor === productWithSelection.selectedColor
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      : [...cartItems, productWithSelection];

    try {
      dispatch(addToCart(productWithSelection));
      await syncCartToAPI(updatedCart);

      Alert.alert("Thông báo", "Sản phẩm đã được thêm vào giỏ hàng", [{ text: "OK" }]);
    } catch (error) {
      console.error("Lỗi khi đồng bộ giỏ hàng với API:", error);
      Alert.alert("Lỗi", "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  const handlePress = () => {
    const screenMapping = {
      Electronic:"Detail",
      Fashion:"Detail",
      Furniture:"Detail",
      Sporting:"Detail,"
    };

    const screenName = screenMapping[item.category];

    if (screenName) {
      navigation.navigate(screenName, { product: item });
    } else {
      console.log("Không tìm thấy màn hình cho danh mục:", item.category);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: 170,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
       
      }}
    >
      <View style={{ alignItems: "center", padding: 10 }}>
        <Image source={item.image} style={{ height: 120, width: 120, borderRadius: 10 }} />

        {/* Biểu tượng yêu thích */}
        <TouchableOpacity
          onPress={toggleFavorite}
          style={{ position: "absolute", top: 5, right: -1 }}
        >
          <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "#888"} />
        </TouchableOpacity>

        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 5 }}>{item.name}</Text>

        {/* Hiển thị giá */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 5,
          }}
        >
          <Text style={{ color: "#333", fontSize: 18, fontWeight: "bold" }}>${item.price}</Text>

          {/* Nút thêm vào giỏ hàng */}
          <TouchableOpacity
            onPress={handleAddToCart}
            style={{
              backgroundColor: "#e0e0e0",
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
const Discount =()=>(
  
  <View style={{width:180}}>
  <View style={{flexDirection:'row'}}>
    <TouchableOpacity>
     <Image source={require('../assets/giam30%.png')} style={{ width:180 , height: 160,marginTop:20}} />
     </TouchableOpacity>

     <TouchableOpacity>
     <Image source={require('../assets/giam30%2.png')} style={{ width:185 , height: 160,marginTop:20,marginLeft:20}} />
     </TouchableOpacity>
  </View>

  </View>
 
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
    <TouchableOpacity>
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
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { userId: user?.id })}>
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
const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Lọc sản phẩm dựa trên danh mục đã chọn và từ khóa tìm kiếm
  const filteredItems = electronicitem.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Nếu không có danh mục được chọn và không có tìm kiếm, giới hạn sản phẩm hiển thị
  const displayedItems = selectedCategory || searchText ? filteredItems : filteredItems.slice(4, 10);

 const navigation = useNavigation();
  const [newProducts, setNewProducts] = useState([]); // Danh sách sản phẩm mới đăng

   const API_URL = "https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login"; // URL của MockAPI
    const [loading, setLoading] = useState(false);
     // Lấy danh sách sản phẩm mới đăng từ API
  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const users = await response.json();

        // Gộp tất cả sản phẩm từ `productsSold` của từng user
        const allNewProducts = users.flatMap(user => user.productsSold || []);
        setNewProducts(allNewProducts);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm mới:", error);
        Alert.alert("Lỗi", "Không thể tải sản phẩm mới đăng.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return (
      <View style={{ width:'100vh',height:'92vh'}}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} >
        
         <Category/>
         

         
         <View style={{flexDirection:'row'}}>
          <Text style={{marginLeft:10,fontSize:18,fontWeight:'bold'}}>Recomended For You </Text>
          <TouchableOpacity onPress={() => navigation.navigate('All Products')}>
          <Text style={{textDecorationLine: 'underline',color: 'black',fontSize: 15,left:120}}>
            See all &gt;
          </Text>
        </TouchableOpacity>
          </View>
         {/* Hiển thị "Best Sells" và "Discount" chỉ khi không có danh mục và tìm kiếm */}
        {!selectedCategory && !searchText && (
          <>
            <EList filteredItems={displayedItems} />
          </>
        )}

        {/* Hiển thị các sản phẩm được lọc */}
        {selectedCategory || searchText ? (
          <EList filteredItems={filteredItems} />
        ) : null}
       

       {/* Sản phẩm mới đăng */}
        <View>
          <FlatList
            data={newProducts}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Hiển thị 2 cột cho giao diện giống hình mẫu

          />
        </View>
         
      </ScrollView>
       <Footer/>
      </View>
  );
};

export default HomeScreen;
