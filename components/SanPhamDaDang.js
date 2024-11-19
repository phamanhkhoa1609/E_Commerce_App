import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector } from "react-redux"; // Nếu bạn sử dụng Redux để quản lý trạng thái
import { useNavigation } from "@react-navigation/native";

// API URL giả định
const API_URL = "https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/";

const SoldProductsScreen = ({ route }) => {
  const { userId } = route.params; // userId được truyền từ màn hình trước
  const navigation = useNavigation();

  const [soldProducts, setSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sản phẩm đã bán
  useEffect(() => {
    const fetchSoldProducts = async () => {
      try {
        // Lấy dữ liệu của người dùng từ API
        const response = await fetch(`${API_URL}${userId}`);
        const userData = await response.json();
        setSoldProducts(userData.productsSold || []); // Giả sử 'productsSold' là key chứa sản phẩm đã bán
      } catch (error) {
        console.error("Error fetching sold products:", error);
        Alert.alert("Error", "Unable to fetch sold products.");
      } finally {
        setLoading(false);
      }
    };

    fetchSoldProducts();
  }, [userId]);

  // Hàm điều hướng tới màn hình chỉnh sửa sản phẩm
  const handleEditPress = (product) => {
    navigation.navigate("Edit", { productId: product.id }); // Điều hướng đến màn hình chỉnh sửa
  };

  // Render mỗi item trong FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
      onPress={() => handleEditPress(item)} // Khi nhấn vào sản phẩm, điều hướng đến màn hình chỉnh sửa
    >
      <Image
        source={{ uri: item.image }} // Nếu hình ảnh là URL
        style={{ width: 80, height: 80, borderRadius: 10 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
        <Text style={{ color: "#777", fontSize: 14 }}>{item.category}</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f4f4f4" }}>
      

      {loading ? (
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : (
        <FlatList
          data={soldProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No products sold yet.</Text>}
        />
      )}
    </View>
  );
};

export default SoldProductsScreen;
