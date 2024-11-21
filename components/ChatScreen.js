import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';

const InboxHomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const getRandomResponse = (userMessage) => {
  const responses = {
    greetings: [
      "Hello! How can I assist you with your trading needs today?",
      "Hi there! Do you need help with products, prices, or shipping?",
      "Welcome! Let me know how I can assist with your trade.",
    ],
    farewell: [
      "Goodbye! Have a great day trading!",
      "See you later! If you have any more questions, just let me know.",
      "Take care! I'm here if you need further assistance.",
    ],
    emojiResponses: {
      '😊': "You seem happy! 😊",
      '😂': "Haha! That was funny! 😂",
      '😍': "Aww, what do you love? 😍",
      '😢': "Oh no, don't be sad! 😢",
      '😎': "Looking cool as always! 😎",
      '👍': "Great! Keep it up! 👍",
      '🎉': "Woohoo! Let's celebrate a successful trade! 🎉",
    },
    price: [
      "The price of the product depends on the market conditions. Let me know what product you're looking for.",
      "Prices fluctuate frequently. Please specify the item so I can provide accurate details.",
      "For the latest prices, I recommend checking our live trading platform.",
    ],
    shippingTime: [
      "Shipping times depend on the delivery method and your location. Typically, it takes 3-5 business days.",
      "Express shipping is faster but may incur additional fees. Regular shipping usually takes longer.",
      "For international shipping, the estimated delivery time can range from 5-10 business days.",
    ],
    paymentMethods: [
      "We support payments via bank transfer, credit card, and digital wallets like PayPal or Stripe.",
      "You can use credit cards, debit cards, or wire transfers to complete your transactions.",
      "For secure and fast payments, we recommend using our integrated payment gateway.",
    ],
    transactionHistory: [
      "You can view your transaction history in the 'My Account' section on our platform.",
      "All your completed transactions are logged in your profile under the 'History' tab.",
      "For detailed transaction records, you can download the history as a CSV from your dashboard.",
    ],
    security: [
      "All transactions on our platform are encrypted to ensure maximum security.",
      "We use the latest security protocols to protect your personal and financial information.",
      "Your account is protected with multi-factor authentication. Please enable it for added security.",
    ],
    customerSupport: [
      "Our customer support team is available 24/7 to assist you with any issues.",
      "You can contact support via live chat, email, or the hotline listed on our website.",
      "For technical problems, our support team will guide you step by step to resolve the issue.",
    ],
    refundPolicy: [
      "Refunds are processed within 5-7 business days after approval.",
      "If you need a refund, please submit a request through the 'Support' section of your account.",
      "Our refund policy ensures that you get your money back if the product doesn't meet your expectations.",
    ],
    accountSetup: [
      "To set up your account, go to the 'Sign Up' page and follow the instructions.",
      "Make sure to verify your email and enable 2FA for added security.",
      "If you're having trouble setting up your account, contact our support team for help.",
    ],
    tradingTips: [
      "Always keep an eye on market trends before making a trade.",
      "Diversify your portfolio to minimize risks and maximize returns.",
      "Use stop-loss orders to protect yourself from unexpected market drops.",
    ],
    default: [
      "I'm not sure I understand. Can you clarify your question about the trading platform?",
      "Could you provide more details so I can assist you better?",
      "That's an interesting question! Let me know how I can help you further.",
    ],
  };

  // Check if the message is an emoji and respond accordingly
  if (responses.emojiResponses[userMessage]) {
    return responses.emojiResponses[userMessage];
  }

  // Convert the message to lowercase for easier matching
  userMessage = userMessage.toLowerCase();

  // Match user messages to specific topics
  if (userMessage.includes("hi") || userMessage.includes("hello")) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  } else if (userMessage.includes("bye") || userMessage.includes("goodbye")) {
    return responses.farewell[Math.floor(Math.random() * responses.farewell.length)];
  } else if (userMessage.includes("price") || userMessage.includes("cost")) {
    return responses.price[Math.floor(Math.random() * responses.price.length)];
  } else if (userMessage.includes("shipping") || userMessage.includes("delivery")) {
    return responses.shippingTime[Math.floor(Math.random() * responses.shippingTime.length)];
  } else if (userMessage.includes("payment") || userMessage.includes("pay")) {
    return responses.paymentMethods[Math.floor(Math.random() * responses.paymentMethods.length)];
  } else if (userMessage.includes("transaction") || userMessage.includes("history")) {
    return responses.transactionHistory[Math.floor(Math.random() * responses.transactionHistory.length)];
  } else if (userMessage.includes("security") || userMessage.includes("safe")) {
    return responses.security[Math.floor(Math.random() * responses.security.length)];
  } else if (userMessage.includes("support") || userMessage.includes("help")) {
    return responses.customerSupport[Math.floor(Math.random() * responses.customerSupport.length)];
  } else if (userMessage.includes("refund") || userMessage.includes("return")) {
    return responses.refundPolicy[Math.floor(Math.random() * responses.refundPolicy.length)];
  } else if (userMessage.includes("account") || userMessage.includes("setup")) {
    return responses.accountSetup[Math.floor(Math.random() * responses.accountSetup.length)];
  } else if (userMessage.includes("tips") || userMessage.includes("advice")) {
    return responses.tradingTips[Math.floor(Math.random() * responses.tradingTips.length)];
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)];
  }
};


  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0].text; // User's input message
    const responseText = getRandomResponse(userMessage); // Get appropriate response

    const responseMessage = {
      _id: Math.random().toString(36).substring(7),
      text: responseText,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Bot',
        avatar: require('../assets/bot.png'),
      },
    };

    setTimeout(() => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [responseMessage])
      );
    }, 1000);
  };

  const handleEmojiPress = (emoji) => {
    setText(text + emoji);
  };

  const renderEmojiButtons = () => {
    const emojis = ['😊', '😂', '😍', '😢', '😎', '👍', '🎉'];
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
        {emojis.map((emoji) => (
          <TouchableOpacity key={emoji} onPress={() => handleEmojiPress(emoji)}>
            <Text style={{ fontSize: 24, padding: 5 }}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={{ width:'54vh',height:'90vh', padding: 10, backgroundColor: '#ffffff' }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        placeholder="Type a message..."
        alwaysShowSend
        renderSend={(props) => <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center' }} />}
        text={text}
        onInputTextChanged={(text) => setText(text)}
      />
      {renderEmojiButtons()}
    </View>
  );
};

export default InboxHomeScreen;
