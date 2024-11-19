import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Alert } from "react-native";
import { useSelector } from "react-redux";

const TransactionScreen = () => {
  const user = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux
  const [transactions, setTransactions] = useState([]);

  // Lấy lịch sử giao dịch từ API
  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${user.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch transactions.");
      const data = await response.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error.message);
      Alert.alert("Error", "Failed to load transactions. Please try again later.");
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchTransactions();
    }
  }, [user]);

  const renderTransactionItem = ({ item }) => (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Amount: ${item.amount}
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>Date: {item.date}</Text>
        <Text style={{ fontSize: 14, color: "blue", marginBottom: 10 }}>
          Ref: {item.refNumber}
        </Text>

        {/* Hiển thị danh sách mặt hàng */}
        <View
          style={{
            marginTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            paddingTop: 10,
          }}
        >
          {Array.isArray(item.items) && item.items.length > 0 ? (
            item.items.map((product, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 14, color: "black" }}>
                  {product.name} (x{product.quantity})
                </Text>
               <Text style={{ fontSize: 14, color: "gray" }}>
  {product.selectedSize ? `Size ${product.selectedSize} ` : ""}
  {product.selectedColor ? `${product.selectedColor} - ` : ""}
  ${product.price}
</Text>

              </View>
            ))
          ) : (
            <Text style={{ fontSize: 14, color: "gray" }}>
              No items in this transaction
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ width:'54vh',height:'90vh', backgroundColor: "#fff", padding: 20 }}>
      {transactions.length === 0 ? (
        <Text style={{ fontSize: 16, color: "gray", textAlign: "center" }}>
          No transactions available
        </Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => `${item.refNumber}-${index}`}
          renderItem={renderTransactionItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default TransactionScreen;
