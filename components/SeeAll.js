import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, Image, ImageBackground, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector} from 'react-redux';

import { useDispatch } from 'react-redux'; // Add this line
import { addToCart } from '../index/action';

import { addToFavorites, removeFromFavorites } from '../index/action';


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
        width: 160,
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
          <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 5}}>${item.price}</Text>

         
        </View>
      </View>
    </TouchableOpacity>
  );
};
const SeeAllScreen = ({ navigation }) => {
  // Giả sử 'electronicitem' là danh sách tất cả các sản phẩm
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
    id:'58',name: 'Hybrid Golf', 
    price: 800, 
    image: require('../assets/golf1.png'), 
    category: 'Golf', 
    description: [
      "Gậy golf Hybrid cho khoảng cách xa và kiểm soát tốt hơn.",
      "Phù hợp cho cả người chơi nghiệp dư và chuyên nghiệp."
    ],
    brand: 'Callaway',
    durability: '5 năm'
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
const [searchText, setSearchText] = useState('');
  // Filter the items based on search text
  const filteredItems = electronicitem.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePress = (item) => {
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
      // Thêm các màn hình khác vào đây nếu cần
    };
    const screenName = screenMapping[item.category];

    if (screenName) {
      navigation.navigate(screenName, { product: item });
    } else {
      console.log('Không tìm thấy màn hình cho danh mục:', item.category);
    }
  };
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
    <View style={{ width:'54vh',height:'90vh', backgroundColor: '#f5f5f5', padding: 10 }}>
    <ScrollView>
    <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={{
              flex: 1,
              margin: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Image source={item.image} style={{ width: '100%', height: 120, borderRadius: 10 }} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{item.name}</Text>
            <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 5 }}>${item.price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Hiển thị 2 cột
        columnWrapperStyle={{ justifyContent: 'space-between' }} // Khoảng cách giữa các cột
        contentContainerStyle={{ paddingBottom: 20 }} // Dành không gian dưới
      />
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
    </View>
  );
};

export default SeeAllScreen;
