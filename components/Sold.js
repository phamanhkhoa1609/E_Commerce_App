import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Picker,
} from "react-native";

const SoldScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("Electronic"); // Giá trị mặc định
  const [productDescriptions, setProductDescriptions] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`;

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productImage || !productCategory || !productDescriptions) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Fetch user data
      const response = await fetch(API_URL);
      const user = await response.json();

      // Add new product to productsSold
      const newProduct = {
        id: Math.random().toString(), // Generate random ID
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        category: productCategory,
        description: productDescriptions.split("\n"), // Chuyển mỗi dòng thành một phần tử mảng
      };

      const updatedUser = {
        ...user,
        productsSold: [...(user.productsSold || []), newProduct],
      };

      // Update user data in MockAPI
      await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      Alert.alert("Success", "Product added successfully!");
      navigation.goBack(); // Quay lại màn hình trước đó
    } catch (error) {
      console.error("Error adding product:", error);
      Alert.alert("Error", "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

   return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f4f4f4" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" }}>
        Add Product to Sell
      </Text>

      <TextInput
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15,
          backgroundColor: "#fff",
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15,
          backgroundColor: "#fff",
          fontSize: 16,
        }}
      />

      <TextInput
        placeholder="Product Image URL"
        value={productImage}
        onChangeText={setProductImage}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15,
          backgroundColor: "#fff",
          fontSize: 16,
        }}
      />

      {/* Dropdown Category Selection */}
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 15,
          backgroundColor: "#fff",
        }}
      >
        <Picker
          selectedValue={productCategory}
          onValueChange={(itemValue) => setProductCategory(itemValue)}
          style={{ height: 50, color: "#333" }}
        >
          <Picker.Item label="Electronic" value="Electronic" />
          <Picker.Item label="Fashion" value="Fashion" />
          <Picker.Item label="Furniture" value="Furniture" />
          <Picker.Item label="Sporting" value="Sporting" />
        </Picker>
      </View>

      <TextInput
        placeholder="Product Descriptions"
        value={productDescriptions}
        onChangeText={setProductDescriptions}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          padding: 12,
          marginBottom: 15,
          backgroundColor: "#fff",
          fontSize: 16,
          height: 120,
        }}
      />

      <TouchableOpacity
        onPress={handleAddProduct}
        style={{
          backgroundColor: "#00BFFF",
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Add Product</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SoldScreen;