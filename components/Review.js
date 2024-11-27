import React, { useState,useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity ,TextInput} from 'react-native';
import { Rating } from 'react-native-ratings';
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';  // Import useSelector từ Redux
const generateReviews = (numReviews) => {
  const reviewsData = [];

  for (let i = 0; i < numReviews; i++) {
    reviewsData.push({
      id: i + 1,
      avatar: faker.image.avatar(), // Sử dụng avatar từ Pravatar
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      date: `${faker.date.past().toLocaleDateString()}`,
      rating: faker.number.int({ min: 1, max: 5 }),
      review: faker.lorem.sentence(faker.number.int({ min: 5, max: 20 })),
    });
  }

  return reviewsData;
};

const Review = ({ navigation, reviewsCount }) => {
  const [reviewsData, setReviewsData] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    reviewText: '',
  });

  // Lấy thông tin người dùng từ Redux
  const user = useSelector(state => state.user); // Điều chỉnh tùy theo cấu trúc của state Redux

  // Hàm gọi API để tải lại reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch('https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login');
      const data = await response.json();

      const reviews = data.map(item => item.messages).flat();
      if (reviews.length > 0) {
        setReviewsData([ ...generateReviews(reviewsCount),...reviews]);
      } else {
        setReviewsData(generateReviews(reviewsCount));
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu từ MockAPI:', error);
      setReviewsData(generateReviews(reviewsCount));
    }
  };

  // Gọi fetchReviews khi component mount lần đầu
  useEffect(() => {
    fetchReviews();
  }, []);

  // Hàm thêm review mới
  const addNewReview = async () => {
    if (newReview.rating === 0 || newReview.reviewText.trim() === '') {
      console.error('Cần có đánh giá và nội dung review');
      return;
    }

    try {
      if (!user || !user.id) {
        console.error('Không tìm thấy thông tin người dùng');
        return;
      }

      const userId = user.id;
      const response = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`);
      const userData = await response.json();

      if (!userData || !userData.firstName || !userData.lastName || !userData.avatar) {
        console.error('Dữ liệu người dùng không hợp lệ:', userData);
        return;
      }

      const name = `${userData.firstName} ${userData.lastName}`;
      const avatar = userData.avatar;

      const newReviewData = {
        id: reviewsData.length + 1,
        avatar: avatar,
        name: name,
        date: new Date().toLocaleDateString(),
        rating: newReview.rating,
        review: newReview.reviewText,
      };

      const updatedReviews = [...reviewsData, newReviewData];
      setReviewsData(updatedReviews); // Cập nhật lại dữ liệu review cục bộ

      // Lưu review vào MockAPI
      const updateResponse = await fetch(`https://67174d1fb910c6a6e027692b.mockapi.io/api/donut/login/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...userData,
          messages: [...userData.messages, newReviewData],
        }),
      });

      console.log('Update Response:', updateResponse); // Kiểm tra phản hồi từ API

      if (updateResponse.ok) {
        console.log('Review đã được lưu thành công');
        // Không cần gọi fetchReviews() nếu không có lỗi
      } else {
        console.error('Có lỗi khi lưu review vào MockAPI');
      }

      // Reset form sau khi thêm review
      setNewReview({ name: '', rating: 0, reviewText: '' });

    } catch (error) {
      console.error('Lỗi khi thêm review:', error);
    }
  };




  return (
    <View style={{ padding: 15, right: 20 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reviews</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('All Review', { reviews: reviewsData })
          }
        >
          <Text
            style={{
              textDecorationLine: 'underline',
              color: 'black',
              fontSize: 14,
            }}
          >
            See all &gt;
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tổng số đánh giá */}
      <View style={{ flex: 1, alignItems: 'flex-start', marginBottom: 10 }}>
        <Text style={{ fontSize: 24 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 35 }}>
            {reviewsData.length} reviews
          </Text>
        </Text>
      </View>

      {/* Danh sách đánh giá */}
      <FlatList
        data={reviewsData.slice(0, 45)} // Hiển thị 10 bình luận đầu tiên
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'black',
              marginRight: 10,
              maxWidth: 250,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: item.avatar }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: 'gray' }}>{item.date}</Text>
                <Rating
                  type="star"
                  ratingCount={5}
                  startingValue={item.rating}
                  imageSize={20}
                  readonly
                />
              </View>
            </View>
            <Text
              style={{ marginTop: 5 }}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {item.review}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{ paddingVertical: 10 }}
      />

       {/* Input để nhập review mới */}
      
      <Rating
        type="star"
        ratingCount={5}
        startingValue={newReview.rating}
        onFinishRating={(rating) => setNewReview({ ...newReview, rating })}
        imageSize={30}
      />

      <TextInput
        style={{
          height: 80,
          borderColor: 'gray',
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 10,
          paddingLeft: 8,
          textAlignVertical: 'top',
        }}
        placeholder="Enter your review"
        multiline
        value={newReview.reviewText}
        onChangeText={(text) => setNewReview({ ...newReview, reviewText: text })}
      />

      {/* Nút thêm review */}
      <TouchableOpacity
        onPress={addNewReview}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: '#00C4CC',
          borderRadius: 5,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Add Review</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Review;