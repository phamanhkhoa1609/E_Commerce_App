import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Picker, Image } from "react-native";
import { useSelector } from "react-redux"; 

const EditProductScreen = ({ route, navigation }) => {
  const { productId } = route.params;  // Lấy productId từ params khi điều hướng từ màn hình trước
  const user = useSelector((state) => state.user); // Lấy thông tin user từ Redux hoặc từ API
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(""); // State cho category
  const [imageUrl, setImageUrl] = useState(""); // State cho image URL

  const categories = ["Electronic", "Fashion", "Furniture", "Sporting"]; // Danh sách category

  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`);
      const userData = await response.json();
      const productToEdit = userData.productsSold.find(p => p.id === productId);
      setProduct(productToEdit);
      setCategory(productToEdit.category); // Cập nhật category
      setImageUrl(productToEdit.image); // Cập nhật image URL
    };
    
    fetchProduct();
  }, [productId, user.id]);

  // Hàm cập nhật sản phẩm
  const handleUpdateProduct = async () => {
    if (!product.name || !product.price || !product.description || !category || !imageUrl) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    const updatedProduct = { ...product, category, image: imageUrl };

    const updatedUser = {
      ...user,
      productsSold: user.productsSold.map(p =>
        p.id === product.id ? updatedProduct : p
      ),
    };

    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      Alert.alert("Thành công", "Cập nhật sản phẩm thành công.");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      Alert.alert("Lỗi", "Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    }
  };

  // Hàm xóa sản phẩm
  const handleDeleteProduct = async () => {
    const updatedUser = {
      ...user,
      productsSold: user.productsSold.filter(p => p.id !== product.id),
    };

    try {
      await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      Alert.alert("Thành công", "Sản phẩm đã bị xóa.");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      Alert.alert("Lỗi", "Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  if (!product) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f4f4f4" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
        Chỉnh sửa sản phẩm
      </Text>

      <TextInput
        placeholder="Tên sản phẩm"
        value={product.name}
        onChangeText={(text) => setProduct({ ...product, name: text })}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Giá sản phẩm"
        value={product.price.toString()}
        onChangeText={(text) => setProduct({ ...product, price: parseFloat(text) })}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Mô tả sản phẩm"
        value={product.description.join("\n")}
        onChangeText={(text) => setProduct({ ...product, description: text.split("\n") })}
        multiline
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15, height: 120 }}
      />

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={{ height: 50, width: "100%", marginBottom: 15 }}
      >
        {categories.map((categoryItem, index) => (
          <Picker.Item key={index} label={categoryItem} value={categoryItem} />
        ))}
      </Picker>

      <TextInput
        placeholder="URL ảnh sản phẩm"
        value={imageUrl}
        onChangeText={(text) => setImageUrl(text)}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, marginBottom: 15 }}
      />

      <TouchableOpacity
        onPress={handleUpdateProduct}
        style={{ backgroundColor: "#00BFFF", paddingVertical: 15, borderRadius: 10, alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Cập nhật sản phẩm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleDeleteProduct}
        style={{ backgroundColor: "#FF6347", paddingVertical: 15, borderRadius: 10, alignItems: "center", marginTop: 15 }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Xóa sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProductScreen;
